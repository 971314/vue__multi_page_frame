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
      <div class="details_info" @click="$router.push('/approvalProcess')">
        <div>申请信息</div>
        <div>
          <span>申请内容</span>
          <span>{{details.bizType}}</span>
        </div>
        <div>
          <span>模板名称</span>
          <span>{{$$getTimeFmt(details.appDate, '-')}}</span>
        </div>
        <div>
          <span>提交时间</span>
          <span>{{$$getTimeFmt(details.appDate, '-')}}</span>
        </div>
      </div>
      <div class="details_schedule">
        <span>审批进度</span>
        <span>{{details.auditStatus}}</span>
        <img src="../images/gengDuo.png" class="gengduo"/>
      </div>
      <div class="details_remarks">
        <div>备注内容</div>
        <span>{{details.TaskNote}}</span>
      </div>
      <div class="details_annex" v-show="details.attachs && details.attachs.length > 0">
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
          auditStatus: ''
        }
      }
    },
    created () {
    },
    mounted () {
      console.log()
    },
    activated () {
      this.getData()
    },
    methods: {
      revokedClick () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.delete(PBHttpServer.apply.serverUrl + this.urlList.approvalSubmit.url + _this.info.userId + '/' + _this.task.bizTypeId + '/' + _this.task.bizId, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.$alert({
              maskClosable: true,
              massage: '<div style="text-align: center">撤回成功</div>',
              click: () => {
                _this.$router.push('/approvalIndex')
              }
            })
          } else {
            _this.$toast(data.desc)
          }
        }).catch((err) => {
          _this.$loading.hide()
          _this.$toast('网络超时，请稍后重试！')
          console.log(err)
        })
      },
      getData () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.getInfo()
        _this.$axios.get(PBHttpServer.apply.serverUrl + this.urlList.approvalSubmit.url + _this.info.userId + '/' + this.$store.state.task.bizTypeId + '/' + this.$store.state.task.bizId, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          _this.$loading.hide()
          console.log(data)
          if (data.retHead == 0) {
            _this.details = data.data
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
