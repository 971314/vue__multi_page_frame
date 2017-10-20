<template>
  <div class="success">
    <common-nav class="header" :search="false" :message="false" :service="false" :goback="false" :gobackcom="false" :goClose="true">
      <div slot="body">
        适当性结果
      </div>
    </common-nav>
    <div class="header-bung"></div>
    <div class="text-center icon-success-warp">
      <img class="icon-success" src="../images/icon-failure.png"/>
    </div>

    <div class="content text-center">
      <div>很遗憾！您无法通过在线完成适当性</div>
      <div>请亲自前往营业部柜台办理</div>
    </div>

    <div class="relative infoS">
      <div class="btn-group">
        <button class="btn next" @click="close">退出</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    beforeRouteLeave (to, from, next) {
      // 禁止返回
      return next(false)
    },
    methods: {
      close () {
        window.location.href = 'close'
      }
    }
  }
</script>
