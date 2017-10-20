<template>
  <div>
    <common-nav class="header" :search="false" :message="false" :service="false" :goback="false" :gobackcom="false" :goClose="true">
      <div slot="body">
        评估结果
      </div>
    </common-nav>
    <div class="info qrt">
      <div class="qrt-content">
        <div class="header">您的风险承受能力为</div>
        <div class="content">
          <span v-text="scoreResult.GRADE_CODE"></span>
          <span class="score" v-if="scoreResult.LOWEST_NAM === '否'">{{'(' + scoreResult.SCORE + '分)'}}</span>
          <span class="score" v-if="scoreResult.LOWEST_NAM === '是'">(风险承受能力最低类别)</span></div>
        <div class="header">适配的风险等级产品或服务为</div>
        <div class="content">{{scoreResult.MATCH_PRD_RISK}}</div>

        <section class="pl15 bd-top bd-bottom bg-white">
          <div class="item" v-for="(item, index) in agreementsJson" :key="item.agreementType">
            <div class="pr15">
              <div class="arrow" @click="goAgreement(item)" v-text="`《${item.title}》`"></div>
            </div>
          </div>
        </section>
        <div class="confirm">
          <span class="icon" :class="{selected: confirm}" @click="doConfirm"></span><span class="text"> 我已阅读并同意以上协议</span>
        </div>
        <div class="lowest-warning" v-if="scoreResult.LOWEST_NAM === '是'">
          <span class="icon"></span><span class="text"> 由于您是“风险承受能力最低类别”，无法通过在线完成适当性</span>
        </div>
        <div class="bung"></div>
        <div class="relative infoS">
          <div class="btn-group">
            <button class="btn next" @click="goSignature" :disabled="scoreResult.LOWEST_NAM === '是' || !confirm">签名</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import filters from '../common/filters'

  export default {
    data () {
      return {
        gobackUrl: 'close',
        confirm: false
      }
    },
    computed: {
      ...mapState([
        'token',
        'cfAdequacyJson',
        'agreementsJson'
      ])
    },
    async created () {
      await this.initData()

      if (pbPage.getInitState()) {
        pbPage.addReloadFunByKey('adequacy_qrt4signature', this.signatureFinish)
      } else {
        pbPage.initPage({
          reload: this.signatureFinish
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      // 禁止返回到 /qcm 页面
      if (to.path !== '/qcm') {
        return next()
      }
      return next(false)
    },
    methods: {
      doConfirm () {
        if (this.scoreResult.LOWEST_NAM === '是') {
          return
        }

        let msg = ''
        for (let [k, v] of Object.entries(this.agreementsJson)) {
          if (!v.hasRead) {
            msg += `<p>《${v.title}》</p>`
          }
        }

        if (msg) {
          return this.showAlert('<p>请先阅读：</p>' + msg)
        }

        this.confirm = !this.confirm
      },
      goAgreement (agreement) {
        if (this.scoreResult.LOWEST_NAM === '是') {
          return
        }

        agreement.hasRead = true
        window.open(`pobo:pageId=900004&scale=1&title=${agreement.title}&url=${this.$getApiUrl('viewAgreementByPng')}?id=${this.personalInfo.ID_NO}&agreementType=${agreement.agreementType}`)
      },
      goSignature () {
        window.location.href = 'pobo:uncheck=1&pageId=900005&orientation=1&url=' + this.$getApiUrl('signature')
      },
      async initData () {
        try {
          this.$loading.toggle('')
          await this.queryRisk()
          await this.queryAgreements()
        } catch (e) {
          console.error(e)
        } finally {
          this.$loading.hide()
        }
      },
      async queryAgreements () {
        let config = {
          method: 'post',
          url: this.$getApiUrl('getAgreements'),
          data: {
            'func': 2023,
            'type': 2,
            'account': '',
            'token': '',
            'data': [{
              'service': 'adequacy.120',
              'json': '{}',
            }]
          }
        }
        const response = await this.$axios(config)
        let rsltData = JSON.parse(response.data.data[0].proxyresult)

        if (rsltData && rsltData.body && rsltData.body.result) {
          let agreementsJson = rsltData.body.result.map(item => {
            return {agreementType: item.KEY_CODE, title: item.CERT_NAM}
          })

          await this.$store.dispatch('updateAgreementsJson', agreementsJson)
        }
      },
      async queryRisk () {
        if (!this.scoreResult.GRADE_CODE) {
          let config = {
            method: 'post',
            url: this.$getApiUrl('getAppropriatenessResult'),
            data: {
              'func': 2020,
              'type': 2,
              'token': this.token,
              'account': this.personalInfo.PHONENUM,
              'data': [{
                'service': 'adequacy.104',
                'json': JSON.stringify(this.personalInfo)
              }]
            }
          }
          const response = await this.$axios(config)
          let rsltData = JSON.parse(response.data.data[0].proxyresult)

          if (rsltData.body.result) {
            this.scoreResult.GRADE_CODE = rsltData.body.result.GRADE_CODE
            this.scoreResult.MATCH_PRD_RISK = rsltData.body.result.MATCH_PRD_RISK
            this.scoreResult.LOWEST_NAM = rsltData.body.result.LOWEST_NAM
            this.scoreResult.SCORE = rsltData.body.result.SCORE
          }
        }
      },
      showAlert (msg) {
        this.$alert({
          maskClosable: true,
          btns: [{
            text: '确定',
            click: () => {
              return false
            }
          }],
          title: '<h4>提示</h4>',
          message: '<p>' + msg + '</p>'
        })
      },
      signatureFinish () {
        const signatureData = pbE.SYS().getPrivateData('adequacy_signature')
        if (!signatureData.length) {
          return
        }

        // 清楚数据
        pbE.SYS().storePrivateData('adequacy_signature', '')

        this.$loading.toggle('')

        const data = {
          id: this.personalInfo.ID_NO,
          name: this.personalInfo.INVESTOR_NAM,
          tel: this.personalInfo.PHONENUM,
          signature: signatureData.replace('data:image/png;base64,', '')
        }

        this.$axios.post(this.$getApiUrl('signatureAndUploadAgreements'), data).then(response => {
          if (response.data.errcode === 0) {
            this.$loading.hide()
            this.$router2.push('/agreementList')
          }
        })
      }
    }
  }
</script>
