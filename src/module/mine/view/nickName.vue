<template>
  <div class="nick-name-container">
    <div class="input">
      <input type="text" v-model="nickname" placeholder="请输入昵称" maxlength="20">
      <img v-show="nickname" @click="clear" src="../images/closeclick@2x.png">
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        nickname: '',
      }
    },
    computed: {
      ...mapState([
        'userInfoAll'
      ])
    },
    activated() {
      this.$emit('change-title', '姓名');
      this.$emit('change-goback-url', 'goBack');
      this.nickname = this.userInfoAll.petName
    },
    methods: {
      clear() {
        this.nickname = '';
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.nickname) {
        this.userInfoAll.petName = this.nickname;
        this.$store.dispatch('updateUserInfoAll', this.userInfoAll);
        this.$store.dispatch('updateIsFisrt', true)
      }
      next();
    }
  }
</script>
