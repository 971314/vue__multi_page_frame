<template>
  <div class="apply_fast">
    <common-nav>
      <span slot="body">快速申请</span>
    </common-nav>
    <div class="conter">
      <div>
        <a v-for="data in applyData" @click="chooseClick(data)">
          <img v-if="data.processName    == '保证金率优惠'" src="../../images/apply/baoZhengJingYouHui.png"/>
          <img v-else-if="data.processName    == '手续费率优惠'" src="../../images/apply/shouXuFeiLvYouHui.png"/>
          <img v-else-if="data.processName    == '股票期权保证金率'" src="../../images/apply/stockOptions_baoZhengJing.png"/>
          <img v-else-if="data.processName    == '股票期权手续费率'" src="../../images/apply/stockOptions_shouXuFei.png"/>
          <img v-else-if="data.processName    == '提成比例'" src="../../images/apply/tiChengBiLi.png"/>
          <img v-else-if="data.processName    == '交易所返还提成'" src="../../images/apply/jiaoYiSuoFanHuanTiCheng@2x.png"/>
          <img v-else-if="data.processName    == '利息提成'" src="../../images/apply/liXiTiCheng.png"/>
          <span>{{data.processName }}</span>
          <img src="../../images/apply/gengDuo.png" class="gengduo"/>
        </a>
      </div>
    </div>
    <multi-slide v-model="showEvent">
      <div class="bottom_modal">
        <div @click="modalclick(1)">模板申请</div>
        <div @click="modalclick(2)">其他申请</div>
        <div @click="showEvent = false">取消</div>
      </div>
    </multi-slide>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        showEvent: false,
        applyData: []
      }
    },
    computed: {
      ...mapState({
        apply: ({apply}) => apply.apply
      })
    },
    created () {
    },
    mounted () {
      let _this = this
      _this.$loading.toggle(' ')
      _this.$axios.get(PBHttpServer.cmHelper.serverUrl + this.urlList.approvalModules.url + _this.info.userId, {
        timeout: 10000,
        headers: {
          id: _this.info.token
        }
      }).then((data) => {
        data = data.data
        console.log(data)
        _this.$loading.hide()
        if (data.retHead == 0) {
          _this.applyData = data.data
        } else {
          _this.$toast(data.desc)
        }
      }).catch((err) => {
        _this.$loading.hide()
        if (err.message.split(' ')[0] == 'timeout') {
          _this.$toast('网络超时，请稍后重试！')
        } else {
          _this.$toast('网络异常，请稍后重试！')
        }
        console.log(err)
      })
      _this.inquireApprovedPersonnel()
    },
    activated () {
    },
    methods: {
      //申请模块点击
      chooseClick (data) {
        this.$store.dispatch('updataApply', data)
        this.showEvent = true
      },
      //模态框模板点击
      modalclick (flag) {
        if (flag === 1) {
          this.$router.push('/applyFill')
        } else {
          this.$router.push('/nonTemplate')
        }
        this.showEvent = false
      },
      //查询审批人员信息
      inquireApprovedPersonnel () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.cmHelper.serverUrl + this.urlList.inquireApprovedPersonnel.url + _this.info.userId, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.$store.dispatch('updataApprovedPersonnelInfo', data.data)
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          if (err.message.split(' ')[0] == 'timeout') {
            _this.$toast('网络超时，请稍后重试！')
          } else {
            _this.$toast('网络异常，请稍后重试！')
          }
          console.log(err)
        })
      }
    }
  }
</script>
