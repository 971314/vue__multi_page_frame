<template>
  <div class="approval_process">
    <common-nav>
      <span slot="body">审批进程</span>
    </common-nav>
    <div class="center">
      <div class="process_header">
        <div><span>审核状态</span> <span>{{taskDetails.appStatusName}}</span></div>
        <div><span>申请内容</span> <span>{{taskDetails.processName }}</span></div>
        <div><span>提交时间</span> <span>{{taskDetails.appDateTime}}</span></div>
      </div>
      <div class="process_bottom">
        <div>
          <div class="process_cell" v-for=" (datas,i) in processData">
            <div>
              <span>{{i == 0 ? datas.operateTime ? $$dateInterception(datas.operateTime, 5, 16) : '当前' : $$dateInterception(datas.operateTime, 5, 16)}}</span>
              <!--<i
                v-if="i == 0 && datas.auditInfoList[0] && datas.auditInfoList[0].operateTypeId == '0' || i == 0 && datas.auditInfoList[0]  && datas.auditInfoList[0].operateTypeId == '1' || i == 0 && datas.auditInfoList[0]  && datas.auditInfoList[0].operateTypeId == '5' "
                class="by1"></i>
              <i v-else-if=" i == 0  && datas.auditInfoList[0] && datas.auditInfoList[0].operateTypeId == '2'"
                 class="by"></i>
              <i
                v-else-if="i == 0  && datas.auditInfoList[0] && datas.auditInfoList[0].operateTypeId == '4' || i == 0  && datas.auditInfoList[0] && datas.auditInfoList[0].operateTypeId == '3'"
                class="by2"></i>
              <i v-else class="by"></i>-->
              <i v-if="i == 0" class="by1"></i>
              <i v-else class="by"></i>
              <span class="line"></span>
            </div>
            <div v-if="i == 0">
              <!--<div class="paddingDiv"
                   :class="{'c1':i == 0 && datas.auditInfoList[0].operateTypeId == '1' || i == 0 && datas.auditInfoList[0].operateTypeId == '5','c2':i == 0 && datas.auditInfoList[0].operateTypeId == '2','c3':i == 0 && datas.auditInfoList[0].operateTypeId == '3' || i == 0 && datas.auditInfoList[0].operateTypeId == '4'}">
                {{datas.auditInfoList[0].operateType}}
              </div>-->
              <div class="paddingDiv c1">
                {{datas.auditInfoList[0].operateType}}
              </div>
              <div v-for="data in datas.auditInfoList">{{data.operatorName}} {{data.departName}} {{data.operateType}}
              </div>
            </div>
            <div v-else>
              <div v-for="data in datas.auditInfoList">{{data.operatorName}} {{data.departName}} {{data.operateType}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        processData: null
      }
    },
    computed: {
      ...mapState({
        task: ({apply}) => apply.task,
        taskDetails: ({apply}) => apply.taskDetails,
      })
    },
    mounted () {

    },
    activated () {
      this.processData = null
      this.getData()
    },
    methods: {
      //获取审批进程请求
      getData () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.cmHelper.serverUrl + this.urlList.approvalHistory.url + _this.info.userId + '/' + this.task.businessKeyId, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
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
