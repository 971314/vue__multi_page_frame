/**
 * Created by 二哲 on 15/12/6.

 * 不带参数指令
 * v-tap=handler
 * or
 * 带参数指令
 * v-tap=handler($index,el,$event)
 *
 * !!!新增!!!
 * 把tapObj对象注册在原生event对象上
 * event.tapObj拥有6个值
 * pageX,pageY,clientX,clientY,distanceX,distanceY
 * 后面2个分别的手指可能移动的位置(以后可用于拓展手势)
 *
 * */
let vueTap = {}

/**                               公用方法开始                 **/
function isPc () {
  let uaInfo = navigator.userAgent
  let agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let i = 0; i < agents.length; i++) {
    if (uaInfo.indexOf(agents[i]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

function isTap (self) {
  if (self.disabled) {
    return false
  }
  let tapObj = self.tapObj
  return self.time < 300 && Math.abs(tapObj.distanceX) < 10 && Math.abs(tapObj.distanceY) < 10
}

function touchstart (e, self) {
  let touches = e.touches[0]
  let tapObj = self.tapObj
  tapObj.pageX = touches.pageX
  tapObj.pageY = touches.pageY
  tapObj.clientX = touches.clientX
  tapObj.clientY = touches.clientY
  self.time = +new Date()
}

function touchend (e, self) {
  let touches = e.changedTouches[0]
  let tapObj = self.tapObj
  self.time = +new Date() - self.time
  tapObj.distanceX = tapObj.pageX - touches.pageX
  tapObj.distanceY = tapObj.pageY - touches.pageY

  if (!isTap(self)) return

  self.handler(e)
  e.preventDefault()
}

function genHandler (el, binding) {
  return function handler (e, isPc) {
    let value = binding.value
    // console.log('handler')

    if (!value && el.href && !binding.modifiers.prevent) {
      return (window.location = el.href)
    }

    if (!value) {
      // console.log('no value, return.')
      return
    }

    let tagName = e.target.tagName.toLocaleLowerCase()
    if (tagName === 'input' || tagName === 'textarea') {
      return e.target.focus()
    }

    if (value instanceof Function) {
      return binding.value.call(this, e)
    } else if (value instanceof Array && value.length) {
      let method = value.slice(0, 1)[0]

      value.push(e)
      !isPc ? value.push(el.tapObj) : null

      return method.apply(this, value.slice(1))
    } else if (value instanceof Object) {
      !isPc ? value.tapObj = el.tapObj : null
      let method = value.methods
      value.event = e
      return method.call(this, value)
    } else {
      console.log('case else error.')
    }
  }
}

/**                               公用方法结束                 * */

let vue2 = {
  bind: function (el, binding) {
    el.tapObj = {}
    el.handler = genHandler(el, binding)
    if (isPc()) {
      el.addEventListener('click', function (e) {
        if (binding.modifiers.stop) {
          e.stopPropagation()
        }
        if (binding.modifiers.prevent) {
          e.preventDefault()
        }
        el.handler(e, true)
      }, false)
    } else {
      el.addEventListener('touchstart', function (e) {
        // console.log('touchstart')
        if (binding.modifiers.stop) {
          e.stopPropagation()
        }
        if (binding.modifiers.prevent) {
          e.preventDefault()
        }
        touchstart(e, el)
      }, false)
      el.addEventListener('touchend', function (e) {
        // console.log('touchend')
        try {
          Object.defineProperty(e, 'currentTarget', {// 重写currentTarget对象 与jq相同
            value: el,
            writable: true,
            enumerable: true,
            configurable: true
          })
        } catch (e) {
          // ios 7下对 e.currentTarget 用defineProperty会报错。
          // 报“TypeError：Attempting to configurable attribute of unconfigurable property”错误
          // 在catch里重写
          console.error(e.message)
          e.currentTarget = el
        }

        // e.preventDefault()

        return touchend(e, el)
      }, false)
    }
  },
  componentUpdated: function (el, binding) {
    el.tapObj = {}
    el.handler = genHandler(el, binding)
  },
  unbind: function (el) {
    // 卸载，别说了都是泪
    el.handler = function () {
    }
  }
}

vueTap.install = function (Vue) {
  Vue.directive('tap', vue2)
}
vueTap.version = '3.0.2'

module.exports = vueTap
