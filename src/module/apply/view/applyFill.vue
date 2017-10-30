<template>
  <div class="apply_fill">
    <common-nav>
      <span slot="body">{{apply.tplTypeName}}</span>
      <span slot="footer" @click="submitClick">提交</span>
    </common-nav>
    <div class="conter">
      <div class="fill_type" v-show="apply.tplTypeModel == 2">
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

          <!--<span v-model="fillData.userName"></span>-->
        </div>
        <div class="fill_group">
          <span>工号</span>
          <input type="text" v-model="info.crmAccount "/>
          <!--<span v-model="fillData.crmAccount"></span>-->
        </div>
        <div class="fill_group">
          <span>营业部</span>
          <input type="text" v-model="info.departName "/>
          <!--<span v-model="fillData.departName"></span>-->
        </div>
      </div>
      <div class="fill_group" @click="$router.replace('/applyOpt')">
        <span>模板选择</span>
        <span>{{template.tplName}}</span>
        <img src="../images/gengDuo.png" class="gengduo"/>
      </div>
      <div class="text_field">
        <!--<input type="textarea"/>-->
        <textarea class="textarea" placeholder="备注" v-model="fillData.note"></textarea>
        <div class="annex_icon">
          <input type="file" accept="image/*" id="upLoad" @change="turnBase64"/>
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
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        fillData: {
          investorName: '溜溜',//客户姓名
          capitalAccount: '123456',//资金账号
          note: '备注备注备注备注备注备注备注备注备注',//备注
          InvestorId: '123'//投资者编号
        },
        attachs: []//附件
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
      closeClick (i) {
        this.attachs.splice(i, 1)
      },
      submitClick () {
        let _this = this
        if (this.template.tplId != '') {
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
          }, {timeout: 10000}).then((data) => {
            data = data.data
            console.log(data)
            _this.$loading.hide()
            if (data.retHead == 0) {

            } else {
              _this.$toast(data.desc)
            }
          }).catch((err) => {
            _this.$loading.hide()
            _this.$toast('网络超时，请稍后重试！')
            console.log(err)
          })
        } else {
          _this.$toast('请选择模板！')
        }

      },
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
      }
    }
  }
</script>
