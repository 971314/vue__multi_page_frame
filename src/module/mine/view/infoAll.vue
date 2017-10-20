<template>
  <div class="info-all">
    <group>
      <cell to="/userInfo/avatar" class="avatar">
        头像
        <img v-if="userInfoAll.avatar" class="avatar" slot="footer" :src="userInfoAll.avatar">
        <img v-else class="avatar" slot="footer" src="../images/useravatar@2x.png">
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
        <span slot="footer" v-text="userInfoAll.age ? `${userInfoAll.age}岁` : '岁'"></span>
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
      <cell to="/userInfo/job" class="job">
        职业
        <span slot="footer">{{ userInfoAll.prefessionName }}</span>
        <span slot="footer"><img class="more" src="../images/chakanxiangqing@2x.png"></span>
      </cell>
      <cell to="/userInfo/email">
        邮箱
        <span slot="footer">{{ cipherMail }}</span>
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
      <cell to="/userInfo/password">
        应用登录密码
        <span slot="footer">更改</span>
        <img class="more" slot="footer" src="../images/chakanxiangqing@2x.png">
      </cell>
    </group>
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
  export default{
    props: {
      prefessionList: {
        type: Array,
        default: []
      },
      userInfoAll: {
        type: Object,
        default: function () {
          return {
            avatar: '',
            petName: `嵇伟民`,
            sex: `男`,
            age: 30,
            prefessionName: '金融从业机构人员',
            prefession: `02`,
            email: 'fzjjian584520@qq.com',
            userId: ''
          }
        }
      }
    },
    props:['prefessionList', 'userInfoAll'],
    data() {
      return {
        showEvent: false,
        gobackUrl: `goBack`,
        hasArrow: true
      }
    },
    computed: {
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
    watch: {
      prefessionList(val, oldVal) {
        if (val.length > 0) {
          val.map((item) => {
            if (item.proId === this.userInfoAll.prefession) {
              this.userInfoAll.prefessionName = item.proName;
            }
          });
        }
      },
      'userInfoAll.prefession': function (val, oldVal) {
        if (val) {
          if (this.prefessionList.length > 0) {
            this.prefessionList.map((item) => {
              if (item.proId === val) {
                this.userInfoAll.prefessionName = item.proName;
              }
            });
          }
        }
      }
    },
    created() {
      this.$emit('change-title', '个人资料');
    },
    methods: {
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
      chooseAge() {
        this.showEvent = true
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
      }
    }
  }
</script>
