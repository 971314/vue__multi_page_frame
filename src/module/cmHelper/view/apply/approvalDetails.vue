<template>
  <div class="approval_details">
    <common-nav>
      <span slot="body">申请详情</span>
      <span slot="footer">
        <span v-if="details[0] && details[0].appStatus == '0'" @click="revokedClick">撤回</span>
      </span>
    </common-nav>
    <div class="conter">
      <!--<div class="details_header">
        <img src="../../images/apply/avatar_img.png"/>
        <div>
          <span>{{details.investorName}}</span>
          <span>资金账号 {{details.capitalAccount }}</span>
          <span> 营业部门 {{details.DeptName}}</span>
        </div>
      </div>-->

      <div class="details_info" @click="$router.push('/approvalProcess')" v-show="details[0]">
        <div>申请人</div>
        <div>
          <span>类型</span>
          <span>{{details[0].appobjectTypeName}}</span>
        </div>
        <div>
          <span>姓名</span>
          <span>{{details[0].appObjectName}}</span>
        </div>
      </div>
      <div class="details_info">
        <div>申请项目</div>
        <div>
          <span>申请类型</span>
          <span>{{details[0].processName}}</span>
        </div>
        <div @click="details[0].tplName != '非模板' ?iconClick(details[0]):''">
          <span>模板名称</span>
          <span class="c1">{{details[0].tplName}}</span>
        </div>
        <div>
          <span>申请期间</span>
          <span>{{$$timeFormate({
            date: details[0].availBeginDate,
            format: 'Y-M-D'
          })}} 至 {{$$timeFormate({date: details[0].availEndDate, format: 'Y-M-D'})}}</span>
        </div>
      </div>
      <div class="details_schedule">
        <span>提交时间</span>
        <span>{{$$timeFormate({date: details[0].appDateTime, format: 'Y-M-D h:m'})}}</span>
      </div>
      <div class="details_schedule" @click="$router.push('/approvalProcess')">
        <span>审批进度</span>
        <span class="c1">{{details[0].appStatusName}}</span>
        <img src="../../images/apply/gengDuo.png" class="gengduo"/>
      </div>
      <div class="details_remarks">
        <div>备注内容</div>
        <span :style="{'-webkit-line-clamp':noteShow?'14':'2'}"
              @click="noteShow =! noteShow">{{details[0].note}}</span>
      </div>
      <div class="details_annex" v-show="details[0].attachs && details[0].attachs.length > 0">
        <div>附件信息</div>
        <a class="annex_list" v-for="data in details[0].attachs"
           @click="$router.push({path:'/preview',query: {imgurl:imgUrl + data.url}})">
          <img src="../../images/apply/icon_tuPian.png"/>
          <span>{{data.name}}</span>
          <span>{{data.size}}</span>
          <img src="../../images/apply/gengDuo.png" class="gengduo"/>
        </a>
      </div>
    </div>

  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        details: [
          {
            appStatus: '0'
          }
        ],
        noteShow: false,
        imgUrl: ''
      }
    },
    computed: {
      ...mapState({
        task: ({apply}) => apply.task,
        taskDetails: ({apply}) => apply.taskDetails
      })
    },
    created () {
    },
    mounted () {
      console.log()
    },
    activated () {
      this.imgUrl = PBHttpServer.cmHelper.serverUrl + this.urlList.imageView.url + this.info.userId + '/'
      this.getData()
    },
    methods: {
      //撤回请求
      revokedClick () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.delete(PBHttpServer.cmHelper.serverUrl + this.urlList.approvalSubmit.url + _this.info.userId + '/' + _this.task.processId + '/' + _this.task.businessKeyId, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.$toast('撤回成功！')
            setTimeout(() => {
              _this.$router.push('/approvalIndex')
            }, 1500)
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
      },
      //获取详情请求
      getData () {
        let _this = this
        _this.$loading.toggle(' ')
        _this.$axios.get(PBHttpServer.cmHelper.serverUrl + this.urlList.approvalSubmit.url + _this.info.userId + '/' + this.task.businessKeyId, {
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
            _this.$store.dispatch('updataTaskDetails', {
//              operatorName: data.data[0].operatorName,
              appStatusName: data.data[0].appStatusName,
              processName: data.data[0].processName,
              appDateTime: _this.$$timeFormate({date: data.data[0].appDateTime, format: 'Y-M-D h:m'})
            })
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
      },
      //模板介绍模态框
      iconClick (data) {
        this.$alert({
          maskClosable: true,
          message: data.tplDesc.replace(/【/g, '<br/>【'),
          title: data.tplName
        })
      }
    }
  }
</script>
