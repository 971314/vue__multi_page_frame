<template>
  <div class="videoCheck">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="false" :goClose="true">
      <div slot="body">
        <span>视频验证</span>
      </div>
    </common-nav>
    <div class="header-bung"></div>
    <div class="content">
      <div class="hint">客服人员将和您进行视频通话，并对您进行身份确认</div>
      <div class="divider">视频准备</div>
      <div class="tags flex">
        <div class="flex-1">
          <div class="tag-sun"></div>
          <div class="tag-text">光线充足</div>
        </div>
        <div class="flex-1">
          <div class="tag-wifi"></div>
          <div class="tag-text">WIFI或4G</div>
        </div>
        <div class="flex-1">
          <div class="tag-idcard"></div>
          <div class="tag-text">身份证</div>
        </div>
      </div>

      <div class="queue-info text-center" v-if="isQueuing">
        <div class="queue-box">
          前方排队 <span class="queue" v-text="position"></span>人
        </div>
        <div class="wait-box">
          等待时间 <span class="wait" v-text="queuingTime"></span>
        </div>
      </div>
    </div>
    <div class="btnbox">
      <btn type="button" v-if="!isQueuing" :loading="isLogin" @click="doQueuing()">
        <span v-if="!isLogin">开始视频</span>
        <span v-else="isLogin">登录中...</span>
      </btn>
      <btn type="button" v-else @click="cancelQueuing()">取消排队</btn>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SockJS from 'sockjs-client'

  export default {
    data () {
      return {
        position: '',
        queuingTime: '',
        isLogin: false,
        isQueuing: false,
        ws: null,
        counting: 0,
        countingInterval: null
      }
    },
    computed: {
      ...mapState([
        'personalInfo',
        'basicInfo',
        'agreementsJson',
        'cfAdequacyJson',
        'brokerId'
      ])
    },
    mounted () {
      this.$loading.toggle('')
      this.initPage()
      this.initWS(() => {
        this.$loading.hide()
      })
    },
    beforeRouteLeave (to, from, next) {
      this.closeWS()
      return next()
    },
    methods: {
      doCounting () {
        this.counting = 0

        this.queuingTime = this.sec2Time(this.counting++)
        this.countingInterval = setInterval(() => {
          this.queuingTime = this.sec2Time(this.counting++)
        }, 1000)
      },
      cancelCounting () {
        window.clearInterval(this.countingInterval)
      },
      cancelQueuing () {
        if (this.ws && this.ws.readyState === 1) {
          this.ws.send(JSON.stringify({
            action: 'REQ_DISCONNECT',
            body: {}
          }))
        }

        this.isLogin = this.isQueuing = false
        this.cancelCounting()
      },
      closeWS () {
        try {
          if (this.ws && this.ws.readyState === 1) {
            this.ws.send(JSON.stringify({
              action: 'REQ_DISCONNECT',
              body: {}
            }))
          }
          this.ws && this.ws.close()
        } catch (e) {
          console.log(e)
        }
      },
      async doQueuing () {
        this.$loading.toggle('')

        try {
          let response = await this.getSubmitInfo()

          if (response.data.data) {
            let rsltdata = JSON.parse(response.data.data[0].proxyresult)

            if (!rsltdata.body || !rsltdata.body.result) {
              this.showAlert('查询信息失败，请确认网络环境')
              return
            }

            let result = rsltdata.body.result

            // 视频标志为Y
            if (result.VIDEO_FLG === 'Y') {
              return this.showAlert('视频已经完成', () => {
                return this.$router2.push('/success')
              })
            }

            // 附件不全
            if (result.HAS_BASE_INFO === 'Y') {
              let hasAllFile = true
              for (let key of Object.keys(result)) {
                if (key.startsWith('HAS_') && rsltdata.body.result[key] !== 'Y') {
                  hasAllFile = false
                  break
                }
              }

              if (!hasAllFile) {
                this.$loading.hide()
                return this.showAlert('未能查询到协议附件，无法进行视频')
              }
            } else {
              this.$loading.hide()
              return this.showAlert('未能查询到协议附件，无法进行视频')
            }

            // 如果已经初始化好WS就直接使用，否则就初始化WS再使用
            if (this.ws && this.ws.readyState === 1) {
              this.ws.send(JSON.stringify({
                action: 'REQ_CONNECT',
                body: {}
              }))

              this.doCounting()
              this.isLogin = this.isQueuing = true
              this.$loading.hide()
              console.log('onopen')
            } else {
              this.initWS(() => {
                this.ws.send(JSON.stringify({
                  action: 'REQ_CONNECT',
                  body: {}
                }))

                this.doCounting()
                this.isLogin = this.isQueuing = true
                this.$loading.hide()
                console.log('onopen')
              })
            }

          }
        } catch (e) {
          this.showAlert('查询信息失败，请确认网络环境')
          this.$loading.hide()
        }
      },
      initWS (onOpen) {
        if (this.ws && this.ws.readyState === 1) {
          return
        }

        let url = `/user/queue?brokerId=${this.brokerId}&cardId=${this.personalInfo.ID_NO}&channelId=${this.basicInfo.CHANNEL_DEPARTMENT_ID}&userName=${this.personalInfo.INVESTOR_NAM}&userPhoneNo=${this.personalInfo.PHONENUM}`
//            if ('WebSocket' in window) {
//              this.ws = new WebSocket(`ws://${this.cfAdequacyJson.queueServerHost}` + url)
//            } else {
//              this.ws = new SockJS(`http://${this.cfAdequacyJson.queueServerHost}/sockJS` + url)
//            }
        // this.ws = new SockJS(`http://${this.cfAdequacyJson.queueServerHost}/sockJS` + url)
        this.ws = new WebSocket(`ws://${this.cfAdequacyJson.queueServerHost}` + url)

        this.ws.onopen = onOpen
        this.ws.onmessage = (event) => {
          let data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data

          switch (data.action) {
            case 'RSP_ACCEPT_MATCH': {
              // 通过 CloudroomLogin 接口来准备视频
              let reslut = pbE.SYS().CloudroomLogin(`{"yyb": "${this.basicInfo.CHANNEL_DEPARTMENT_ID}", "phone": "${this.personalInfo.PHONENUM}", "idcard": "${this.personalInfo.ID_NO}", "name": "${this.personalInfo.INVESTOR_NAM}"}`)
              if (reslut < 0) {
                this.showAlert('视频登录失败')
              }
              break
            }
            case 'RSP_QUEUE_INFO': {
              this.position = data.body.position + 1
              break
            }
          }
        }
        this.ws.onclose = () => {
          this.ws.close()
          this.cancelQueuing()
          console.log('onclose')
        }
        this.ws.onerror = (e) => {
          console.error('onclose', e)
        }
      },
      initPage () {
        if (pbPage.getInitState()) {
          // 1、成功登陆，进入排队
          pbPage.addFunCallback(101003, () => {
            console.log('成功登陆，进入排队')
          }) // this.loginCallbac
          // 2、排队回调。会被重复调用
          pbPage.addFunCallback(101004, () => {
            console.log('排队、进入队列')
          }) // this.waitingCallback
          // 3、视频录制回调，包含了录制视频开始和录制视频结束2个回调。
          pbPage.addFunCallback(101005, this.videoCallback)

        } else {
          pbPage.initPage({
            callbacks: [
              {fun: 101003, callback: () => {}}, // this.loginCallback
              {fun: 101004, callback: () => {}}, // this.waitingCallback
              {fun: 101005, callback: this.videoCallback}
            ]
          })
        }
      },
      waitingCallback (result) {
      },
      async videoCallback (result) {
        typeof result === 'string' ? (result = JSON.parse(result)) : null

        // 视频已经开始。或者视频正在录制中
        if (result.status === '0') {
        } else if (result.status === '-1') { // 视频中断。有可能是掉线或者是后台挂断
          try {
            let response = await this.getSubmitInfo()

            if (response.data.data) {
              let rsltdata = JSON.parse(response.data.data[0].proxyresult)

              // 如果已经完成双录，则直接进入成功页面
              if (rsltdata.body && rsltdata.body.result && rsltdata.body.result.VIDEO_FLG === 'Y') {
                return this.$router2.push('/success')
              }
            }
            return this.$router2.push('/failure')
          } catch (e) {
            this.showAlert('查询信息失败，请确认网络环境')
          }
        }
      },
      async getSubmitInfo () {
        let param = {
          method: 'post',
          url: this.$getApiUrl('login'),
          data: {
            'func': 2023,
            'type': 2,
            'account': '',
            'token': '',
            'data': [{
              'service': 'adequacy.101',
              'json': JSON.stringify(this.personalInfo),
            }]
          }
        }

        return await this.$axios(param)
      },
      sec2Time (second) {
        let time = []
        let remain = second
        let year = 60 * 60 * 24 * 30 * 12
        let month = 60 * 60 * 24 * 30
        let day = 60 * 60 * 24
        let hour = 60 * 60
        let minute = 60

        if (remain >= year) {
          time[5] = parseInt(remain / year, 10)
          time.splice(5, 0, '年')
          remain = remain % year
        }

        if (remain >= month) {
          time[4] = parseInt(remain / month, 10)
          time.splice(4, 0, '月')
          remain = remain % month
        }

        if (remain >= day) {
          time[3] = parseInt(remain / day, 10)
          time.splice(3, 0, '天')
          remain = remain % day
        }

        if (remain >= hour) {
          time[2] = parseInt(remain / hour, 10)
          time.splice(2, 0, '时')
          remain = remain % hour
        }

        if (remain >= minute) {
          time[1] = parseInt(remain / minute, 10)
          time.splice(1, 0, '分')
          remain = remain % 60
        }

        if (remain < minute) {
          time[0] = remain
          time.splice(0, 0, '秒')
        }

        return time.reverse().join('')
      },
      showAlert (msg, callback) {
        this.$alert({
          maskClosable: true,
          btns: [{
            text: '确定',
            click: callback || function () {
              return false
            }
          }],
          title: '<h4>提示</h4>',
          message: '<p>' + msg + '</p>'
        })
      }
    }
  }
</script>
