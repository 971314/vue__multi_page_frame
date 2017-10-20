<template>
  <div class="email-container">
    <div class="input">
      <input type="text" v-model="email" placeholder="请输入邮箱">
      <img v-show="email" @click="clear" src="../images/closeclick@2x.png">
    </div>
  </div>

</template>

<script>
  export default {
    props: ['userInfoAll'],
    data() {
      return {
        email: this.userInfoAll.email
      }
    },
    created() {
      this.$emit('change-title', '邮箱');
    },
    methods: {
      clear() {
          this.email = '';
      }
    },
    watch: {
      email(val, oldVal) {
        if (val && val != this.userInfoAll.email) {
          if (val.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.userInfoAll.email = val;
          }else {
            this.$toast('请输入正确的邮箱地址!');
            return ;
          }
        }
      }
    }
  }
</script>
