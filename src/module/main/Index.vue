<template>
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
          return '-84px';
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
    }
  }
</script>
