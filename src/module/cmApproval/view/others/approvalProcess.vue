<template>
  <div class="approval_process">
    <common-nav>
      <span slot="body">审批进程</span>
    </common-nav>
    <div class="center" v-if="lists">
      <div class="process_header">
        <div><span>审核状态</span> <span>{{proHis.appStatusName}}</span></div>
        <div><span>申请内容</span> <span>{{proHis.processName}}</span></div>
        <div><span>提交时间</span> <span>{{proHis.appDateTime ? $$timeFormate({date: proHis.appDateTime, format: 'Y-M-D h:m'}) : ''}}</span></div>
      </div>
      <div class="process_bottom">
        <div>
          <div class="process_cell" v-for=" (datas,i) in lists">
            <div>
              <span>{{i == 0 ? datas.operateTime ? $$dateInterception(datas.operateTime, 5, 16) : '当前' : $$dateInterception(datas.operateTime, 5, 16)}}</span>
              <i
                v-if="i == 0 && datas.auditInfoList[0] && datas.auditInfoList[0].operateTypeId == '0' || i == 0 && datas.auditInfoList[0]  && datas.auditInfoList[0].operateTypeId == '1' || i == 0 && datas.auditInfoList[0]  && datas.auditInfoList[0].operateTypeId == '5' "
                class="by1"></i>
              <i v-else-if=" i == 0  && datas.auditInfoList[0] && datas.auditInfoList[0].operateTypeId == '2'"
                 class="by"></i>
              <i
                v-else-if="i == 0  && datas.auditInfoList[0] && datas.auditInfoList[0].operateTypeId == '4' || i == 0  && datas.auditInfoList[0] && datas.auditInfoList[0].operateTypeId == '3'"
                class="by2"></i>
              <i v-else class="by"></i>
              <span class="line"></span>
            </div>
            <div v-if="i == 0">
              <div class="paddingDiv"
                   :class="{'c1':i == 0 && datas.auditInfoList[0].operateTypeId == '1' || i == 0 && datas.auditInfoList[0].operateTypeId == '5','c2':i == 0 && datas.auditInfoList[0].operateTypeId == '2','c3':i == 0 && datas.auditInfoList[0].operateTypeId == '3' || i == 0 && datas.auditInfoList[0].operateTypeId == '4'}">
                {{datas.auditInfoList[0].operateType}}
              </div>
             <!-- <div class="paddingDiv c1">
                {{datas.auditInfoList[0].operateType}}
              </div>-->
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
        lists: null
      }
    },
    computed: {
      ...mapState({
        process: ({others}) => others.process,
        proHis: ({others}) => others.proHis
      })
    },
    mounted () {

    },
    activated () {
      this.lists = null
      this.getAccountApproveHis();
    },
    methods: {
      //获取审批进程请求
      getAccountApproveHis () {
          var _this = this;
          _this.$$axios({
              restUrl: 'getAccountApproveHis',
              join: [ _this.info.userId, _this.process.businessKeyId ],
              loading : true
          })
          .then((response) => { 
              if(!response){
                  _this.lists = [];
                  return;
              }else if(response.length == 0){
                  _this.lists = [];
                  return;
              }else{
                  _this.lists = response;
              }
          })
          .catch((res) => {
              console.log('res', res);
          })
      }
    }
  }
</script>
