<template>
  <div class="info-all">
    <group>
      <cell to="/userInfo/avatar" class="avatar">
        头像
        <img v-if="userInfoAll.avatar" class="avatar" slot="footer" :src="userInfoAll.avatar">
        <!--<img v-else class="avatar" slot="footer" src="../images/useravatar@2x.png">-->
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
      <cell to="/userInfo/nickName">
        昵称
        <span slot="footer">{{ userInfoAll.petName }}</span>
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
      <cell to="/userInfo/sex">
        性别
        <span slot="footer">{{sex}}</span>
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
      <cell @click="chooseAge">
        年龄
        <span slot="footer" v-text="userInfoAll.age > 2 ? `${userInfoAll.age}岁` : '无'"></span>
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
      <cell to="/userInfo/job" class="job">
        职业
        <span slot="footer">{{ userInfoAll.prefessionName ? userInfoAll.prefessionName : '无' }}</span>
        <span slot="footer"><img class="more" src="../images/chakanxiangqing@2x.png"></span>
      </cell>
      <cell to="/userInfo/email">
        邮箱
        <span slot="footer">{{ cipherMail ? cipherMail : '无' }}</span>
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
      <cell to="/userInfo/password">
        应用登录密码
        <span slot="footer">更改</span>
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
    </group>
    <div @click="UserLogOut" class="user-logout">
      退出登录
    </div>
    <multi-slide v-model="showEvent">
      <div class="age-select-title">
        <span class="complete-span" @click="showEvent = false">完成</span>
      </div>
      <picker v-model="userInfoAll.age" size="lg">
        <picker-option v-for="n in 100" :value="n" v-text="`${n}岁`"></picker-option>
      </picker>
    </multi-slide>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        oldAge: null,
        showEvent: false,
        gobackUrl: `goBack`,
        hasArrow: true,
        testToken: null,
        testId: null
      }
    },
    computed: {
      ...mapState([
        'userInfoAll',
        'isFisrt'
      ]),
      sex: function () {
        if (this.userInfoAll.sex) {
          let sex = this.getSex(this.userInfoAll.sex);
          return sex;
        } else if (this.userInfoAll.sex == '0' || this.userInfoAll.sex == 0) {
          let sex = this.getSex(this.userInfoAll.sex);
          return sex;
        }
        return '';
      },
      cipherMail: function () {
        if (this.userInfoAll.email) {
          var cipherMail = this.getCipherMail(this.userInfoAll.email);
          this.userInfoAll.cipherMail = cipherMail;
          return cipherMail;
        }
        return '';
      },
      prefession: function () {
        if (this.userInfoAll.prefession) {
          if (this.prefessionList.length > 0) {
            this.prefessionList.map((item) => {
              if (item.proId === this.userInfoAll.prefession) {
                this.userInfoAll.prefessionName = item.proName;
              }
            });
          }
        }
      }
    },
    activated() {
      this.testToken = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '11111111111kkkkkkskskslslslsls';//token
      this.testId = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '8';//认证userId/id
      this.$emit('change-title', '个人资料');
      this.$emit('change-goback-url', 'close');
      this.$forceUpdate();
      console.log('this.isFisrt', this.isFisrt);
      if (this.isFisrt) {
        this.sendInfo();
      }
    },
    watch: {
      showEvent(val, oldVal) {
        if (!val) {
          if (this.userInfoAll.age != this.oldAge) {
            this.oldAge = this.userInfoAll.age
            this.sendInfo();
          }
        }
      }
    },
    methods: {
      UserLogOut() {
        if (pbE.isPoboApp) {
          pbE.SYS().clearAuthData();
          pbE.MSG().ytzCloudRequestBindingEquipment(2);//云通知解绑
          location.href = 'pobo:uncheck=0&pageId=800011&url=mine/index.html#/';
        }
      },
      chooseAge() {
        this.showEvent = true
      },
      getSex (flag) {
        if (flag == '1') {
          return '男';
        } else if (flag == '2') {
          return '女';
        } else if (flag == '3') {
          return '非人类';
        }
        return '未知';
      },
      getCipherMail (mail) { //对邮箱进行切割
        var index = mail.indexOf('@');
        var mailname = mail.substr(0, index);
        var maildomain = mail.substr(index);

        if (mailname.length > 3) {
          mailname = mailname.substr(0, 3) + '***';
        } else {
          mailname = mailname + '***';
        }
        return mailname + maildomain;
      },
      sendInfo() {
        this.$axios.post(this.postUrl, {
          "func": "111",
          "data": [
            {
              "userId": this.testId,
              "token": this.testToken,
              "petName": this.userInfoAll.petName,
              "sex": this.userInfoAll.sex + '',
              "prefessionId": this.userInfoAll.prefession + '',
              "email": this.userInfoAll.email ? this.userInfoAll.email : '',
              "age": this.userInfoAll.age + ''
            }
          ]
        })
          .then((response) => {
            if (response.data.retHead == '0') {
//              this.$toast('修改成功！')
            } else {
              this.$toast(response.data.desc)
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  }
</script>
