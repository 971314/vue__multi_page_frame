<template>
  <div class="notice">
    <div class="noticeTab">
      <div style="height: 44px;overflow-x: auto;white-space: nowrap;" v-if="types && types.length !=0">
        <router-link v-for="item in types" :to="{name: 'noticeView', params: {type: item.infoTypeId}}"
                     :class="{'width5':types.length > 4,'width4':types.length <= 4, ' background': activeIndex == item.infoTypeId}"
                     replace>
          {{item.infoTypeName}}
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view @change-active-index="changeActiveIndex"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        activeIndex: '',
        divWidth: null,
        aWidth: null,
        types: []
      }
    },
    created() {
      console.log('1');
      this.setBodyBackground();
      this.request();
    },
    activated() {
      setTimeout(() => {
        if (!this.activeIndex && this.types.length != 0) {
          this.$router.replace({name: 'noticeView', params: {type: this.types[0].infoTypeId}});
          this.activeIndex = this.types[0].infoTypeId;
        } else {
          this.$router.replace({name: 'noticeView', params: {type: this.activeIndex}});
        }
      }, 500);
    },
    watch: {
      $route(to, from) {
        if (to.fullPath == '/firm/2') {
          if (this.activeIndex) {
            this.$router.replace({name: 'noticeView', params: {type: this.activeIndex}});
          } else {
            this.$router.replace({name: 'noticeView', params: {type: this.types[0].infoTypeId}});
            this.activeIndex = this.types[0].infoTypeId;
          }
        }
      }
    },
    methods: {
      changeActiveIndex(index) {
        this.activeIndex = index;
      },
      request() {
        let _this = this;
//        _this.$loading.toggle(' ');
        _this.$axios.post(PBHttpServer.indNews.serverUrl, {
          func: "10107",
          data: [{}]
        }, {timeout: 10000}).then((data) => {
//          _this.$loading.hide();
          data = data.data;
          console.log(data);
          if (data.retHead == 0) {
            _this.types = data.data;
          } else {
            _this.showToast(data.desc);
          }
        }).catch(function (error) {
//          _this.$loading.hide();
          _this.showToast('网络超时，请稍后再试');
          console.error(error);
        });
      }
    }
  }
</script>
