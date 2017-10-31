<template>
  <div class="approval_process">
    <common-nav>
      <span slot="body">审批进程</span>
    </common-nav>
    <div v-for="data in processData">
      <div class="process_header">
        <div><span>审核状态</span> <span>{{data.auditStatus}}</span></div>
        <div><span>申请内容</span> <span>{{data.bizType}}</span></div>
        <div><span>提交时间</span> <span>{{data.appDate}}</span></div>
      </div>
      <div class="process_bottom">
        <div class="process_cell" v-for=" (datas,i) in data.his">
          <div>
            <span>{{$$dateInterception($$getTimeFmt(datas.opDate, '-'), 5, 16)}}</span>
            <i v-if="datas.opType == '通过'" class="by"></i>
            <i v-else-if="datas.opType == '审批中'" class="by1"></i>
            <i v-else-if="datas.opType == '驳回'" class="by2"></i>
            <span class="line"></span>
          </div>
          <div>
            <div
              :class="{'c1':i == 0 && datas.opType == '待审批','c2':i == 0 && datas.opType == '通过','c3':i == 0 && datas.opType == '驳回'}">
              {{datas.opType}}
            </div>
            <div>{{datas.auditorName}} {{datas.auditorComment}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        processData: null
      }
    },
    mounted () {

    },
    activated () {
      this.getData()
    },
    methods: {
      getData () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.getInfo()
        _this.$axios.get(PBHttpServer.apply.serverUrl + this.urlList.approvalHistory.url + _this.info.userId + '/' + this.$store.state.task.bizTypeId + '/' + this.$store.state.task.bizId, {timeout: 10000,
          headers: {
            id: _this.info.token
          }}).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.processData = data.data
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
