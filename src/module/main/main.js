import 'lib-flexible';
import Vue from 'vue';
import Impression from 'vue-impression';
import Index from './Index.vue';
import pbUI from '../../components';
import Axios from 'axios';
import VueLazyload from "vue-lazyload";

//图片懒加载
Vue.use(VueLazyload, {
  //error: 'static/error.png',//这个是请求失败后显示的图片
  loading: '../images/activitydefault@2x.png',//这个是图片加载中的过渡效果
  attempt: 1 //尝试次数
})

Vue.prototype.$axios = Axios;
Vue.use(Impression);
Vue.use(pbUI);
// conf/h5/
Vue.mixin({
  data() {
    return {
      confUrl:'../conf/h5/',
      pbconfUrl:'main/conf/',
      pbconfH5:'conf/h5/'
      // confUrl:'../conf/h5/',
      // pbconfUrl:'conf/h5/'
    }
  }
});
const index = new Vue({
  el: '#app',
  render: h => h(Index)
});
