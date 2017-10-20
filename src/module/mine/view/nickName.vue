<template>
  <div class="nick-name-container">
    <div class="input">
      <input type="text" v-model="nickname" placeholder="请输入昵称" maxlength="10">
      <img v-show="nickname" @click="clear" src="../images/closeclick@2x.png">
    </div>
  </div>

</template>

<script>
  export default {
    props: ['userInfoAll'],
    data() {
      return {
        nickname: this.userInfoAll.petName,
      }
    },
    created() {
      this.$emit('change-title', '姓名');
    },
    methods: {
      clear() {
        this.nickname = '';
      }
    },
    watch: {
      nickname(val, oldVal) {
        if (val && val != this.userInfoAll.petName) {
          this.userInfoAll.petName = val;
        }
      }
    }
  }
</script>
