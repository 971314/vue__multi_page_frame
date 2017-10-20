<template>
  <div id="alert_btn" v-show="currentValue">
    <div>
      <slot></slot>
      <div>
        <span>取消</span>
        <span>确认</span>
      </div>
    </div>
    <mask-layer :clickable="true"/>
  </div>
</template>
<script>
  export default {
    name: 'alert-modal',
    data() {
      return {
        currentValue: this.value
      }
    },
    props: {
      value: {},
      alertModal: {
        type: Boolean,
        default: true,
      },
      maskClosable: {
        type: Boolean,
        default: false,
      },
      dealnames: {
        type: Array
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        if(this.disabled){
          val ? this.$emit('show') : this.$emit('close');
        }else if (this.isArray(val) && val.length === 0){
          this.currentValue = undefined;
          val ? this.$emit('show') : this.$emit('close');
        }else {
          this.$emit('input', val);
          this.$emit('change', val, this.currentText);
          val ? this.$emit('show') : this.$emit('close');
        }
      }
    },
    methods: {
      isArray(array) {
        return Object.prototype.toString.call(array) === '[object Array]';
      }
    }
  }
</script>
