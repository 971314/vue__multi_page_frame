<template>
  <div class="avatar-selected">
    <div class="avatar-container">
      <img class="avatar-img" v-if="userInfoAll.avatar" :src="userInfoAll.avatar">
      <img v-else class="avatar-img" src="../images/useravatar@2x.png"/>
    </div>
    <div class="selected-group">
      <div class="selected-item">
        从相册选择一张
        <input type="file" accept="image/png,image/jpeg,image/jpg" @change="readImage">
      </div>
      <div class="selected-item">
        拍一张照片
        <input type="file" accept="image/png,image/jpeg,image/jpg" capture="camera" @change="readImage">
      </div>
    </div>
    <div class="cropper-page" v-show="isShow" id="cropperPage">
      <img src="" class="cropper-img" :style="imageStyle" id="cropperImg">
      <div class="cover" :style="{height: coverHeight + 'px'}"></div>
      <div class="cropper-box" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove"
           @touchend.prevent="touchEnd" id="cropBox"></div>
      <div class="cover" :style="{height: coverHeight + 'px'}">
        <span @click="isShow = false">取消</span>
        <span @click="confirm">选取</span>
      </div>
    </div>
  </div>

</template>

<script>
  import EXIF from "exif-js";
  import MegaPixImage from "../utils/megapix-image.js";
  import {mapState} from 'vuex'
  const getDinstance = function (point0, point1) {
    return Math.sqrt(Math.pow(point0.pageY - point1.pageY, 2) + Math.pow(point0.pageX - point1.pageX, 2))
  }
  export default {
    data() {
      return {
//        avatar: '',
        EXIF: EXIF,
        file: null,
        coverHeight: 0,
        cropperHeight: 0,
        imgInitTop: 0,
        amplitude: 0,
        imageState: {
          left: 0,
          top: 0,
          scale: 1,
          width: 0,
          height: 0,
          originX: 0,
          originY: 0
        },
        distance: 0,
        imageStyle: {
          top: '0',
          transform: 'translate3d(0px, 0px, 0px) scale(1)',
          transformOrigin: 'left top'
        },
        cropBoxRect: {},
        touchPos: {
          x: 0,
          y: 0
        },
        isShow: false,
        minScale: 0,
        info: '',
        testId: null,
        testToken: null
      }
    },
    events: {
      showCropper() {
        this.$els.file.click()
      }
    },
    computed: {
      ...mapState([
        'userInfoAll'
      ])
    },
    watch: {
      'imageState': {
        handler(val, oldVal) {
          // this.imageStyle.transformOrigin = val.originX + '% ' + val.originY + '%'
          this.imageStyle.transform = 'translate3d(-' + val.left + 'px, -' + val.top + 'px, 0px) scale(' + val.scale + ')'
        },
        deep: true
      }
    },
    activated() {
      this.testToken = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '11111111111kkkkkkskskslslslsls';//token
      this.testId = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '8';//认证userId/id
      this.$emit('change-title', '个人头像');
      this.$emit('change-goback-url', 'goBack');
    },
    methods: {
      readImage(event) {
        this.$loading.toggle(' ');
        var self = this;
        var file = this.file = event.target.files[0]
        if (!file) {
          return false;
        }
        self.EXIF.getData(file, function () {
          // alert(EXIF.pretty(this));
          self.EXIF.getAllTags(this);
          //alert(EXIF.getTag(this, 'Orientation'));
          self.orientation = self.EXIF.getTag(this, 'Orientation');
          //return;
        });

        var reader = new window.FileReader()
        reader.onload = () => {
          // 通过 reader.result 来访问生成的 DataURL
          var img = document.getElementById("cropperImg");
          img.src = reader.result;
          //图片加载之后调用initCropper
          img.onload = () => {
            self.initCropper();
          }
        }
        reader.readAsDataURL(file)
      },
      initCropper() {
        this.$loading.hide();
        this.isShow = true // 显示裁剪界面
        // 回调会在dom更新后调用，如果不使用$nextTick，无法获取元素正确的高度
        this.$nextTick(() => {
          let cropperPage = document.getElementById("cropperPage");
          let pageWidth = cropperPage.clientWidth
          let pageHeight = cropperPage.clientHeight
          let headerHeight = 0;
          this.coverHeight = (pageHeight - headerHeight - pageWidth) / 2
          let cropBoxTop = this.coverHeight + headerHeight
          this.imageState.left = 0
          this.imageState.top = 0
          this.imageStyle.top = cropBoxTop + 'px'
          document.getElementById("cropBox").style.height = pageWidth + 'px'
          // var cropBoxRect = this.$els.cropBox.getBoundingClientRect() // 获取的元素没有预期的参数
          this.cropBoxRect = {
            left: 0,
            top: cropBoxTop,
            width: pageWidth,
            height: pageWidth
          }


          let img = document.getElementById("cropperImg")
          var width = this.imageState.width = img.width
          var height = this.imageState.height = img.height
          // 计算imageState
          if (width > height) {
            this.minScale = this.imageState.scale = this.cropBoxRect.height / height;
            this.imageState.left = (width * this.imageState.scale - this.cropBoxRect.width) / 2;
          } else {
            this.minScale = this.imageState.scale = this.cropBoxRect.width / width;
            this.imageState.top = (height * this.imageState.scale - this.cropBoxRect.height) / 2;
          }
        })
      },
      confirm() {
        let imageState = this.imageState
        let cropBoxRect = this.cropBoxRect
        let scale = imageState.scale
        let image = document.getElementById("cropperImg")
        let height = cropBoxRect.height
        let width = cropBoxRect.width
        let canvas = document.createElement('canvas')
        canvas.width = cropBoxRect.width
        canvas.height = cropBoxRect.height
        let ctx = canvas.getContext('2d')
        // 添加白色背景
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //画图
        new Promise((res) => {
          if (navigator.userAgent.match(/iphone/i) && this.orientation && this.orientation != 1) {
            let mpImg = new MegaPixImage(this.file);
            mpImg.render(canvas, {
              quality: 1,
              orientation: this.orientation
            }, () => {
              image = new Image();
//              this.$loading.toggle('');
              image.src = canvas.toDataURL('image/jpeg');
//              this.$loading.hide();
              canvas = document.createElement('canvas')
              canvas.width = cropBoxRect.height * 2;
              canvas.height = cropBoxRect.height;
              ctx = canvas.getContext('2d')
              // 添加白色背景
              ctx.fillStyle = "#fff";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              image.onload = () => {
                res();
              }
            });
          } else {
            res();
          }
        }).then(() => {
          ctx.drawImage(image, imageState.left / scale, imageState.top / scale, width / scale, height / scale, 0, 0, width, height);
          let data = canvas.toDataURL('image/jpeg', 1);
          if (data.length > 150 * 1024) {
            data = canvas.toDataURL('image/jpeg', 150 * 1024 / data.length);
          }
          //提交头像
          this.userInfoAll.avatar = data;
          this.$store.dispatch('updateUserInfoAll', this.userInfoAll);
          this.$store.dispatch('updateIsFisrt', false);

          this.saveImage();
          this.isShow = false;
        });
      },
      getFocalPoint(point0, point1) {
        return {
          x: (point0.pageX + point1.pageX) / 2,
          y: (point0.pageY + point1.pageY) / 2
        }
      },
      touchStart(event) {
        var fingerCount = event.touches.length
        if (fingerCount) {
          // 记录触摸初始位置
          let touchEvent = event.touches[0]
          this.touchPos = {
            x: touchEvent.pageX,
            y: touchEvent.pageY
          }
        }
        if (fingerCount >= 2) {
          // 获取两点距离、中点位置；两点距离old/new=放大倍数；中点位置，缩放中心；
          let point0 = event.touches[0]
          let point1 = event.touches[1]
          this.distance = getDinstance(point0, point1)
          this.touchPos = this.getFocalPoint(point0, point1)
          // 设置缩放倍数，
        }
      },
      touchMove(event) {
        // 根据触摸点位移，移动图片，重置触摸点位置
        var fingerCount = event.touches.length
        var touchEvent = event.touches[0]
        if (fingerCount === 1) {
          let distX = touchEvent.pageX - this.touchPos.x
          let distY = touchEvent.pageY - this.touchPos.y
          let newX = this.imageState.left - distX
          let newY = this.imageState.top - distY
          let scale = this.imageState.scale
          let maxX = this.imageState.width * scale - this.cropBoxRect.width
          let maxY = this.imageState.height * scale - this.cropBoxRect.height
          this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
          this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
          this.touchPos.x = touchEvent.pageX
          this.touchPos.y = touchEvent.pageY
        } else if (fingerCount > 1) {
          let point0 = event.touches[0]
          let point1 = event.touches[1]
          let distance = getDinstance(point0, point1)
          let zoom = distance / this.distance
          let scale = zoom * this.imageState.scale
          let maxX = this.imageState.width * scale - this.cropBoxRect.width
          let maxY = this.imageState.height * scale - this.cropBoxRect.height
          let touchPos = this.getFocalPoint(point0, point1)
          let newX = zoom * (this.imageState.left + touchPos.x) - touchPos.x
          let newY = zoom * ((this.imageState.top - this.imgInitTop) + touchPos.y) - touchPos.y + this.imgInitTop
          // 限制缩放
          // 图片新位置:由中点位置确认;(新位置到中点)/(旧位置到中点)=(new scale)/(old scale)
          // newLeft - touchPos.x = (distance / this.distance) * (oldLetf - touchPos.x)
          // oldLeft = 0 - this.imageState.left
          // oldTop = imgInitTop - this.imageState.top
          this.distance = distance
          if (scale < this.minScale) {
            this.imageState.scale = this.minScale
          } else {
            this.imageState.scale = scale
            this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
            this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
          }
          this.touchPos = touchPos
        }
      },
      saveImage() {
        this.$axios.post(this.postUrl, {
          "func": "110",
          "data": [{
            "userId": this.testId,
            "token": this.testToken,
            "image": this.userInfoAll.avatar
          }]
        })
          .then((response) => {
            console.log(response);
            if (response && response.data.retHead) {
              if (response.data.retHead === '0') {
                this.$toast("修改成功!");
              } else {
                this.$toast(response.data.desc);
              }
            }

          })
          .catch((res) => {
            console.log(res);
          })
      },
      touchEnd(event) {
        console.log('end===')
      }
    }
  }
</script>
