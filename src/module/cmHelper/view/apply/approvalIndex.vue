<template>
  <div class="approval_index">
    <common-nav>
      <span slot="body">审批进程</span>
    </common-nav>
    <div class="approval_tab">
      <span :class="qrytype == 0?'selected':''" @click="tabClick(0)">全部</span>
      <span :class="qrytype == 1?'selected':''" @click="tabClick(1)">审批中</span>
      <span :class="qrytype == 2?'selected':''" @click="tabClick(2)">审批通过</span>
    </div>
    <div class="approval_conter">
      <div class="approval_cell" @click="jumpClick(data)" v-for="data in approvalData">
        <div>
          <span>{{data.appObjectName}} | {{data.processName}}</span>
          <span>{{$$dateInterception(data.appDate, 0, data.appDate.length - 2)}}</span>
        </div>
        <span
          :class="{'c3':data.appStatus== '3'}">{{data.appStatusName}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        qrytype: null,
        approvalData: []
      }
    },
    computed: {
      ...mapState({
        task: ({apply}) => apply.task,
      })
    },
    mounted () {
//      this.tabClick(0)
    },
    activated () {
      this.tabClick(0)
    },
    methods: {
      //tab切换
      tabClick (flag) {
        this.qrytype = flag
        if (flag == 0) {
          this.getData()
        } else {
          this.getData(flag)
        }
      },
      //点击跳转详情
      jumpClick (data) {
        let taskData = {}
        taskData['businessKeyId'] = data.businessKeyId
        taskData['processId'] = data.processId
        this.$store.dispatch('updataTask', taskData)
        this.$router.push('/approvalDetails')
      },
      //获取审批状态请求
      getData (flag) {
        flag ? flag = flag : flag = null
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.cmHelper.serverUrl + this.urlList.approvalToView.url + _this.info.userId + '?qrytype=' + flag + '&begin=1&size=1000', {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.approvalData = data.data
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          if (err.response && err.response.status == 401) {
            _this.$router.replace('/')
          } else if (err.response) {
            _this.$toast(err.response.data.desc)
          } else {
            _this.$toast('网络超时，请稍后重试！')
          }
          console.log(err)
        })
      }
    }
  }
</script>
