<template>
  <div class="apply_fill">
    <common-nav>
      <span slot="body">{{apply.processName}}</span>
      <span slot="footer" @click="submitClick">提交</span>
    </common-nav>
    <div class="conter">

      <!-- <div class="fill_type" v-show="apply.tplTypeModel == 2">
         <div class="fill_group">
           <span>客户姓名</span>
           <span>{{fillData.investorName}}</span>
           <img src="../../images/apply/gengDuo.png" class="gengduo"/>
         </div>
         <div class="fill_group">
           <span>资金账号</span>
           <input type="text" v-model="fillData.capitalAccount "/>
         </div>
       </div>
       <div class="fill_type" v-show="apply.tplTypeModel == 1">
         <div class="fill_group">
           <span>申请人</span>
           <input type="text" v-model="info.userName "/>

           &lt;!&ndash;<span v-model="fillData.userName"></span>&ndash;&gt;
         </div>
         <div class="fill_group">
           <span>工号</span>
           <input type="text" v-model="info.crmAccount "/>
           &lt;!&ndash;<span v-model="fillData.crmAccount"></span>&ndash;&gt;
         </div>
         <div class="fill_group">
           <span>营业部</span>
           <input type="text" v-model="info.departName "/>
           &lt;!&ndash;<span v-model="fillData.departName"></span>&ndash;&gt;
         </div>
       </div>-->

      <div class="fill_group" @click="apply.processModel == '1'?showEvent = false:showEvent = true">
        <span>申请人类型</span>
        <span :class="fillData.investorType == '选择申请类型' ? 'c4':''">{{fillData.investorType}}</span>
        <img src="../../images/apply/gengDuo.png" class="gengduo"/>
      </div>
      <div class="fill_group" @click="selectName">
        <span>申请人姓名</span>
        <span :class="appObject.appObjectName == '选择申请人姓名' ? 'c4':''">{{appObject.appObjectName}}</span>
        <img src="../../images/apply/gengDuo.png" class="gengduo"/>
      </div>
      <div class="fill_group" @click="$router.push('/applyOpt')">
        <span>模板选择</span>
        <span>{{template.tplName}}</span>
        <img src="../../images/apply/gengDuo.png" class="gengduo"/>
      </div>
      <div class="fill_group" v-show="apply.processhasDate == '1'">
        <span>申请起效时间</span>
        <span class="c1">{{startTime}}</span>
        <img src="../../images/apply/gengDuo.png" class="gengduo"/>
        <input type="date" v-model="startTime"/>
      </div>
      <div class="fill_group" v-show="apply.processhasDate == '1'">
        <span>申请终止时间</span>
        <span class="c1">{{endTime}}</span>
        <img src="../../images/apply/gengDuo.png" class="gengduo"/>
        <input type="date" v-model="endTime"/>
      </div>
      <div class="text_field">
        <!--<input type="textarea"/>-->
        <textarea class="textarea" placeholder="备注" v-model="fillData.note" maxlength="300"></textarea>
        <div class="annex_icon" @click="limitClick">
          <input type="file" accept="image/*" id="upLoad" @change="turnBase64" v-show="attachs.length <3"/>
        </div>
        <div style="height:.1px"></div>
        <div class="annex_list" v-for="(data,i) in attachs" @click="imgModal(data.url)">
          <img src="../../images/apply/icon_tuPian.png"/>
          <span>{{data.name}}</span>
          <span>{{data.size}}</span>
          <img src="../../images/apply/annex_close.png" @click.stop="closeClick(i)"/>
        </div>
      </div>
    </div>
    <multi-slide v-model="showEvent">
      <div class="bottom_modal">
        <div @click="modalclick(1)">客户</div>
        <div @click="modalclick(3)">居间人</div>
        <div @click="showEvent = false">取消</div>
      </div>
    </multi-slide>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  //  import qs from 'qs'

  export default {
    data () {
      return {
        fillData: {
//          investorName: '选择申请人姓名',//申请人姓名
          investorType: '选择申请类型',//申请人类型
          capitalAccount: '123456',//资金账号
          note: '',//备注
          InvestorId: '123'//投资者编号
        },
        attachs: [],//附件
        /*startTime: this.apply.processhasDate == 1 ? this.GetDateStr(0) : '',//起始时间
        endTime: this.apply.processhasDate == 1 ? this.$$timeFormate({
          date: this.getTimeByParam(12),
          format: 'Y-M-D'
        }) : '',//终止时间*/
        startTime: '',
        endTime: '',
        showEvent: false
      }
    },
    mounted () {
      this.apply.processModel == '1' ? this.fillData.investorType = '客户' : this.fillData.investorType = '选择申请类型'
    },
    activated () {
      /*this.startTime = this.apply.processhasDate == 1 ? this.GetDateStr(0) : ''
      this.endTime = this.apply.processhasDate == 1 ? this.$$timeFormate({
        date: this.getTimeByParam(12),
        format: 'Y-M-D'
      }) : ''*/
    },
    computed: {
      ...mapState({
        apply: ({apply}) => apply.apply,
        template: ({apply}) => apply.template,
        appObject: ({apply}) => apply.appObject,
        approvedPersonnelInfo: ({apply}) => apply.approvedPersonnelInfo,
        jumpFlag: ({followUpRecord}) => followUpRecord.jumpFlag,
        investor: ({followUpRecord}) => followUpRecord.investor,
        addFollow: ({followUpRecord}) => followUpRecord.addFollow
      })
    },
    watch: {
      '$route' (to, from) {
        if (to.path == '/applyFast') {
          this.attachs = []
          this.fillData['investorType'] = '选择申请类型'
          this.$store.dispatch('updataAppObject', {
            appObjectName: '选择申请人姓名'
          })
          this.$store.dispatch('updataTemplate', {tplId: '', tplName: ''})
          this.fillData.note = ''
          this.startTime = ''
          this.endTime = ''
        } else if (to.path == '/applyFill' && from.path == '/applyFast') {
          this.apply.processModel == '1' ? this.fillData.investorType = '客户' : this.fillData.investorType = '选择申请类型'
        } else if (to.path == '/applyFill' && from.path == '/customerInfoList') {
          this.$store.dispatch('updataAppObject', {
            appObjectId: this.investor.INVESTOR_ID,
            appObjectType: '0',
            appObjectName: this.investor.INVESTOR_NAM
          })
        }
      },
      'startTime' (o) {
        if (o) {
          this.endTime = this.$$timeFormate({
            date: this.getTimeParam(12),
            format: 'Y-M-D'
          })
        }

      }
    },
    methods: {
      //附件删除
      closeClick (i) {
        this.attachs.splice(i, 1)
      },
      //提交
      submitClick () {
        let _this = this
        if (this.fillData.investorType == '选择申请类型') {
          _this.$toast('请选择申请类型！')
          return
        }
        if (this.appObject.appObjectName == '选择申请人姓名') {
          _this.$toast('请选择申请人姓名！')
          return
        }
        if (!this.template.tplId) {
          _this.$toast('请选择模板!')
          return
        }
        if (this.$$timeFormate({date: this.startTime, format: 'YMD'}) > this.$$timeFormate({
            date: this.endTime,
            format: 'YMD'
          })) {
          this.$toast('起始时间不能大于终止时间！')
          return
        }
        this.$loading.toggle(' ')
        _this.$axios.post(PBHttpServer.cmHelper.serverUrl + this.urlList.approvalSubmit.url + _this.info.userId, {
          operatorId: _this.approvedPersonnelInfo.operatorId,
          operatorName: _this.approvedPersonnelInfo.operatorName,
          departId: _this.approvedPersonnelInfo.departId,
          departName: _this.approvedPersonnelInfo.departName,
          operatorposition: _this.approvedPersonnelInfo.operatorposition,
          appObjectType: _this.appObject.appObjectType,
          appObjectId: _this.appObject.appObjectId,
          appObjectName: _this.appObject.appObjectName,
          tplId: _this.template.tplId,
          availBeginDate: _this.$$timeFormate({date: _this.startTime, format: 'Y-M-D h:m:s'}),
          availEndDate: _this.$$timeFormate({date: _this.endTime, format: 'Y-M-D h:m:s'}),
          note: _this.fillData.note,
          attachlist: _this.attachs,
          processKey: _this.apply.processKey,
          processId: _this.apply.processId
        }, {
          timeout: 10000,
          headers: {
            id: _this.info.token
          }
        }).then((data) => {
          data = data.data
          console.log(data)
          _this.$loading.hide()
          if (data.retHead == 0) {
            _this.$toast('提交成功')
            setTimeout(() => {
              _this.attachs = []
              _this.fillData['investorType'] = '选择申请类型'
              _this.$store.dispatch('updataAppObject', {
                appObjectName: '选择申请人姓名'
              })
              _this.$store.dispatch('updataTemplate', {tplId: '', tplName: ''})
              _this.fillData.note = ''
              _this.startTime = ''
              _this.endTime = ''
              _this.$router.replace('/approvalIndex')
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
      //图片上传
      turnBase64 () {
        this.$loading.toggle(' ')
        //图片转换base64
        /*let imgs = document.getElementById('upLoad').files
        let reader = new FileReader(), attach = {attachName: '', attachUrl: '', size: ''}
        for (let i = 0; i < imgs.length; i++) {
          reader.readAsDataURL(imgs[i])
          reader.onload = function (e) {
            attach['attachName'] = imgs[i].name
            attach['size'] = (imgs[i].size / 1024).toFixed(2) + 'KB'
            attach['attachUrl'] = this.result
          }
          this.attachs.push(attach)*/
        let _this = this,
          formData = new FormData(),
          imgs = document.getElementById('upLoad').files[0]
        formData.append('file', imgs)
        _this.$axios.post(PBHttpServer.cmHelper.serverUrl + this.urlList.imageUpload.url + _this.info.userId, formData, {
          headers: {
            id: _this.info.token,
            'Content-Type': 'multipart/form-data'
          }
        }).then((data) => {
          data = data.data
          _this.$loading.hide()
          console.log(data)
          if (data.retHead == 0) {
            this.attachs.push(data.data)
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
      //选择申请类型
      modalclick (flag) {
        if (flag == 1) {
          this.fillData.investorType = '客户'
        } else if (flag == 2) {
          this.fillData.investorType = '客户经理'
          this.$store.dispatch('updataAppObject', {
            appObjectId: this.approvedPersonnelInfo.operatorId,
            appObjectType: '2',
            appObjectName: this.approvedPersonnelInfo.operatorName
          })
        } else if (flag == 3) {
          this.fillData.investorType = '居间人'
        } else if (flag == 4) {
          this.fillData.investorType = '法人市场咨询机构'
        }
        if (flag != 2) {
          this.$store.dispatch('updataAppObject', {
            appObjectName: '选择申请人姓名'
          })
        }
        this.showEvent = false
      },
      //选择申请人姓名
      selectName () {
        if (this.fillData.investorType == '选择申请类型') {
          this.$toast('请先选择申请人类型')
          return
        }
        if (this.fillData.investorType == '客户') {
          this.$store.dispatch('updatepJumpFlag', 3)
          this.$store.dispatch('updateAddFollow', Object.assign(this.addFollow, {businessType: '1'}))
          this.$router.push('/customerInfoList')
        } else if (this.fillData.investorType == '居间人') {
//          this.$router.push('/intermediary')
        }
      },
      //附件上传限制提示
      limitClick () {
        if (this.attachs.length >= 3) {
          this.$toast('上传上限为3个！')
        }
      }
    }
  }
</script>
