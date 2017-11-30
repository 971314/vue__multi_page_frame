<template>
  <div class="full-height">
    <div class="container">
      <div class="share">最新更新时间：<span>{{updateTime | getTimeFmt}}</span>
        <!--<a :href="'pobo:pageId=800012&type=0&title=机构动向&des=机构动向&url='+share" class="btn-share"></a>-->
      </div>
      <div class="header-select">
        <flex class="row">
          <flex-item class="text-center item" style="font-size: 12px;">
            <div class="selection-component">
              <div class="selection-show" @click="toggle0">
                <span v-text="futuresExchange.name"></span>
                <div :class="{'arrow-down': direction1,'arrow-up': !direction1}"></div>
              </div>
            </div>
          </flex-item>
          <flex-item class="text-center item" style="font-size: 12px;">
            <div class="selection-component">
              <div class="selection-show" @click="toggle1">
                <span v-text="futuresVarity.name"></span>
                <div :class="{'arrow-down': direction2,'arrow-up': !direction2}"></div>
              </div>
            </div>
          </flex-item>
        </flex>
        <flex class="row">
          <flex-item class="text-center item">
            <div class="selection-component">
              <div class="selection-show" @click="toggle2">
                <span v-text="varityCode"></span>
                <div :class="{'arrow-down': direction3,'arrow-up': !direction3}"></div>
              </div>
            </div>
          </flex-item>
          <flex-item class="text-center item">
            <div class="selection-component">
              <div class="selection-show" @click="toggle3">
                <span v-text="sortNum"></span>
                <div :class="{'arrow-down': direction4,'arrow-up': !direction4}"></div>
              </div>
            </div>
          </flex-item>
        </flex>
      </div>
      <div class="hr-border-10"></div>

      <!--持仓种类选项卡开始-->
      <div class="btn-tabs">
        <div v-for="t in typeIds" class="tabs" :class="{'active':typeId.typeId == t.typeId}" @click="changeTypeId(t)"
             style="border-bottom: 1px solid #e3e3e3;">
          <button>{{t.name}}持仓</button>
        </div>
      </div>
      <!--持仓种类选项卡结束-->
      <!--<div class="hr-border-10"></div>-->

      <!--列表数据开始-->
      <div v-show="show" class="table">
        <div class="tr font-23 text-color17"
             style="padding-left:15px;padding-right:15px;font-size: 12px;background-color: #F7F7FA;">
          <!--<div class="th th1">序号</div>-->
          <div class="th flex3">公司简称</div>
          <div class="th text-right" @click="multiSort(typeId.title+'cc','volume')">{{typeId.name}}持仓<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeId.title+'cc'] == 2,'multi-icon-up': multiArrow[typeId.title+'cc'] == 1}"></span>
          </div>
          <div class="th text-right" @click="multiSort(typeId.title+'zj','change')">{{typeId.name}}增减<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeId.title+'zj'] == 2,'multi-icon-up': multiArrow[typeId.title+'zj'] == 1}"></span>
          </div>
          <div v-if="typeId.title != 'j'" class="th text-right" @click="multiSort(typeId.title+'jj','priceAvg')">{{typeId.name}}均价<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeId.title+'jj'] == 2,'multi-icon-up': multiArrow[typeId.title+'jj'] == 1}"></span>
          </div>
        </div>
        <div v-if="productRanking.length != 0" class="tr font-26 text-color18"
             style="padding-left:15px;padding-right:15px;background-image: url(../images/fivestar@2x.png);background-repeat: no-repeat;background-size: 26px 17px;">
          <!--<div class="td td1 text-center"></div>-->
          <div class="td text-center flex3">{{zxjtInfoMsg.name ? zxjtInfoMsg.name : '--'}}</div>
          <div class="td text-right th-padding8p">{{zxjtInfoMsg.volume || zxjtInfoMsg.volume == 0 ? zxjtInfoMsg.volume : '--'}}</div>
          <div class="td text-right th-padding8p"
               :class="{'text-color2':zxjtInfoMsg.change > 0,'text-color3':zxjtInfoMsg.change < 0}"
               v-text="zxjtInfoMsg.change || zxjtInfoMsg.change == 0 ? zxjtInfoMsg.change: '--'"></div>
          <div v-if="typeId.title != 'j'" class="td text-right th-padding8p" v-text="(zxjtInfoMsg.priceAvg || zxjtInfoMsg.priceAvg == 0) && futuresExchange.id != 40030139?zxjtInfoMsg.priceAvg.toFixed(2):'--'"></div>
        </div>
        <div class="tr font-26 text-color18" :class="index < 3 ? 'range' + (index+1) : ''" v-for="(product,index) in productRanking" v-if="index >= 0"
             style="padding-left:15px;padding-right:15px;">
          <!--<div class="td td1 text-center" :class="index<4?'order'+(index-1):'order'" v-text="index<4?'':index"></div>-->
          <div class="td text-center flex3" v-text="product.name ? product.name: '--'"></div>
          <div class="td text-right th-padding8p" v-text="product.volume||product.volume == 0 ? product.volume: '--'">1808</div>
          <div class="td text-right th-padding8p" :class="{'text-color2':product.change > 0,'text-color3':product.change < 0}"
               v-text="product.change||product.change == 0 ? product.change: '--'"></div>
          <div v-if="typeId.title != 'j'" class="td text-right th-padding8p" v-text="(product.priceAvg||product.priceAvg == 0) && futuresExchange.id != 40030139 ?product.priceAvg.toFixed(2):'--'"></div>
        </div>
        <!--<div v-if="productRankingMore" @click="toProductRankingMore" class="show-more">点击显示全部</div>-->
      </div>
    </div>
      <multi-slide v-model="showEvent1">
        <p style="padding: 5px 10px;"><img src="../../../assets/images/cityred.png" style="height: 15px;margin-right: 5px;">请选择期货交易所：</p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':f.id == futuresExchange.id}"
                 v-for="f in futuresExchanges" v-text="f.name" @click="selectFuturesExchange(f)">
            </div>
          </div>
        </div>
      </multi-slide>

      <multi-slide v-model="showEvent2">
        <p style="padding: 5px 10px;"><img src="../../../assets/images/cityred.png" style="height: 15px;margin-right: 5px;">请选择品种：</p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':f.code == futuresVarity.code}"
                 v-for="f in futuresVaritys" v-text="f.name" @click="selectFuturesVarity(f)">
            </div>
          </div>
        </div>
      </multi-slide>

      <multi-slide v-model="showEvent3">
        <p style="padding: 5px 10px;"><img src="../../../assets/images/cityred.png" style="height: 15px;margin-right: 5px;">请选择合约：</p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':varityCode == v}" v-for="v in varityCodes" v-text="v"
                 @click="selectVarityCode(v)">
            </div>
          </div>
        </div>
      </multi-slide>

      <multi-slide v-model="showEvent4">
        <p style="padding: 5px 10px;"><img src="../../../assets/images/cityred.png" style="height: 15px;margin-right: 5px;">请选择列表数量：</p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':v >= 10000 ? sortNum == '全部': sortNum == `前${v}`}" v-for="v in sortNumList"
                 v-text="v >= 10000 ? '全部' : `前${v}`" @click="selectSortList(v)">
            </div>
          </div>
        </div>
      </multi-slide>

  </div>
</template>
<script>
  import uiInfos from "../components/uiInfos.vue";
  import {
    parts,
    typeIds
  } from "../common/config/constants.js";
  export default {
    components: {
      "ui-infos": uiInfos
    },
    data() {
      return {
        updateTime: '',
        zxjtInfoMsg: {},
        sortNum: '前20',
        sortNumList: [
          20
        ],
        showEvent1: false,
        showEvent2: false,
        showEvent3: false,
        showEvent4: false,
        direction1: true,
        direction2: true,
        direction3: true,
        direction4: true,

        multiArrow: {// 1往上  0消失  2往下
          'dtcc': 0,
          'dtzj': 0,
          'dtjj': 0,
          'ktcc': 0,
          'ktzj': 0,
          'ktjj': 0,
          'jcc': 0,
          'jzj': 0,
          'jjj': 0
        },
        share: "",
        date: new Date(),
        typeId: typeIds.dt,
        typeIds: typeIds,
//            news: [],
        futuresExchange: {},
        futuresExchanges: [],
        showFuturesExchanges: false,
        futuresVarity: {},
        futuresVaritys: [],
        showFuturesVaritys: false,
        varityCode: "",
        varityCodes: [],
        showVarityCodes: false,
        productRanking: [],
        productRankingMore: false,
        part: '',
        parts: parts
      }
    },
    created() {
      //   this.$emit('change-keys',0);
      this.share = this.$encodeURI(this.projectPrefix[0] + "index.html#" + this.$route.fullPath);
      this.part = this.parts.pbxgxw.part;
      this.initType();
    },
    mounted() {
      this.queryLastProductTime();
      document.getElementById('navbarContent').style.display = 'block';
      this.$parent.$data.activeIndex = 0;
    },
    watch: {
      showEvent1(val) {
          if (!val) {
              this.direction1 = true;
          }
      },
      showEvent2(val) {
        if (!val) {
          this.direction2 = true;
        }
      },
      showEvent3(val) {
        if (!val) {
          this.direction3 = true;
        }
      },
      showEvent4(val) {
        if (!val) {
          this.direction4 = true;
        }
      }
    },
    methods: {
      queryLastProductTime() {
        this.$post([1, "queryLastProductTime"], {
          orgCode: this.orgCode
        }, false, undefined, true).then(res => {
          this.updateTime = res.tradeTime;
        });
      },
      queryLastInventoryTime() {
        this.$post([1, "queryLastInventoryTime"], {}, false, undefined, true).then(res => {
        });
      },
      selectSortList(v) {
        this.showEvent4 = false;
        this.direction4 = true;
        this.pageSize = v;
        if (v >= 10000) {
          this.sortNum = '全部'
        }else {
          this.sortNum = `前${v}`;
        }
        if (this.futuresExchange.name) {
          if (this.futuresVarity.name) {
            if (this.varityCode && this.varityCode != '汇总' && this.varityCode != '无数据') {
              this.queryContractRankingByFuturesCode();
            } else {
              this.queryProductRankingByTypeId();
            }
          } else {
            this.selectFuturesExchange(this.futuresExchange);
          }
        } else {
          this.initType();
        }


      },
      sortData(coulmn, direction) {//排序数据(冒泡排序法)
        let isAllEmpty = this.productRanking.find((item, index) => {
          return item[coulmn] !== null && !isNaN(item[coulmn]) ? item : null
        })
        if (!isAllEmpty) {
          return
        }

        this.productRanking && this.productRanking.sort((item1, item2) => {
          let val1 = item1[coulmn]
          let val2 = item2[coulmn]

          if (isNaN(val1) && isNaN(val2)) {
            return 0
          }

          // 如果有null值 或者不为数值，则置底
          if (isNaN(val1) || val1 == null) {
            return -1
          }

          if (isNaN(val2) || val2 == null) {
            return -1
          }

          if (direction === 'up') {
            return val1 - val2
          } else if (direction === 'down') {
            return val2 - val1
          }
        })
        console.log('productRanking', this.productRanking);
      },
      resetArrow() {//重置箭头
        for (let k in this.multiArrow) {
          this.multiArrow[k] = 0;
        }
      },
      multiSort(str, coulmn) { //排序通用方法
        let temp;
        if (this.multiArrow[str] == 0 || this.multiArrow[str] == 2) {
          temp = 1;
        } else if (this.multiArrow[str] == 1) {
          temp = 2;
        }

        this.resetArrow();
        this.multiArrow[str] = temp;
        let direction;
        if (this.multiArrow[str] == 2) {
          direction = 'down';
        } else if (this.multiArrow[str] == 1) {
          direction = 'up';
        }
        this.sortData(coulmn, direction);
      },
      toggle0() {
        this.showEvent1 = true;
        this.direction1 = false;
      },
      toggle1() {
        this.showEvent2 = true;
        this.direction2 = false;
      },
      toggle2() {
        this.showEvent3 = true;
        this.direction3 = false;
      },
      toggle3() {
        this.showEvent4 = true;
        this.direction4 = false;
      },
      initType() { //选择品种
        this.show = true;
        this.queryAllFuturesExchange();
      },
      changeTypeId(typeId) { //选择品种
        console.log(this.futuresExchange.id);
        if (this.typeId.typeId != typeId.typeId) {
          this.typeId = typeId;
          if (this.futuresVarity && this.futuresVarity.code) {
            if (this.varityCode && this.varityCode != '汇总') {
              this.queryContractRankingByFuturesCode();
            } else {
              this.queryProductRankingByTypeId();
            }
          }
        }
      },
      queryAllFuturesExchange() {  //选择品种
        this.$post([1, "queryAllFuturesExchange4Product"], {
          exchId: null
        }, false, undefined, true).then(res => {
          this.futuresExchanges = res;
          this.selectFuturesExchange(this.futuresExchanges[0]);
        });
      },
      queryProductRankingByTypeId() { //选择品种
        this.productRankingMore = false;
        this.$post([1, "queryProductRankingByTypeId"], {
          pageNo: 1,
          pageSize: this.pageSize,
          needCount: 0,
          tickerCode: this.futuresVarity.code,
          typeId: this.typeId.typeId,
          orgCode: this.orgCode
        }).then(res => {
          this.date = new Date();
          this.productRanking = res.results;
          this.zxjtInfoMsg = Object.assign({}, this.productRanking[0]);
          this.productRanking.splice(0,1); //去除每次请求的第一个数据(期货公司)
          if (this.productRanking.length === this.pageSize + 1) {
            this.productRankingMore = true;
          }
        });
      },
      queryContractRankingByFuturesCode() { //选择品种
        this.productRankingMore = false;
        this.$post([1, "queryContractRankingByFuturesCode"], {
          pageNo: 1,
          pageSize: this.pageSize,
          needCount: 0,
          futuresCode: this.varityCode,
          typeId: this.typeId.typeId,
          orgCode: this.orgCode
        }).then(res => {
          this.date = new Date();
          this.productRanking = res.results;
          this.zxjtInfoMsg = Object.assign({}, this.productRanking[0]);
          this.productRanking.splice(0,1); //去除每次请求的第一个数据(期货公司)
          if (this.productRanking.length == this.pageSize + 1) {
            this.productRankingMore = true;
          }
        });
      },
      selectFuturesExchange(f) {  //选择品种
        if (f.id === 40030137) { //大连交易所
          this.sortNumList = [];
          this.sortNumList = [
            20,
            50,
            100,
            10000
          ];
        }

        if (f.id === 40030136) { //上海交易所
          this.sortNumList = [];
          this.sortNumList = [
            20
          ];
        }

        if (f.id === 40030138) {  //郑州交易所
          this.sortNumList = [];
          this.sortNumList = [
            20
          ];
        }

        if (f.id === 40030139) {  //中金所
          this.sortNumList = [];
          this.sortNumList = [
            20
          ];
        }
        this.sortNum = `前${this.sortNumList[0]}`;

        this.showEvent1 = false;
        this.direction1 = true;
        let tempObj = {};
        for (let key in f) {
          tempObj[key] = f[key];
        }
        this.futuresExchange = tempObj;
        this.futuresVarity = {};
        this.varityCode = "";

        this.$post([1, "queryAllFuturesExchange4Product"], {
          exchId: this.futuresExchange.id
        }, false, undefined, true).then(res => {
          this.futuresVaritys = res;
          this.selectFuturesVarity(this.futuresVaritys[0]);
        });
      },
      selectFuturesVarity(f) {  //选择品种
        this.showEvent2 = false;
        this.direction2 = true;
        if (this.futuresVarity.code != f.code) {
          let tempObj = {};
          for (let key in f) {
            tempObj[key] = f[key]
          }
          this.futuresVarity = tempObj;
          this.varityCodes = [];
          this.varityCode = "汇总";
          this.varityCodes.push(this.varityCode);
          if (this.futuresExchange.id === 40030139) {
            this.varityCode = "";
            this.varityCodes = [];
          }


          if (this.futuresExchange.id === 40030139) { //中金所
            this.$post([1, "queryContractRankingByProductId"], {
              "tickerCode": this.futuresVarity.code,
              "typeId": this.typeId.typeId
            }, false, undefined, true).then((res) => {
              for (let i = 0; i < res.length; i++) {
                this.varityCodes.push(res[i].code);
              }
              if (res.length < 1) {
                this.varityCodes = ['无数据']
              }
              this.varityCode = this.varityCodes[0];
              //this.futuresVarity.code = res;
              if (this.varityCode && this.varityCode != '汇总' && this.varityCode != '无数据') {
                this.queryContractRankingByFuturesCode();
              }else {
                this.queryProductRankingByTypeId();
              }
            });
          }else {
            let date = new Date();
            for (let i = 0; i < 12; i++) {
              let year = date.getYear() - 100;
              let month = date.getMonth() + 1;
              if (month + i > 12) {
                month = month + i - 12;
                year = year + 1;
              } else {
                month = month + i;
              }
              if (month < 10) {
                month = "0" + month;
              }
              this.varityCodes.push(f.code + year + month);
            }
            this.varityCode = this.varityCodes[0];
            if (this.varityCode && this.varityCode != '汇总' && this.varityCode == '无数据') {
              this.queryContractRankingByFuturesCode();
            }else {
              this.queryProductRankingByTypeId();
            }
          }

        }
      },
      selectVarityCode(v) { //选择品种
        this.showEvent3 = false;
        this.direction3 = true;
        this.varityCode = v;
        if (this.varityCode == '汇总' || this.varityCode == '无数据') {
          if (this.futuresVarity.code) {
            this.queryProductRankingByTypeId();
          }
        } else {
          this.queryContractRankingByFuturesCode();
        }
      },
      toProductRankingMore() { //选择品种
        this.$router.push({
          name: "productRanking",
          query: {
            typeId: this.typeId.typeId,
            typeName: this.typeId.name,
            tickerCode: this.varityCode && this.varityCode != '汇总' && this.varityCode != '无数据' ? this.varityCode : this.futuresVarity.code,
            varityCode: this.varityCode
          }
        });
      }
    }
  }
</script>
