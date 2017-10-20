<template>
  <div>
    <common-nav :search="false" :message="false" :service="false" :goback="false">
      <div slot="body">
        条件单
      </div>
    </common-nav>
    <div class="divFixed">
      <div v-if="alertedConf">
        <router-link to="/mobileList/1" replace>
          <div id="conNoneTouch" class="conditionDiv" :class=" this.$route.params.id == 1 ? 'bordercolor' : '' ">
            手机端列表
          </div>
        </router-link>
        <router-link to="/pcList/2" replace>
          <div class="conditionDiv" :class=" this.$route.params.id == 2 ? 'bordercolor' : '' ">
            PC端列表
          </div>
        </router-link>
        <router-link to="/setCon/3" replace v-if="initCondition">
          <div class="conditionDiv" :class=" this.$route.params.id == 3 ? 'bordercolor' : '' ">
            条件单设置
          </div>
        </router-link>
        <router-link to="/editCon/4" replace v-else>
          <div class="conditionDiv" :class=" this.$route.params.id == 4 ? 'bordercolor' : '' ">
            条件单设置
          </div>
        </router-link>
      </div>

      <div v-else>
        <router-link to="/mobileList/1" replace>
          <div class="nonePc" :class=" this.$route.params.id == 1 ? 'bordercolor' : '' ">
            列表
          </div>
        </router-link>
        <router-link to="/setCon/3" replace v-if="initCondition">
          <div class="nonePc" :class=" this.$route.params.id == 3 ? 'bordercolor' : '' ">
            条件单设置
          </div>
        </router-link>
        <router-link to="/editCon/4" replace v-else>
          <div class="nonePc" :class=" this.$route.params.id == 4 ? 'bordercolor' : '' ">
            条件单设置
          </div>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view name="a"></router-view>
    </keep-alive>
    <router-view name="b"></router-view>
  </div>
</template>
<script>

  export default {
    data: function () {
      return {
        initCondition: true, //条件单设置
        alertedConf:null//是否显示pc
      }
    },
    created() {
      let _this = this;
      if (this.$route.params.id == 4 || this.$route.params.id == '4') {
        this.initCondition = false;
      } else {
        this.initCondition = true;
      }
      if (pbE.isPoboApp) {
        _this.alertedConf = JSON.parse(pbE.SYS().readConfig("conf/h5/condition.json")).isShowPc;
      } else {
        this.$axios.get('../conf/h5/condition.json').then(function (data) {
          console.log(data.data);
          _this.alertedConf = data.data.isShowPc;
        })
      }
    },
    beforeUpdate() {
      if (this.$route.params.id == 4 || this.$route.params.id == '4') {
        this.initCondition = false;
      } else {
        this.initCondition = true;
      }
    }
  }
</script>
