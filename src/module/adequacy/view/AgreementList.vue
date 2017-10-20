<template>
  <div class="agreementList qrt">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :goClose="true">
      <div slot="body">
        已签署的协议
      </div>
    </common-nav>
    <div class="header-bung"></div>

    <div class="item-title">您已签署以下协议</div>
    <section class="pl15 bd-top bd-bottom bg-white">
      <div class="item" v-for="(item, index) in agreementsJson" :key="item.agreementType">
        <div class="pr15">
          <div class="arrow" @click="goAgreement(item)" v-text="`《${item.title}》`"></div>
        </div>
      </div>
    </section>


    <div class="relative infoS">
      <div class="btn-group">
        <button class="btn next" @click="goVideoCheck">视频认证</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        agreement: {}
      }
    },
    computed: {
      ...mapState([
        'cfAdequacyJson',
        'agreementsJson'
      ])
    },
    beforeRouteLeave(to, from, next) {
      // 禁止返回到 /qrt 页面
      if (to.path !== '/qrt') {
        return next()
      }
      return next(false)
    },
    methods: {
      goAgreement(agreement) {
        window.open(`pobo:pageId=900004&scale=1&title=${agreement.title}&url=${this.$getApiUrl('viewAgreementByPng')}?id=${this.personalInfo.ID_NO}&agreementType=${agreement.agreementType}`)
      },
      goVideoCheck() {
        this.$router2.push('/videoCheck')
      }
    }
  }
</script>
