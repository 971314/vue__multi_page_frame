<template>
    <div class="common-main-header">
        <div class="common-header-left" v-text="leftTitle"></div>
        <div class="common-header-right" v-if="toWhere" @click="goToMore">更多</div>
    </div>
</template>

<script>
    export default{
        props: {
            leftTitle: {
                type: String,
                default: `活动推广`
            },
            toWhere: {
                type: String,
                default: `pobo:uncheck=1&pageId=900005&url=activity/index.html#/`
            }
        },
      methods: {
        goToMore() {
          window.location.href = this.toWhere;
        }
      }
    }
</script>
