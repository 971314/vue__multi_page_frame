import browser from './browser'
import util from './util'
import { mapState } from 'vuex'

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

let toggleClass = (obj, cls) => {
  if (hasClass(obj, cls)) {
    removeClass(obj, cls)
  } else {
    addClass(obj, cls)
  }
}

export default {
  computed: {
    ...mapState([
      'personalInfo',
      'scoreResult',
      'basicInfo',
      'questions'
    ])
  },
  created () {
    this.$ispc = !browser.versions.mobile
  },
  mounted () {
    let this$ = this
    this.$router2 = {
      push: (a, b, c, d) => {
        setTimeout(() => {
          this$.$router.push.call(this$.$router, a, b, c, d)
        }, 0)
      },
      replace: (a, b, c, d) => {
        setTimeout(() => {
          this$.$router.replace.call(this$.$router, a, b, c, d)
        }, 0)
      }
    }

    // 解决IOS的webview中position:fixed 在弹出键盘后失效问题。
    if (browser.versions.ios) {
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

        if (this.$el && this.$el.querySelectorAll) {
          let targets = this.$el.querySelectorAll('input, textarea')
          targets && targets.forEach((item, index) => {
            item.removeEventListener('focus', focus)
            item.addEventListener('focus', focus, false)
            item.removeEventListener('blur', blur)
            item.addEventListener('blur', blur, false)
          })
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  methods: {
    $getApiUrl (key) {
      return util.getApiUrl(this.$store.state, key)
    },
    $getProp (key) {
      return util.getProp(this.$store.state, key)
    },
    $isCnName (str) { // 是否为中文名字
      return /^[\u4E00-\u9FFF]+$/g.test(str)
    },
    $isEnName (str) {  // 是否为英文名字
      return /^[a-zA-Z]+[a-zA-Z ]+[a-zA-Z]+$/g.test(str)
    },
    $isTel (str) { // 是否为固定电话
      return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str)
    },
    $isFax (str) { // 是否是传真
      return /^(\d{11})$/.test(str)
    },
    $isPostCode (str) { // 是否是邮编
      return /^[0-9]{6}$/.test(str)
    },
    $isMobile (str) { // 是否是手机号码
      return /^1\d{10}$/.test(str)
    },
    $isEmail (str) { // 是否是邮箱
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/.test(str)
    }
  }
}
