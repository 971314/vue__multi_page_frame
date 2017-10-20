<template>
  <div class="approval_details">
    <common-nav>
      <span slot="body">申请详情</span>
      <span slot="footer">
        <span v-if="details.auditStatus == '待审批'" @click="revokedClick">撤回</span>
        <span v-else class="c4">撤回</span>
      </span>
    </common-nav>
    <div class="conter">
      <div class="details_header">
        <img src="../images/avatar_img.png"/>
        <div>
          <span>{{details.investorName}}</span>
          <span>资金账号 {{details.capitalAccount }}</span>
          <span> 营业部门 {{details.DeptName}}</span>
        </div>
      </div>
      <div class="details_info">
        <div>申请信息</div>
        <div>
          <span>申请内容</span>
          <span>{{details.bizType}}</span>
        </div>
        <div>
          <span>提交时间</span>
          <span>{{details.appDate}}</span>
        </div>
      </div>
      <div class="details_schedule" @click="approvalProgress(details)">
        <span>审批进度</span>
        <span>{{details.auditStatus}}</span>
        <img src="../images/gengDuo.png" class="gengduo"/>
      </div>
      <div class="details_remarks">
        <div>备注内容</div>
        <span>{{details.TaskNote}}</span>
      </div>
      <div class="details_annex">
        <div>附件信息</div>
        <a class="annex_list" v-for="data in details.attachs" :href="data.attachUrl">
          <img src="../images/icon_tuPian.png"/>
          <span>{{data.attachName}}</span>
          <span>{{data.attachSize}}</span>
          <img src="../images/gengDuo.png" class="gengduo"/>
        </a>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        details: {
          investorName: '张三',//客户姓名
          capitalAccount: '123456',//资金账户
          DeptName: '世纪大道营业部',//营业部名称
          bizType: '手续费优惠',//申请任务类型
          TaskNote: '备注备注备注备注备注备注',//备注
          appDate: '10-10 20:20',//提交任务时间
          auditStatus: '000',//审批状态
          auditorComment: '审批意见审批意见审批意见审批意见',//审批意见
          attachs: [//附件
            {
              attachName: '123456.png',
              attachUrl: '',
              attachSize: '236KB'
            },
            {
              attachName: '123456.png',
              attachUrl: '',
              attachSize: '236KB'
            },
            {
              attachName: '123456.png',
              attachUrl: '',
              attachSize: '236KB'
            },
            {
              attachName: '123456.png',
              attachUrl: '',
              attachSize: '236KB'
            }
          ]

        }
      }
    },
    mounted () {
      console.log()
    },
    methods: {
      approvalProgress (data) {
        console.log(data)
        this.$router.push('/approvalProcess')
      },
      revokedClick () {
        console.log('13')
      }
    }
  }
</script>
