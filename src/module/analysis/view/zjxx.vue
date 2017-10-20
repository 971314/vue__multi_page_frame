<template>
  <div>
    <div class="list-content zjxx-top20" v-for="listItem in listContent">
      <div class="item-content" v-for="item in listItem">
        <div class="item-content-title" v-text="item.name"></div>
        <div class="item-content-num" v-text="item.value"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      inveAnaly: {
        type: Array,
        default: []
      }
    },
    data(){
      return {}
    },
    computed: {
      listContent() { //数据list
        return JSON.parse(JSON.stringify(this.inveAnaly[0]['list']));
      }
    },
    created() {
      this.$parent.tabIndex = 1;
    },
    mounted(){
    }
  }
</script>
