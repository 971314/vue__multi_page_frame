//let isShare = pbE.isPoboApp?pbE.SYS().readConfig("conf/h5/main.json")?JSON.parse(pbE.SYS().readConfig("conf/h5/main.json")).appSetting.isShare:false : false
export default {
  data() {
    return {
      token: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : "1",//token
      userId: pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : "1",//认证的id
      getDevice:pbE.isPoboApp?JSON.parse(pbE.SYS().getDeviceJsonInfo())['255'] : '',
      isShare:true
      // shareUrl:'http://pbnetserver.pobo.net.cn/PbMobile/wq/share/news.html?type='
      // shareUrl:'http://101.226.207.142/PbMobile/wq/share/news.html?type='
    }
  }
}
