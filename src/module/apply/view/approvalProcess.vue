<template>
  <div class="approval_process">
    <common-nav>
      <span slot="body">审批进程</span>
    </common-nav>
    <div class="process_header">
      <div><span>审核状态</span> <span>{{processData.auditStatus}}</span></div>
      <div><span>申请内容</span> <span>{{processData.bizType}}</span></div>
      <div><span>提交时间</span> <span>{{processData.appDate}}</span></div>
    </div>
    <div class="process_bottom">
      <div class="process_cell" v-for=" (data,i) in processData.his">
        <div>
          <span>{{data.opDate}}</span>
          <i v-if="data.opType == '通过'" class="by"></i>
          <i v-else-if="data.opType == '待审批'" class="by1"></i>
          <i v-else-if="data.opType == '驳回'" class="by2"></i>
          <span class="line"></span>
        </div>
        <div>
          <div :class="{'c1':i == 0 && data.opType == '待审批','c2':i == 0 && data.opType == '通过','c3':i == 0 && data.opType == '驳回'}">{{data.opType}}</div>
          <div>{{data.auditorName}} {{data.auditorComment}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        processData: {
          bizType: '手续费优惠',//类型
          appDate: '2017-10-20 20:10',//时间
          auditStatus: '审批中',//当前状态
          his: [
            {
              opDate: '10-20 20:10',//操作时间
              auditorId: '',//审核员工号
              auditorName: '张三',//审核员名称
              opType: '驳回',//操作类型
              auditorComment: '123456'//审批意见
            },
            {
              opDate: '20-10 20:20',//操作时间
              auditorId: '',//审核员工号
              auditorName: '张三',//审核员名称
              opType: '通过',//操作类型
              auditorComment: '123456'//审批意见
            },
            {
              opDate: '20-10 20:20',//操作时间
              auditorId: '',//审核员工号
              auditorName: '张三',//审核员名称
              opType: '通过',//操作类型
              auditorComment: '123456'//审批意见
            },
            {
              opDate: '20-10 20:20',//操作时间
              auditorId: '',//审核员工号
              auditorName: '张三',//审核员名称
              opType: '通过',//操作类型
              auditorComment: '123456'//审批意见
            }
          ]
        }
      }
    }
  }
</script>
