<template>
  <div class="yield-syxfx">
    <div class="trade-description">
      <div class="trade-description-title" v-text="listContent[0][0].name">
      </div>
      <div class="trade-description-context" v-text="syxms">
      </div>
    </div>
    <div class="list-content zjxx-top20" v-if="index > 0" v-for="(listItem,index) in listContent">
      <div class="item-content" v-if="index > 0" v-for="item in listItem">
        <div class="item-content-title" v-text="item.name">总盈亏比</div>
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
      return {
        syxms: '这是一段交易适应性描述这是一段交易适应性描述这是一段交易适应性描述这是一段交易适应性描述'
      }
    },
    computed: {
      listContent() { //数据list
        return JSON.parse(JSON.stringify(this.inveAnaly[2]['list']));
      }
    },
    created() {
      this.$parent.tabIndex = 3;
    },
    mounted(){
    }
  }
</script>
