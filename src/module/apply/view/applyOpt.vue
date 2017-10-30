<template>
  <div class="apply_opt">
    <common-nav>
      <span slot="body">模板选择</span>
    </common-nav>
    <div class="conter">
      <div @click="chooseClick(data)" v-for="data in subTemplate">
        <span>{{data.tplName}}</span>
        <i @click.stop="iconClick(data)"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        subTemplate: [
          {
            tplId: '1',//模板类型
            tplDesc: '交易所1.01倍+投保',//模板描述
            tplName: '交易所1.01倍+投保'//模板名称
          },
          {
            tplId: '2',//模板类型
            tplDesc: '交易所1.02倍+投保',//模板描述
            tplName: '交易所1.02倍+投保'//模板名称
          }, {
            tplId: '3',//模板类型
            tplDesc: '交易所1.03倍+投保',//模板描述
            tplName: '交易所1.03倍+投保'//模板名称
          }, {
            tplId: '4',//模板类型
            tplDesc: '交易所1.04倍+投保',//模板描述
            tplName: '交易所1.04倍+投保'//模板名称
          }, {
            tplId: '5',//模板类型
            tplDesc: '交易所1.05倍+投保',//模板描述
            tplName: '交易所1.05倍+投保'//模板名称
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'template',
        'apply'
      ])
    },
    mounted () {
      let _this = this
      _this.$loading.toggle(' ')
      _this.getInfo()
      _this.$axios.get(PBHttpServer.apply.serverUrl + this.urlList.approvalSelect.url + _this.info.userId + '/' + _this.apply.tplType, {timeout: 10000}).then((data) => {
        data = data.data
        console.log(data)
        _this.$loading.hide()
        if (data.retHead == 0) {
          _this.subTemplate = data.data
        } else {
          _this.$toast(data.desc)
        }
      }).catch((err) => {
        _this.$loading.hide()
        _this.$toast('网络超时，请稍后重试！')
        console.log(err)
      })
    },
    methods: {
      chooseClick (data) {
        let steData = {}
        steData['tplId'] = data.tplId
        steData['tplName'] = data.tplName
        this.$store.dispatch('updataTemplate', steData)
        this.$router.replace('/applyFill')
      },
      iconClick (data) {
        this.$alert({
          maskClosable: true,
          message: data.tplDesc,
          title: data.tplName
        })
      }
    }
  }
</script>
