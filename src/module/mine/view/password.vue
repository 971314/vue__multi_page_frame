<template>
  <div class="pwd-container">
    <div class="input-container">
      <div class="input">
        <input type="text" v-model="oldpwd" placeholder="请输入原密码">
        <img v-show="oldpwd" @click="clear('oldpwd')" src="../images/closeclick@2x.png">
      </div>
      <div class="input">
        <input type="text" v-model="newpwd" placeholder="请输入新密码">
        <img v-show="newpwd" @click="clear('newpwd')" src="../images/closeclick@2x.png">
      </div>
      <div class="input">
        <input type="text" v-model="againnewpwd" placeholder="请再次输入新密码">
        <img v-show="againnewpwd" @click="clear('againnewpwd')" src="../images/closeclick@2x.png">
      </div>
    </div>

    <div class="button-submit">
      <div class="button-submit-bg" @click="save">完成</div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        oldpwd: ``,
        newpwd: ``,
        againnewpwd: ``
      }
    },
    created() {
      this.$emit('change-title', '登录密码更改');
    },
    methods: {
      clear(str) {
        this[str] = '';
      },
      isRightPwd (val) {
        var pwdReg = !!val.match(/^(?!\D+$)(?!\d+$)[a-zA-Z0-9]{6,16}$/);
        return pwdReg;
      },
      save() {
        if (!this.oldpwd) {
          alert('请填写旧密码');
          return;
        }
        if (this.oldpwd && !this.isRightPwd(this.oldpwd)) {
          alert('密码是6-16位字母和数字的组合');
          return;
        }

        if (this.newpwd) {
          if (this.isRightPwd(this.newpwd)) {
            if (this.againnewpwd) {
              if (this.isRightPwd(this.againnewpwd)) {
                if (this.againnewpwd == this.newpwd) {
                  this.$router.back();
                  this.$loading.toggle('');
                  this.$axios.post(this.postUrl, {
                    "func": "112",
                    "data": [{
                      "loginName": this.userName,
                      "userId": this.testId,
                      "token": this.testToken,
                      "pwdOld": this.oldpwd,
                      "pwdNew": this.newpwd,
                      "ip": this.testIp,
                      "mac": this.testMac,
                      "os": this.os,
                      "version": this.testVersion
                    }]
                  })
                    .then((response) => {
                      this.$loading.hide();
                      console.log(response);
                      this.$router.back();
                    })
                    .catch((res) => {
                      this.$loading.hide();
                      console.log(res);
                      this.$toast('密码修改错误');
                    });

                } else {
                  this.$toast('两次填写密码不一致');
                }
              } else {
                this.$toast('密码是6-16位字母和数字的组合');
              }
            } else {
              this.$toast('请再次填写新密码');
            }
          } else {
            this.$toast('密码是6-16位字母和数字的组合');
          }
        } else {
          this.$toast('请填写新密码');
        }
      }
    }
  }
</script>
