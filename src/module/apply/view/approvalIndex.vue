<template>
  <div class="approval_index">
    <common-nav>
      <span slot="body">审批进程</span>
    </common-nav>
    <div class="approval_tab">
      <span :class="qrytype == 0?'selected':''" @click="tabClick(0)">全部</span>
      <span :class="qrytype == 1?'selected':''" @click="tabClick(1)">审批中</span>
      <span :class="qrytype == 2?'selected':''" @click="tabClick(2)">已完成</span>
    </div>
    <div class="approval_conter">
      <div class="approval_cell" @click="jumpClick(data)" v-for="data in approvalData">
        <div>
          <span>{{data.appObjName}}&nbsp;&nbsp;{{data.bizType}}</span>
          <span>{{data.appDate}}</span>
        </div>
        <span
          :class="{'c1':data.auditStatus== '通过','c2':data.auditStatus== '审批中','c3':data.auditStatus== '驳回'}">{{data.auditStatus}}</span>
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
        approvalData: [
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '通过',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '驳回',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          },
          {
            bizType: '手续费率优惠',
            bizId: '100000001',
            appObjName: '张三',
            auditStatus: '审批中',
            appDate: '10-20 20:20',
            auditorComment: 'auditorComment'
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'task'
      ])
    },
    mounted () {
      this.tabClick(0)
    },
    methods: {
      //tab切换
      tabClick (flag) {
        let _this = this
        _this.qrytype = flag
      },
      //点击跳转详情
      jumpClick (data) {
        let taskData = {}
        taskData['bizTypeId'] = data.bizType
        taskData['bizId'] = data.bizId
        this.$store.dispatch('updataTask',taskData)
        this.$router.push('/approvalDetails')
      }
    }
  }
</script>
