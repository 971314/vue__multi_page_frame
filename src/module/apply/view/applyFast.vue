<template>
  <div class="apply_fast">
    <common-nav>
      <span slot="body">快速申请</span>
    </common-nav>
    <div class="conter">
      <div>
        <a v-for="data in applyData" @click="chooseClick(data)">
          <img v-if="data.tplTypeName  == '保证金率优惠'" src="../images/baoZhengJingYouHui.png"/>
          <img v-else-if="data.tplTypeName  == '手续费率优惠'" src="../images/shouXuFeiLvYouHui.png"/>
          <img v-else-if="data.tplTypeName  == '股票期权系统保证金率'" src="../images/stockOptions_baoZhengJing.png"/>
          <img v-else-if="data.tplTypeName  == '股票期权系统手续费率'" src="../images/stockOptions_shouXuFei.png"/>
          <img v-else-if="data.tplTypeName  == '提成比例'" src="../images/tiChengBiLi.png"/>
          <img v-else-if="data.tplTypeName  == '交易所返还提成'" src="../images/jiaoYiSuoFanHuanTiCheng@2x.png"/>
          <img v-else-if="data.tplTypeName  == '利息提成'" src="../images/liXiTiCheng.png"/>
          <span>{{data.tplTypeName }}</span>
          <img src="../images/gengDuo.png" class="gengduo"/>
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
      ...mapState([
        'apply'
      ])
    },
    created () {
      this.$loading.toggle(' ')
      this.getInfo()
    },
    mounted () {
      let _this = this
      _this.$loading.toggle(' ')
      _this.$axios.get(PBHttpServer.apply.serverUrl + this.urlList.approvalModules.url + _this.info.userId, {
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
    },
    activated () {
      this.$store.dispatch('updataTemplate', {tplId: '', tplName: ''})
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
          console.log(flag)
        }
        this.showEvent = false
      }
    }
  }
</script>
