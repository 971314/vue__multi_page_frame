<template>
  <div class="apply_fill">
    <common-nav>
      <span slot="body">{{apply.tplTypeName}}</span>
      <span slot="footer" @click="submitClick">提交</span>
    </common-nav>
    <div class="conter">
      <!-- <div class="fill_type" v-show="apply.tplTypeModel == 2">
         <div class="fill_group">
           <span>客户姓名</span>
           <span>{{fillData.investorName}}</span>
           <img src="../images/gengDuo.png" class="gengduo"/>
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
      <div class="fill_group">
        <span>申请人类型</span>
        <span :class="fillData.investorType == '选择申请类型' ? 'c4':''"
              @click="showEvent = true">{{fillData.investorType}}</span>
      </div>
      <div class="fill_group">
        <span>申请人姓名</span>
        <span :class="fillData.investorName == '选择申请人姓名' ? 'c4':''" @click="selectName">{{fillData.investorName}}</span>
      </div>
      <div class="fill_group" @click="$router.replace('/applyOpt')">
        <span>模板选择</span>
        <span>{{template.tplName}}</span>
        <img src="../images/gengDuo.png" class="gengduo"/>
      </div>
      <div class="fill_group">
        <span>申请起效时间</span>
        <span class="c1">{{startTime}}</span>
        <img src="../images/gengDuo.png" class="gengduo"/>
        <input type="date" v-model="startTime"/>
      </div>
      <div class="fill_group">
        <span>申请终止时间</span>
        <span class="c1">{{endTime}}</span>
        <img src="../images/gengDuo.png" class="gengduo"/>
        <input type="date" v-model="endTime"/>
      </div>
      <div class="text_field">
        <!--<input type="textarea"/>-->
        <textarea class="textarea" placeholder="备注" v-model="fillData.note" maxlength="300"></textarea>
        <div class="annex_icon" @click="limitClick">
          <input type="file" accept="image/*" id="upLoad" @change="turnBase64" v-show="attachs.length <3"/>
        </div>
        <div style="height:.1px"></div>
        <div class="annex_list" v-for="(data,i) in attachs">
          <img src="../images/icon_tuPian.png"/>
          <span>{{data.attachName}}</span>
          <span>{{data.size}}</span>
          <img src="../images/annex_close.png" @click="closeClick(i)"/>
        </div>
      </div>
    </div>
    <multi-slide v-model="showEvent">
      <div class="bottom_modal">
        <div @click="modalclick(1)">客户</div>
        <div @click="modalclick(2)">客户经理</div>
        <div @click="modalclick(3)">居间人</div>
        <div @click="modalclick(4)">法人市场咨询机构</div>
        <div @click="showEvent = false">取消</div>
      </div>
    </multi-slide>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        fillData: {
          investorName: '选择申请人姓名',//申请人姓名
          investorType: '选择申请类型',//申请人类型
          capitalAccount: '123456',//资金账号
          note: '',//备注
          InvestorId: '123'//投资者编号
        },
        attachs: [],//附件
        startTime: this.GetDateStr(0),//起始时间
        endTime: this.GetDateStr(0),//终止时间
        showEvent: false
      }
    },
    mounted () {
      this.getInfo()
    },
    activated () {
      /*this.fillData['investorName'] = ''
      this.fillData['capitalAccount'] = ''
      this.fillData['note'] = ''*/
      this.attachs = []
    },
    computed: {
      ...mapState([
        'apply',
        'template'
      ])
    },
    methods: {
      //附件删除
      closeClick (i) {
        this.attachs.splice(i, 1)
      },
      //提交
      submitClick () {
        let _this = this
        if (this.template.tplId != '') {
          if (this.$$timeFormate({date: this.startTime, format: 'YMD'}) <= this.$$timeFormate({
              date: this.endTime,
              format: 'YMD'
            })) {
            this.$loading.toggle(' ')
            _this.$axios.post(PBHttpServer.apply.serverUrl + this.urlList.approvalSubmit.url + _this.info.userId + '/' + this.apply.tplType, {
              crmAccount: _this.info.crmAccount,
              userName: _this.info.userName,
              departName: _this.info.departName,
              InvestorId: _this.fillData.InvestorId,
              investorName: _this.fillData.investorName,
              capitalAccount: _this.fillData.capitalAccount,
              tplType: _this.apply.tplType,
              tplID: _this.template.tplId,
              note: _this.fillData.note,
              attach: _this.attachs,
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
                  _this.$router.replace('/')
                }, 1500)
              } else {
                _this.$toast(data.desc)
              }
            }).catch((err) => {
              _this.$loading.hide()
              _this.$toast('网络超时，请稍后重试！')
              console.log(err)
            })
          } else {
            this.$toast('起始时间不能大于终止时间！')
          }
        } else {
          _this.$toast('请选择模板！')
        }

      },
      //图片转换base64
      turnBase64 () {
        let imgs = document.getElementById('upLoad').files
        let reader = new FileReader(), attach = {attachName: '', attachUrl: '', size: ''}
        for (let i = 0; i < imgs.length; i++) {
          reader.readAsDataURL(imgs[i])
          reader.onload = function (e) {
            attach['attachName'] = imgs[i].name
            attach['size'] = (imgs[i].size / 1024).toFixed(2) + 'KB'
            attach['attachUrl'] = this.result
          }
          this.attachs.push(attach)
        }
      },
      //选择申请类型
      modalclick (flag) {
        if (flag == 1) {
          this.fillData.investorType = '客户'
        } else if (flag == 2) {
          this.fillData.investorType = '客户经理'
        } else if (flag == 3) {
          this.fillData.investorType = '居间人'
        } else if (flag == 4) {
          this.fillData.investorType = '法人市场咨询机构'
        }
        if (flag == 2) {
          this.fillData.investorName = this.info.userName
        } else {
          this.fillData.investorName = '选择申请人姓名'
        }
        this.showEvent = false
      },
      //选择申请人姓名
      selectName () {
        if (this.fillData.investorType != '客户经理' && this.fillData.investorType != '选择申请类型') {
          this.$router.push('/chooseCustomer')
        } else {
          if (this.fillData.investorType == '选择申请类型') {
            this.$toast('请先选择申请人类型')
          }
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
