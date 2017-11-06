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
        subTemplate: null
      }
    },
    computed: {
      ...mapState({
        template: ({apply}) => apply.template,
        apply: ({apply}) => apply.apply,
      })
    },
    mounted () {

    },
    activated () {
      this.subTemplate = null
      this.request()
    },
    methods: {
      //选择模板及模板数据存储
      chooseClick (data) {
        let steData = {}
        steData['tplId'] = data.tplId
        steData['tplName'] = data.tplName
        this.$store.dispatch('updataTemplate', steData)
        this.$router.back(-1)
      },
      //模板介绍模态框
      iconClick (data) {
        this.$alert({
          maskClosable: true,
          message: data.tplDesc,
          title: data.tplName
        })
      },
      //模板请求
      request () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.getInfo()
        _this.$axios.get(PBHttpServer.apply.serverUrl + this.urlList.approvalSelect.url + _this.info.userId + '/' + _this.apply.processId, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
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
      }
    }
  }
</script>
