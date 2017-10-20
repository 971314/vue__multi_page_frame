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
        <div @click="cancelmodal">取消</div>
      </div>
    </multi-slide>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        showEvent: false,
        applyData: [
          {
            tplType: '1',
            tplTypeName: '保证金率优惠',
            tplTypeModel: '1'
          },
          {
            tplType: '1',
            tplTypeName: '手续费率优惠',
            tplTypeModel: '2'
          },
          {
            tplType: '1',
            tplTypeName: '股票期权系统保证金率',
            tplTypeModel: '1'
          },
          {
            tplType: '1',
            tplTypeName: '股票期权系统手续费率',
            tplTypeModel: '2'
          },
          {
            tplType: '1',
            tplTypeName: '提成比例',
            tplTypeModel: '1'
          },
          {
            tplType: '1',
            tplTypeName: '交易所返还提成',
            tplTypeModel: '2'
          },
          {
            tplType: '1',
            tplTypeName: '利息提成',
            tplTypeModel: '1'
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'apply'
      ])
    },
    created () {
      let _this = this
    },
    methods: {
      //申请点击
      chooseClick (data) {
        console.log(data)
        this.$store.dispatch('updataApply', data)
        this.showEvent = true
      },
      //模态框取消点击
      cancelmodal () {
        this.showEvent = false
      },
      //模态框模板点击
      modalclick (flag) {
        if (flag === 1) {
          this.$router.push('/applyFill')
        } else {
          console.log(flag)
        }
      }
    }
  }
</script>
