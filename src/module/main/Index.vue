<template>
  <div>
   <!-- <div class="bg" :style="{height:barHeight + 44+ 'px', backgroundColor: color}">
      <div :style="{height: barHeight + 'px'}"></div>

      <div class="name">{{appName}}</div>

    </div>-->
    <div class="index">
      <div class="index-header-navbar">
        <navbarspec></navbarspec>
      </div>
      <div  class="index-content-wrapper" :style="{marginTop:getMarginTop()}" id="index-content-wrapper">
        <div v-for="com in rootCop">
          <component :is="com.name" :co-instance="com.coInstance"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import commitfuc from './components/coCommitFuc.vue';
  //import MainFunc from './components/coMainFunc.vue';
  import notice from './components/coNoticeAdv.vue';
  //import NewsListSpe from './components/coNewsListSpe.vue';
  import advert from './components/coAdvert.vue';
  import navbarspec from './components/coNavBarSpe.vue';
  import infobox from './components/coInfoBox.vue'
  import infolist from './components/coInfoList.vue'
  import MainActive from './components/mainActive.vue'
  import infolist2 from './components/coInfoList2.vue'
  export default {
    name: 'Index',
    data () {
      return {
        rootCop: [],//组件数组
        barHeight:this.getBarHeight(),
        appName:"",
        color:""
      }
    },
    components: {
      commitfuc,
      notice,
      advert,
      navbarspec,
      infobox,
      infolist,
      MainActive,
      infolist2
    },
    methods: {
      getBarHeight()
      {

        let bar = 20;
        if(this.isAndroid())
          bar = 22;
        if (pbE.isPoboApp && pbE.SYS().getStatusBarHeight)
          bar = pbE.SYS().getStatusBarHeight();

        return bar;
      },
      getMarginTop()
      {
        if (pbE.isPoboApp) {
          let bar = 0, base = 44;
          if (this.isAndroid())
            bar = 22;
          else
            bar =20;

          if (pbE.SYS().getStatusBarHeight)
            bar = pbE.SYS().getStatusBarHeight();

          bar = bar + base;
          return "-" + bar + 'px';
        }
        else
          return '-64px';
      },
      isAndroid () {
        if (pbE.isPoboApp) {
          var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo());
          if (DeviceJsonInfo['255']) {  //平台
            var platNum = DeviceJsonInfo['255'];
            if (platNum == '3') {
              return true;
            }
          }
        }
        return false;
      },
      getMainSet() {//获取配置文件的组件信息
        if (pbE.isPoboApp) {
          var infoAll = pbE.SYS().readConfig(this.pbconfH5 + "main.json") ? JSON.parse(pbE.SYS().readConfig(this.pbconfH5 + "main.json")) : JSON.parse(pbE.SYS().readConfig(this.pbconfUrl + "main.json")),
            infoAllList = infoAll['infoAll'];
          console.log(infoAll, infoAllList);
          for (var i = 0; i < infoAllList.length; i++) {
            var tempObj = {};
            tempObj['name'] = infoAllList[i].coType;
            tempObj['coInstance'] = infoAllList[i].coInstance;
            this.rootCop.push(tempObj);
          }
        } else {
          this.$axios.get(this.confUrl + 'main.json').then((data) => {
            var infoAll = data.data,
              infoAllList = infoAll['infoAll'];
            for (var i = 0; i < infoAllList.length; i++) {
              var tempObj = {};
              tempObj['name'] = infoAllList[i].coType;
              tempObj['coInstance'] = infoAllList[i].coInstance;
              this.rootCop.push(tempObj);
            }
          }).catch((err) => {
            this.$axios.get("../" + this.pbconfUrl + 'main.json').then((data) => {
              var infoAll = data.data,
                infoAllList = infoAll['infoAll'];
              for (var i = 0; i < infoAllList.length; i++) {
                var tempObj = {};
                tempObj['name'] = infoAllList[i].coType;
                tempObj['coInstance'] = infoAllList[i].coInstance;
                this.rootCop.push(tempObj);
              }
            })
            console.log('读取失败!', err);
          });
        }
      },
      getLocalUserInfo () {//首次登陆存储用户数据
        if (pbE.isPoboApp && pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token')) {
          var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo()),
            postData = {
              func: 611,
              cOrgid: DeviceJsonInfo.jgid,
              cUserid: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId'),
              token: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'),
              data: {
                cLoginname: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName')
              }
            };
          this.$axios.post(pbRC.RHS('myapply', 'url'), postData).then((axiosData) => {
            var localUserInfo = axiosData.data.data;
            pbE.SYS().storePrivateData('H5_Local_User_Info', JSON.stringify(localUserInfo));
          }).catch((error) => {
            console.error(error);
          });
        }
      }
    },
    created () {
      this.getMainSet && this.getMainSet(); //获取组件配置信息
//    this.getLocalUserInfo && this.getLocalUserInfo(); //获取用户数据
      // this.$axios.get('../conf/h5/main.json')
      // .then((data) => {
      //   data = data.data;
      //   console.log(data);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    },
    mounted(){
      if (pbE.isPoboApp) {
        var confObj =  pbUtils.getModuleConfig("main.json","main")
        let conf = confObj["appSetting"];
        this.appName = conf["appName"];
        this.color = conf["baseColor"];
      }

      document.body.ontouchmove = function (e) {
        e.preventDefault();





      };

      var startX = 0, startY = 0;
      //touchstart事件
      function touchSatrtFunc(evt) {
        try
        {
          //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

          var touch = evt.touches[0]; //获取第一个触点
          var x = Number(touch.pageX); //页面触点X坐标
          var y = Number(touch.pageY); //页面触点Y坐标
          //记录触点初始位置
          startX = x;
          startY = y;

        } catch (e) {
          alert('touchSatrtFunc：' + e.message);
        }
      }
      document.addEventListener('touchstart', touchSatrtFunc, false);



      var _ss = document.getElementById('index-content-wrapper');
      //var startY;
      _ss.ontouchmove = function (ev) {
        var _point = ev.touches[0],
          _top = _ss.scrollTop;
        // 什么时候到底部
        var _bottomFaVal = _ss.scrollHeight - _ss.offsetHeight;
        // 到达顶端
        if (_top === 0) {
          // 阻止向下滑动
          if (_point.clientY > startY) {
            ev.preventDefault();
          } else {
            // 阻止冒泡
            // 正常执行
            ev.stopPropagation();
          }
        } else if (_top === _bottomFaVal) {
          // 到达底部
          // 阻止向上滑动
          if (_point.clientY < startY) {
            ev.preventDefault();
          } else {
            // 阻止冒泡
            // 正常执行
            ev.stopPropagation();
          }
        } else if (_top > 0 && _top < _bottomFaVal) {
          ev.stopPropagation();
        } else {
          ev.preventDefault();
        }
      };

/*
      this.divBody =  document.getElementById(
        'index-content-wrapper',
      );


      this.divBody.addEventListener('touchmove', function(e){
        var status = '11',
          e = e || window.event, // 使用 || 运算取得event对象
          ele = this,
          currentY = e.touches[0].clientY,
          startY = startMoveYmap[ele.id],
          scrollTop = ele.scrollTop,
          offsetHeight = ele.offsetHeight,
          scrollHeight = ele.scrollHeight;

        if (scrollTop === 0) {
          // 如果内容小于容器则同时禁止上下滚动
          status = offsetHeight >= scrollHeight ? '00' : '01';
        } else if (scrollTop + offsetHeight >= scrollHeight) {
          // 已经滚到底部了只能向上滚动
          status = '10';
        }
        if (status != '11') {
          // 判断当前的滚动方向
          var direction = currentY - startY > 0 ? '10' : '01';
          // console.log(direction);
          // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
          if (!(parseInt(status, 2) & parseInt(direction, 2))) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
        }
        /!*this.startY = event.touches[0].pageY;
        this.startTopScroll = this.divBody.scrollTop;

        if(this.startTopScroll <= 0)
          this.divBody.scrollTop = 1;

        if(this.startTopScroll + this.divBody.offsetHeight >= this.divBody.scrollHeight)
          this.divBody.scrollTop = this.divBody.scrollHeight - this.divBody.offsetHeight - 1;*!/
      }, false);*/
    }

  }
</script>
