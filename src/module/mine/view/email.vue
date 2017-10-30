<template>
  <div class="email-container">
    <div class="input">
      <input type="text" v-model="email" placeholder="请输入邮箱">
      <img v-show="email" @click="clear" src="../images/closeclick@2x.png">
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        email: ''
      }
    },
    computed: {
      ...mapState([
        'userInfoAll'
      ])
    },
    activated() {
      this.$emit('change-title', '邮箱');
      this.$emit('change-goback-url', 'goBack');
      this.email = this.userInfoAll.email
    },
    methods: {
      clear() {
          this.email = '';
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.email) {
          if (this.email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.userInfoAll.email = this.email;
            this.$store.dispatch('updateUserInfoAll', this.userInfoAll);
            this.$store.dispatch('updateIsFisrt', true)
          }else {
            this.$toast('请输入正确的邮箱地址!');
            return ;
          }
      }
      next();
    }
  }
</script>
