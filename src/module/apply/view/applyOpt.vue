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
        'template'
      ])
    },
    created () {

    },
    methods: {
      chooseClick (data) {
        console.log(data)
        let steData = {}
        steData['tplId'] = data.tplId
        steData['tplName'] = data.tplName
        this.$store.dispatch('updataTemplate',steData)
        this.$router.push('/applyFill')
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
