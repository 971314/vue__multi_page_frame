<template>
  <a @click="clickBtn">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'toast-btn',
    props: {
      addr: {
        type: String,
        default: ''
      },
      trade: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickBtn() {
        var _this = this;
        if (_this.addr == '#') {
          _this.$toast({
            message: '该功能尚未开通!',
            position: 'center',
          });
        } else if (_this.trade == true) {
          let transaction = pbE.WT().wtGetConnectionAccountInfo();
          if (transaction && transaction.length != 0) {
            transaction = JSON.parse(transaction);
            for (let n = 0; n < transaction.length; n++) {
              if (transaction[n].PbKey_Trade_Login_Type == '8') {
                window.location.href = _this.addr;
              } else {
                window.location.href = 'pobo:uncheck=1&pageId=802005';
              }
            }
          }
          else
          {
              window.location.href = 'pobo:uncheck=1&pageId=802005';
          }
        } else {
          window.location.href = _this.addr;
        }
        _this.$emit('clicks');
      }
    }
  }
</script>
