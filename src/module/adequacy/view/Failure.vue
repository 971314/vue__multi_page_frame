<template>
  <div class="success">
    <common-nav class="header" :search="false" :message="false" :service="false" :goback="false" :gobackcom="false" :goClose="true">
      <div slot="body">
        适当性评估
      </div>
    </common-nav>
    <div class="header-bung"></div>
    <div class="text-center icon-success-warp">
      <img class="icon-success" src="../images/icon-failure.png"/>
    </div>
    <div class="content text-center">
      <div v-for="(item, index) in cfAdequacyJson.view.failure.text" :key="index" v-text="item"></div>
    </div>

    <div class="relative infoS">
      <div class="btn-group">
        <button class="btn next" @click="close">退出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState([
        'cfAdequacyJson'
      ])
    },
    beforeRouteLeave(to, from, next) {
      // 禁止返回
      return next(false)
    },
    methods: {
      close() {
        window.location.href = 'close'
      },
      goNewAccount() {
        window.location.href = 'pobo:uncheck=1&pageId=800006'

        // 延迟关闭当前页
        setTimeout(() => {
          window.location.href = 'close'
        }, 3000)
      }
    }
  }
</script>
