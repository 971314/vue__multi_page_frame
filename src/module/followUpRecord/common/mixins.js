/**
 * Created by pobo on 2017/8/1.
 */
import browser from './browser'
import Vue from 'vue';
import axios from 'axios';

axios.defaults.headers['x-requested-with'] = "XMLHttpRequest"; //定义协议头

let hasClass = (obj, cls) => {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

let addClass = (obj, cls) => {
  if (!hasClass(obj, cls)) obj.className += ' ' + cls
}

let removeClass = (obj, cls) => {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    obj.className = obj.className.replace(reg, ' ')
  }
}

Vue.mixin({
  data() {
    return {

    }
  },
  mounted(){
    // 解决IOS的webview中position:fixed 在弹出键盘后失效问题。
    /*if (browser.versions.ios) {
      // 老版本的ios会报错，需要try catch
      try {
        let focus = e => {
          let fixeds = document.querySelectorAll('.needFixPositionFixed')
          fixeds && fixeds.forEach((item, index) => {
            addClass(item, 'fixPositionFixed')
          })
        }

        let blur = e => {
          let fixeds = document.querySelectorAll('.needFixPositionFixed')
          fixeds && fixeds.forEach((item, index) => {
            removeClass(item, 'fixPositionFixed')
          })
        }

        let targets = this.$el.querySelectorAll('input, textarea')
        targets && targets.forEach((item, index) => {
          item.removeEventListener('focus', focus)
          item.addEventListener('focus', focus, false)
          item.removeEventListener('blur', blur)
          item.addEventListener('blur', blur, false)
        })
      } catch (e) {
        console.error(e)
      }
    }*/
  },
  methods: {

    async $post(url, params) {
      this.$$loading();
      try {
        var response = await axios.post(url, params);
        this.$$loaded();
        return response;
      } catch (e) {
        this.$$loaded();
        if (e.message.split(' ')[0] == 'timeout') { //延时操作
          this.$toast("请求超时，请稍后再试");
        }else {
          this.$toast("请求服务器失败，请稍后再试");
        }
        throw new Error(e);
      }
    },

    async $get(url, params) {
      this.$$loading();
      try {
        var response = await axios.get(url, params);
        this.$$loaded();
        return response;
      } catch (e) {
        this.$$loaded();
        if (e.message.split(' ')[0] == 'timeout') { //延时操作
          this.$toast("请求超时，请稍后再试");
        }else {
          this.$toast("请求服务器失败，请稍后再试");
        }
        throw new Error(e);
      }
    },

    async $put(url, params) {
      this.$$loading();
      try {
        var response = await axios.put(url, params);
        this.$$loaded();
        return response;
      } catch (e) {
        this.$$loaded();
        if (e.message.split(' ')[0] == 'timeout') { //延时操作
          this.$toast("请求超时，请稍后再试");
        }else {
          this.$toast("请求服务器失败，请稍后再试");
        }
        throw new Error(e);
      }
    },

    $$loading() {
      //loading开始
      this.$loading.toggle('');
    },

    $$loaded() {
      //loading结束
      this.$loading.hide();
    },

    $$broadcast(componentName, eventName, params) { //广播式触发事件--从上往下触发(适用于vue中)
      this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
          child.$emit.apply(child, [eventName].concat(params));
        } else {
          broadcast.apply(child, [componentName, eventName].concat([params]));
        }
      });
    },

    $$dispatch(componentName, eventName, params) {  //发散式触发事件--从下往上触发(适用于vue中)
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }

  }
});
