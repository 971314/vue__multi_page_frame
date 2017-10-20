<template>
  <div class="apply_fill">
    <common-nav>
      <span slot="body">{{apply.tplTypeName}}</span>
      <span slot="footer" @click="submitClick">提交</span>
    </common-nav>
    <div class="conter">
      <div class="fill_type">
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
      <div class="fill_type">
        <div class="fill_group">
          <span>申请人</span>
          <input type="text" v-model="fillData.userName "/>

          <!--<span v-model="fillData.userName"></span>-->
        </div>
        <div class="fill_group">
          <span>工号</span>
          <input type="text" v-model="fillData.crmAccount "/>
          <!--<span v-model="fillData.crmAccount"></span>-->
        </div>
        <div class="fill_group">
          <span>营业部</span>
          <input type="text" v-model="fillData.departName "/>
          <!--<span v-model="fillData.departName"></span>-->
        </div>
      </div>
      <div class="fill_group" @click="$router.push('/applyOpt')">
        <span>模板选择</span>
        <span>{{template.tplName}}</span>
        <img src="../images/gengDuo.png" class="gengduo"/>
      </div>
      <div class="text_field">
        <!--<input type="textarea"/>-->
        <textarea class="textarea" placeholder="备注" v-model="fillData.note"></textarea>
        <div class="annex_icon">
          <input type="file" accept="image/*" id="upLoad" @change="turnBase64" multiple/>
        </div>
        <div style="height:.1px"></div>
        <div class="annex_list" v-for="(data,i) in attachs">
          <img src="../images/icon_tuPian.png"/>
          <span>{{data.attachName}}</span>
          <!--<span>222kb</span>-->
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
          userName: '六六',//申请人
          crmAccount: '123466',//工号
          departName: '撒旦克里夫',//营业部
          tplType: '',//模板类型
          note: '备注备注备注备注备注备注备注备注备注'//备注
        },
        attachs: [],//附件
      }
    },
    mounted () {
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
        console.log('123')
      },
      turnBase64 () {
        let imgs = document.getElementById('upLoad').files
        let reader = new FileReader(), attach = {attachName: '', attachUrl: ''}
        for (let i = 0; i < imgs.length; i++) {
          console.log(imgs[i])
          reader.readAsDataURL(imgs[i])
          reader.onload = function (e) {
            attach.attachName = imgs[i].name
            attach.attachUrl = this.result
          }
          this.attachs.push(attach)
        }
      }
    }
  }
</script>
