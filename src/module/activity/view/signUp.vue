<template>
  <div class="pb-sign-up">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="sign-up-title" slot="body">
        报名参加
      </div>
    </common-nav>
    <div class="sign-up-center">
      <div class="sign-up-banner">
        <!--<div class="sign-up-bg1" :style="{'background-image': `url(${activeInfok.imgPath})`}"></div>-->
        <div class="sign-up-bg bg-blur" :style="{'background-image': `url(${activeInfok.imgPath})`}"></div>
        <div class="center-transparent-bg"></div>
        <div class="center-tips-content">
          <div class="banner-content-all">
            <div class="banner-content-detail">
              <div class="banner-content-title" :class="{'banner-34px-font': activeInfok.actName.length >= 25}"
                   v-text="activeInfok.actName">
              </div>
              <div class="px1-banner-splice"></div>
              <div class="banner-content-info">
                <div class="banner-time">
                  <span v-if="timeContent" class="banner-time-context" v-text="timeContent"></span>
                  <span v-else class="banner-time-context"
                        v-text="`${activeInfok.beginTime} - ${activeInfok.endTime}`"></span>
                </div>
                <div v-if="activeInfok.region" class="banner-location">
                <span class="banner-location-context"
                      v-text="`${activeInfok.region} ${activeInfok.address}`"></span>
                </div>
                <div v-else class="banner-online">
                  <span class="banner-location-context">线上</span>
                </div>
                <div class="banner-people">
                  <span class="banner-people-context" v-text="`${activeInfok.scale}`"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sign-up-input">
        <div class="sign-input-group">
          <div class="sign-input-item report-name">
            <input class="sign-input-text" type="text" v-model="userInfo.username" placeholder="请输入姓名"/>
            <span class="sign-input-important"></span>
          </div>
          <div class="sign-input-item report-cellphone">
            <input class="sign-input-text" type="tel" v-model="userInfo.phone" placeholder="请输入手机号"/>
            <span class="sign-input-important"></span>
          </div>
          <div class="sign-input-item report-email">
            <input class="sign-input-text" type="email" v-model="userInfo.email" placeholder="请输入邮箱"/>
            <span class="sign-input-important"></span>
          </div>
          <div class="sign-input-item report-company">
            <input class="sign-input-text" type="text" v-model="userInfo.company" placeholder="请输入公司名称"/>
          </div>
          <div class="sign-input-item report-job">
            <input class="sign-input-text" type="text" v-model="userInfo.postion" placeholder="请输入职位名称"/>
          </div>
        </div>
      </div>
    </div>

    <div class="report-submit">
      <div class="submit-btn" @click="submit" :class="{'disabled-submit-btn': isDisabled}">
        提交
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default{
    data() {
      return {
        clickFlag: true,
        timeContent: '',
        gobackUrl: 'goBack',
        isDisabled: true,      //是否不能提交
        isChangeFont: false,     //判断超过25字则更换字体
        userInfo: {  //个人信息
          username: '',
          phone: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745',//手机号/用户名
          email: '',
          company: '',
          postion: ''
        },
        activeInfok: {
          actId: ``,  //活动ID
          actName: ``,  //活动名称
          beginTime: ``, //开始时间
          endTime: ``,  //结束时间
          address: ``,  //地址
          region: ``, //区域
          scale: ``,   //规模
          imgPath: ``  //图片
        }
      }
    },
    watch: {
      'userInfo.username': function (val, oldVal) {
        if (val) {
          this.isDisabled = true;
          if (this.userInfo.phone && this.userInfo.email) {
            this.isDisabled = false;
          }
        } else {
          this.isDisabled = true;
        }
      },
      'userInfo.phone': function (val, oldVal) {
        if (val) {
          this.isDisabled = true;
          if (this.userInfo.username && this.userInfo.email) {
            this.isDisabled = false;
          }
        } else {
          this.isDisabled = true;
        }
      },
      'userInfo.email': function (val, oldVal) {
        if (val) {
          if (this.userInfo.phone && this.userInfo.username) {
            this.isDisabled = false;
          }
        } else {
          this.isDisabled = true;
        }
      }
    },
    computed: {
      ...mapState([
        'activeInfo',
        'enrollAcID'
      ])
    },
    mounted() {
      this.copyInfo();
      document.querySelector('body').style.backgroundColor = '#f7f7fa';
      document.querySelector('html').style.backgroundColor = '#f7f7fa';
      document.getElementById('navbarContent').style.display = 'none';
    },
    methods: {
      copyInfo() { //赋值数据
        this.activeInfok['actId'] = this.activeInfo['actId'];
        this.activeInfok['actName'] = this.activeInfo['actName']
        this.activeInfok['beginTime'] = this.activeInfo['beginTime'];
        this.activeInfok['endTime'] = this.activeInfo['endTime'];
        this.activeInfok['address'] = this.activeInfo['address'];
        this.activeInfok['actId'] = this.activeInfo['actId'];
        this.activeInfok['region'] = this.activeInfo['region'];
        this.activeInfok['scale'] = this.activeInfo['scale'];
        this.activeInfok['imgPath'] = this.activeInfo['imgPath'];

        if (this.activeInfo['beginTime'].split(' ')[0] == this.activeInfo['endTime'].split(' ')[0]) {
          this.timeContent = `${this.activeInfo['beginTime'].split(' ')[0].split('/')[0]}/${this.activeInfo['beginTime'].split(' ')[0].split('/')[1]} ${this.activeInfo['beginTime'].split(' ')[1].split(':')[0]}:${this.activeInfo['beginTime'].split(' ')[1].split(':')[1]} - ${this.activeInfo['endTime'].split(' ')[1].split(':')[0]}:${this.activeInfo['endTime'].split(' ')[1].split(':')[1]}`;
        }
      },
      submit() { //提交
        if (!this.clickFlag) {
          return;
        }
        if (this.isDisabled) {
          return;
        }

        if (!this.isNameNull() || !this.isPhoneNull() || !this.isEmailNull || !this.checkUserName() || !this.checkPhone() || !this.checkEmail()) {
          return;
        }
        this.clickFlag = false;
        let params = {
          "func": "11103",
          "data": [{
            "actId": this.activeInfok['actId'],
            "userId": this.userId,
            "username": this.userInfo['username'],
            "phone": this.userInfo['phone'],
            "email": this.userInfo['email'],
            "company": this.userInfo['company'],
            "postion": this.userInfo['postion']
          }]
        };
        this.$post({restUrl: 'ActiveSignUp', params: params})
          .then((response) => {
            this.clickFlag = true;
            if (response.data.retHead != '0') {
              this.$alert({
                maskClosable: true,
                btns: [{
                  text: '确定',
                  click: () => {
                    this.$router.back();
                  }
                }],
                message: `<p>${response.data.desc}</p>`
              })
            } else {
              this.$alert({
                maskClosable: true,
                btns: [{
                  text: '确定',
                  click: () => {
                    let userSelfPhone = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '18292320745';
                    if (this.userInfo['phone'] == userSelfPhone) {
                      this.$store.dispatch('updateenrollAcID', this.activeInfok['actId']);
                    }
                    this.$router.back();
                  }
                }],
                message: '<p>提交成功!</p>'
              })
            }

          })
          .catch((res) => {
            this.clickFlag = true;
            console.log(res);
          });

      },
      isNameNull() { //姓名是否为空
        if (Object.is(this.userInfo.username, '') || Object.is(this.userInfo.username, undefined)) {
          this.$toast("姓名为必填项！");
          return false;
        }
        return true;
      },
      isPhoneNull() { //电话号码是否为空
        if (Object.is(this.userInfo.phone, '') || Object.is(this.userInfo.phone, undefined)) {
          this.$toast("电话号码为必填项！");
          return false;
        }
        return true;
      },
      isEmailNull() { //邮箱是否为空
        if (Object.is(this.userInfo.email, '') || Object.is(this.userInfo.email, undefined)) {
          this.$toast("邮箱为必填项！");
          return false;
        }
        return true;
      },
      checkUserName() {
        if (this.userInfo.username.length < 2) {
          this.$toast("姓名不能少于2个字！");
          return false;
        }
        return true;
      },
      checkPhone() {
        if (!this.userInfo.phone.match(/^[0-9]{11}$/)) {
          this.$toast("手机号格式不正确！");
          return false;
        }
        return true;
      },
      checkEmail() {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //名称允许汉字、字母、数字，域名只允许英文域名
        let reg1 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //只允许英文字母、数字、下划线、英文句号、以及中划线组成
        if (this.userInfo.email.indexOf('@') <= -1 || !reg.test(this.userInfo.email) && !reg1.test(this.userInfo.email)) {
          this.$toast("邮箱格式不正确！");
          return false;
        }
        return true;
      }
    }
  }
</script>
