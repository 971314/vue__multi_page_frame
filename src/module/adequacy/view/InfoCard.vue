<template>
  <div class="infoCard info">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :goClose="showClose" :gobackcom="true">
      <div slot="body">
        <span>基本资料</span>
      </div>
    </common-nav>
    <div class="header-bung"></div>
    <div class="pl15 pr15">
      <div class="title">请上传身份证照片</div>

      <div class="card-font" :class="cardFront">
        <img src="../images/icon-card-front.png" class="img" id="fileFront"/>
        <input type="file" accept="image/png,image/jpeg,image/jpg" @change="readImageFront">
        <div class="label">上传身份证正面</div>
      </div>
      <div class="card-reverse" :class="cardReverse">
        <img src="../images/icon-card-reverse.png" class="img" id="fileReverse"/>
        <input type="file" accept="image/png,image/jpeg,image/jpg" @change="readImageReverse">
        <div class="label">上传身份证反面</div>
      </div>
    </div>
    <div class="relative infoS">
      <div class="btn-group">
        <button class="btn next" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        isLongValid: false,
        gobackUrl: 'goBack',
        showClose: false,
        cardFront: 'no-file',
        cardReverse: 'no-file'
      }
    },
    computed: {
      ...mapState([
        'basicInfo',
        'token',
        'personalInfo'
      ])
    },
    methods: {
      readImageFront (event) {
        this.$loading.toggle('')
        let this$ = this
        this$.readImage(event, 'fileFront', () => {
          this$.cardFront = 'has-file'
          setTimeout(() => {
            this$.$loading.hide()
          }, 0)
        })
      },
      readImageReverse (event) {
        this.$loading.toggle('')
        let this$ = this
        this$.readImage(event, 'fileReverse', () => {
          this$.cardReverse = 'has-file'
          setTimeout(() => {
            this$.$loading.hide()
          }, 0)
        })
      },
      readImage (event, id, callback) {
        let file = this.file = event.target.files[0]

        if (!file) {
          callback(null)
          return false
        }

        let reader = new window.FileReader()
        reader.onload = () => {
          let data = reader.result

          // 粗略的压缩图片。
          let quality = 0.7
          this.dealImage(data, {quality: quality}, (base64) => {
            let img = document.getElementById(id)
            img.src = base64
            //图片加载之后调用initCropper
            img.onload = callback || (() => {})
          })

          reader = null
        }
        reader.readAsDataURL(file)
      },
      dealImage (path, obj, callback) {
        /**
         * 图片压缩，默认同比例压缩
         * @param {Object} path
         *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
         * @param {Object} obj
         *   obj 对象 有 width， height， quality(0-1)
         * @param {Object} callback
         *   回调函数有一个参数，base64的字符串数据
         */
        let img = new Image()
        img.src = path
        img.onload = function () {
          let that = this
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h
          w = obj.width || w
          h = obj.height || (w / scale)

          // 宽高不操过1500
          if (w > 1500) {
            w = 1500
            h = w / scale
          }

          if (h > 1500) {
            h = 1500
            w = h * scale
          }

          //生成canvas
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          // 创建属性节点
          let anw = document.createAttribute('width')
          anw.nodeValue = w
          let anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          ctx.drawImage(that, 0, 0, w, h)
          img = null

          // 图像质量
          let quality = 1  // 默认图片质量为1
          // canvas转换本身就会压缩图片
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality
          }

          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL('image/jpeg', quality)
          canvas = null

          // 回调函数返回base64的值
          callback(base64)
        }
      },
      submit () {
        try {
          if (this.checkMessage()) {
            // 如果有不良诚信记录，直接进入临柜结果页面
            if (this.basicInfo.NO_CREDIT_TYP !== '0') {
              this.$router2.push('/neighbourCounter')
              return
            }
            // 如果有为非居，直接进入临柜结果页面
            if (this.basicInfo.ONLY_FOR_CHINESE_TAX_RESIDENTS !== 'Y') {
              this.$router2.push('/neighbourCounter')
              return
            }

            this.$loading.toggle('')
            let data = this.basicInfo

            if (data.IDVALID_ST_DT instanceof Date) {
              data.IDVALID_ST_DT = moment(data.IDVALID_ST_DT).format('YYYY-MM-DD')
            }
            if (data.IDVALID_END_DT instanceof Date) {
              data.IDVALID_END_DT = moment(data.IDVALID_END_DT).format('YYYY-MM-DD')
            }

            data.IDVALID_ST_DT.length > 10 ? (data.IDVALID_ST_DT = data.IDVALID_ST_DT.substr(0, 10)) : null
            data.IDVALID_END_DT.length > 10 ? (data.IDVALID_END_DT = data.IDVALID_END_DT.substr(0, 10)) : null

            this.personalInfo.PHONENUM = this.personalInfo.PHONENUM.trim()

            for (let k in data) {
              if (typeof data[k] === 'string') {
                data[k] = data[k].trim()
              }
            }

            let src = document.querySelector('#fileFront').getAttribute('src')
            data.FILE_DATA1 = src.replace('data:image/jpeg;base64,', 'image/jpg;base64,')
            src = document.querySelector('#fileReverse').getAttribute('src')
            data.FILE_DATA2 = src.replace('data:image/jpeg;base64,', 'image/jpg;base64,')

            let param = {
              method: 'post',
              url: this.$getApiUrl('submitAppropriatenessProfile'),
              data: {
                'func': 2020,
                'type': 2,
                'account': this.personalInfo.PHONENUM,
                'token': this.token,
                'data': [{
                  'service': 'adequacy.106',
                  'json': JSON.stringify(data)
                }]
              }
            }

            this.$axios(param).then((resp) => {
              let rsltdata = JSON.parse(resp.data.data[0].proxyresult)
              if (rsltdata.head.code !== '0') {
                this.showAlert(rsltdata.head.message) // 系统消息
                return
              }
              if (rsltdata.body.result.result && rsltdata.body.result.result === '0') {
                this.$router2.push('/qnr/1')
              } else if (rsltdata.body.result.result && rsltdata.body.result.result === '1') {
              }
            }).catch((err) => {
            })
          }
        }
        finally {
          this.$loading.hide()
        }
      },
      checkMessage () {
        // 跳转前先保存填写的信息
        let msg = ''
        if (this.cardFront !== 'has-file') {
          msg += '<p>身份证正面照片</p>'
        }
        if (this.cardReverse !== 'has-file') {
          msg += '<p>身份证反面照片</p>'
        }

        if (msg) {
          this.showAlert('<p>请上传：</p>' + msg)
          return false
        }

        return true
      },
      showAlert (msg) {
        this.$alert({
          maskClosable: true,
          btns: [{
            text: '确定',
            click: () => {
              return false
            }
          }],
          title: '<h4>提示</h4>',
          message: '<p>' + msg + '</p>'
        })
      }
    }
  }
</script>
