<template>
  <div>
    <!--<nav-bar :id.sync="this.$route.params.id" :goBackImg.sync="goBackImg" :title.sync="title"></nav-bar>-->
    <common-nav :search="false" :message="false" :service="false" :goback="false">
      <div slot="body">
        止损止盈
      </div>
    </common-nav>
    <div class="divFixed">
      <div v-if="alertedConf">
        <router-link to="/mobileList/1" replace>
          <div class="conditionDiv" :class=" this.$route.params.id == 1 ? 'bordercolor' : '' ">
            手机端列表
          </div>
        </router-link>
        <router-link to="/pcList/2" replace>
          <div class="conditionDiv" :class=" this.$route.params.id == 2 ? 'bordercolor' : '' ">
            PC端列表
          </div>
        </router-link>
      </div>
      <div v-else>
        <router-link to="/mobileList/1" replace>
          <div class="nonePc" :class=" this.$route.params.id == 1 ? 'bordercolor' : '' ">
            列表
          </div>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>

  export default {
    data: function () {
      return {
        refreshImg: '../images/refresh.png',
        title: '止损止盈',
        alertedConf:null
      }
    },
    created(){
      let _this = this;
      if (pbE.isPoboApp) {
        _this.alertedConf = JSON.parse(pbE.SYS().readConfig("conf/h5/condition.json")).isShowPc;
      } else {
        this.$axios.get('../conf/h5/condition.json').then(function (data) {
          console.log(data.data);
          _this.alertedConf = data.data.isShowPc;
        })
      }
    },
    methods: {
      refresh: function () {
        window.location.reload();
      }
    }
  }
</script>
