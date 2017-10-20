<template>
  <div class="account-diagnosis">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="account-diagnosis-title" slot="body">
        账户诊断
      </div>
    </common-nav>
    <div class="diagnosis-coulmn">
      <img src="../images/titlefuhao@2x.png" :class="{'imgTop': isAndroid}">
      <span class="diagnosis-coulmn-header">基本评估</span>
    </div>
    <div class="diagnosis-content">
      <div class="diagnosis-content-item" @click="goToItem('Yield')">
        <div class="img-content">
          <img src="../images/basicyejifenxidefault@2x.png"/>
        </div>
        <p class="item-content">基本业绩分析</p>
      </div>
    </div>

    <div class="diagnosis-coulmn top20">
      <img src="../images/titlefuhao@2x.png" :class="{'imgTop': isAndroid}">
      <span class="diagnosis-coulmn-header">趋势分析</span>
    </div>
    <div class="diagnosis-content" style="border-bottom: none;">
      <div class="diagnosis-content-item" @click="goToItem('MoneyPaid')">
        <div class="img-content">
          <img src="../images/yingkuifenxidefault@2x.png"/>
        </div>
        <p class="item-content">盈亏分析</p>
      </div>
      <div class="diagnosis-content-item" @click="goToItem('Profit')">
        <div class="img-content">
          <img src="../images/zijinhuibaolvsandiandefault@2x.png"/>
        </div>
        <p class="item-content">资金回报率散点</p>
      </div>
      <div class="diagnosis-content-item" @click="goToItem('ykfx')">
        <div class="img-content">
          <img src="../images/shouyilvquxiandefault@2x.png"/>
        </div>
        <p class="item-content">收益率曲线</p>
      </div>
    </div>
    <div class="diagnosis-content">
      <div class="diagnosis-content-item" @click="goToItem('fqzj')">
        <div class="img-content">
          <img src="../images/fqzjdefault@2x.png"/>
        </div>
        <p class="item-content">复权资金</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        gobackUrl: 'close'
      }
    },
    activated() {
      document.body.style.backgroundColor = '#f7f7fa';
    },
    created() {
//      let postParams = {
//        ST_DT: "2010-01-01",
//        END_DT: "2017-07-01",
//        INVESTOR_ID: "103087",
//        PRODUCT_CD: ""
//      };
//      let params = {
//        'func': 2022,
//        'type': 2,
//        'account': '',
//        'token': '',
//        'data': [{
//          'service': 'investor_analysis.103',
//          'json': JSON.stringify(postParams)
//        }]
//      };
//      this.$post({restUrl: 'queryMoneyEarn', params: params})
//        .then(response => {
//            console.log(response);
//          //onsole.log(JSON.parse(response.data.data[0].proxyresult));
//        })
//        .catch(res => {
//          console.log(res);
//        });

//      this.$get({restUrl: '../conf/h5/main.json', isJson: true})
//        .then((response) => {
//          console.log(response);
//        })
//        .catch((res) => {
//          console.log(res);
//        });
    },
    computed: {
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
      }
    },
    methods: {
      goToItem(itempathName) {
//        window.location.href = `pobo:uncheck=1&pageId=900005&url=analysis/index.html#/${itempathName}`;
        this.$router.push({name: itempathName});
      }
    }
  }
</script>
