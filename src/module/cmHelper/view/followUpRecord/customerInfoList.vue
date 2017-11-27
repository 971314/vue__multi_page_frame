<template>
  <div class="customerInfo pobo-customer-info">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
      <div slot="body">
        <div v-if="!addFollow.businessType" class="segmentedCtrl">
          <div :class="{'active':segmentedIndex==1}" @click="changeHandle(1)">已开户</div>
          <div :class="{'active':segmentedIndex==2}" @click="changeHandle(2)">未开户</div>
        </div>
        <div v-if="addFollow.businessType==1" class="page-title">{{cusListPageTitle?cusListPageTitle:'已开户'}}</div>
        <div v-if="addFollow.businessType==2" class="page-title">{{cusListPageTitle?cusListPageTitle:'未开户'}}</div>
      </div>
      <div slot="footer" v-if="segmentedIndex==2" class="addInvestor">
        <router-link to="potentialCustomerAdd">新增</router-link>
      </div>
    </common-nav>

    <searchbar v-model="keyword">
        <searchbar-placeholder>
            <icon name="search" left size="lg"></icon><span>搜索</span>
        </searchbar-placeholder>
    </searchbar>

    <!-- <div class="searchbar" autoblur="true">
        <div class="searchbar-input" :class="{'inputFocus':focusFlag}">
            <div class="searchbar-input-placeholder" style="overflow: visible;">
                <i class="fa fa-search gap-left fa-lg"></i><span v-if="hidePlaceHolder">搜索</span></div>
            <input type="text" v-model="keyword" class="searchbar-input-field" @focus="searchFocus()" @blur="blurEv()" :placeholder="hidePlaceHolder?'':'搜索'">
        </div>
    </div> -->

    <div class="selectDept customer-info-center">
      <index-list v-if="currentList.length>0">
        <index-section v-for="(v, i) in currentList" :key="i" :index="v.pinyin">
          <!-- 留存客户 -->
          <a v-if="segmentedIndex==1" href="javascript:void(0);" class="mint-cell" v-for="(item, index) in v.data" :key="index">
            <a class="mobileIcon" @click="callTel(item.MOBILE_NO)"></a>
            <div class="mint-list" @click="goTo(item)">

              <div class="cusName" v-text="item.INVESTOR_NAM+'('+item.INVESTOR_ID+')'"></div>
              <div class="cusLevel">
                <img class="type1" src="../../images/followUpRecord/img14.png" v-if="item.VIPTYP"
                     v-for="i in new Array(item.VIPTYP*1)"/>
                <img class="type2" src="../../images/followUpRecord/img16.png" v-if="item.OPEN_STS=='1'"/>
                <div v-if="item.OPEN_STS=='2'">
                  <img class="type2" src="../../images/followUpRecord/img16.png"/>
                  <img class="type3" src="../../images/followUpRecord/img17.png"/>
                </div>
              </div>
            </div>
          </a>
          <!-- 潜在客户 -->
          <a v-if="segmentedIndex==2" href="javascript:void(0);" class="mint-cell autoHei" v-for="(item, index) in v.data" :key="index">
            <a class="mobileIcon" @click="callTel(item.MOBILE_NO)"></a>
            <div class="mint-list" @click="goTo(item)">

              <div class="cusName" v-if="item.CUST_NAM || item.MOBILE_NO">
                {{item.CUST_NAM || item.MOBILE_NO}} <span>{{item.CUST_SRC ? '('+item.CUST_SRC+')' : ''}}</span>
              </div>
            </div>
          </a>
        </index-section>

      </index-list>

    </div>

    <div v-if="count" class="haveOpen text-center">{{count}}位{{segmentedIndex==1?'已':'未'}}开户客户</div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {IndexList, IndexSection} from 'mint-ui'
  import {Indicator} from 'mint-ui'
  import util from '../../utils/util';

  export default {
    components: {
      IndexList,
      IndexSection
    },
    computed: {
      ...mapState({
        addFollow: ({followUpRecord}) => followUpRecord.addFollow,
        investor: ({followUpRecord}) => followUpRecord.investor,
        pInvestor: ({followUpRecord}) => followUpRecord.pInvestor,
        jumpFlag: ({followUpRecord}) => followUpRecord.jumpFlag,
        storeSegmentedIndex: ({followUpRecord}) => followUpRecord.segmentedIndex,
        cusListPageTitle: ({followUpRecord}) => followUpRecord.cusListPageTitle
      })
    },
    data() {
      return {
        urlcontent: 'investor',
        segmentedIndex: 0,
        keyword: '',
        currentList: [],
        deptJson: [],
        focusFlag: false,
        url: PBHttpServer.cmHelper.serverUrl,
        count: 0,    //已开户人数
        hidePlaceHolder : true
      }
    },
    activated() {
      var _this = this;
      this.deptJson = [];
      this.currentList = [];
      this.count = 0;
      // if(this.addFollow.businessType==2 || this.pInvestor.CUST_ID){
      //   //获取【潜在客户列表】
      //   this.urlcontent = 'pInvestor'
      //   this.segmentedIndex = 2;
      //   this.getCusList(this.urlcontent + '/list/' + this.info.userId);
      // }else if(this.addFollow.businessType==1 || this.investor.INVESTOR_ID || !this.investor.INVESTOR_ID){
      //   //获取【客户列表】
      //   this.urlcontent = 'investor'
      //   this.segmentedIndex = 1;
      //   this.getCusList(this.urlcontent + '/list/' + this.info.userId);
      // }
      if(this.addFollow.businessType==2 || this.storeSegmentedIndex==2){
        //获取【潜在客户列表】
        this.urlcontent = 'pInvestor'
        this.segmentedIndex = 2;
        this.getCusList(this.urlcontent + '/list/' + this.info.userId);
      }else{
        //获取【客户列表】
        this.urlcontent = 'investor'
        this.segmentedIndex = 1;
        this.getCusList(this.urlcontent + '/list/' + this.info.userId);
      }
    },
    mounted(){

    },
    watch: {
      keyword: function (val, oldVal) {
        if (!val) {
          this.currentList = util.deepClone(this.deptJson);
          return;
        }

        var tempList = util.deepClone(this.deptJson);
        for (var i = 0; i < tempList.length; i++) {
          tempList[i].data = tempList[i].data.filter(function(temp){
            return new RegExp(val).test(temp.INVESTOR_NAM) ||
                   new RegExp(val).test(temp.CUST_NAM)
          })
        }
        tempList = tempList.filter(function(item){
          return item.data.length > 0
        })
        this.currentList = tempList;
        this.$forceUpdate();
        var hei  = document.querySelector(".selectDept").offsetHeight;
          var sc = document.querySelector(".mint-indexlist-content");
        setTimeout(function(){
          if(sc){ sc.style.height = hei + 'px'; }
        },50);

      }

    },
    methods: {
      //切换开户状态
      changeHandle(segmentedIndex) {
        if (this.jumpFlag == 3) {
          return
        }
        this.segmentedIndex = segmentedIndex;
        this.deptJson = [];
        this.currentList = [];
        this.count = 0;
        if (segmentedIndex == 1) {
          //获取【客户列表】
          this.urlcontent = 'investor'
          this.getCusList('investor/list/' + this.info.userId);
        } else {
          //获取【潜在客户列表】
          this.urlcontent = 'pInvestor'
          this.getCusList('pInvestor/list/' + this.info.userId);
        }
      },
      //获取【客户列表|潜在客户列表】
      getCusList(urlSuffix) {
        var _this = this;
        var url = this.url + urlSuffix;
        _this.$loadingNodispear.toggle(' ');
        _this.$axios.get(url,{headers:{id:this.info.token}}, null).then(function (result) {

          var list = result.data.data;
          if(!list){
            _this.$loadingNodispear.hide()
            return;
          }else if(list && list.length <= 0){
            _this.$loadingNodispear.hide()
            return;
          }
          var cList = [];
          var index = 0;
          var hasOther = null;
          _this.count = 0;
          if (list) {
            for (var i in list) {
              if(i=="#"){
                hasOther = {'pinyin': i, 'data': list[i]};
                continue;
              }else{
                cList[index] = {'pinyin': i, 'data': list[i]};
              }
              index++;
              _this.count = _this.count + list[i].length;
            }
            //按照字母顺序排序
            cList.sort(function(m,n){    
                var s = m.pinyin;    
                var e = n.pinyin;    
                if(s>e){    
                    return 1    
                }else if(s<e){    
                    return -1;    
                }else{    
                    return 0;    
                }    
            }); 
            if(hasOther){
               cList.push(hasOther);
            }
            _this.deptJson = util.deepClone(cList);
            _this.currentList = util.deepClone(cList);
          }
          setTimeout(function(){
            var hei  = document.querySelector(".selectDept").offsetHeight;
            document.querySelector(".mint-indexlist-content").style.height = hei + 'px';
            _this.$loadingNodispear.hide()
          },50);
        }).catch(function (err) {
          _this.$loadingNodispear.hide()
          _this.$toast('服务器异常!')
          console.log('服务器异常', err)
        });
      },
      //跳转详情页面
      goTo(o){
        //跳转客户详情
        if (this.jumpFlag == 1) {
          if (this.segmentedIndex == 1) {
            //已开户
            var p = this.addFollow;//获取store中的 跟进情况
            p.InvestorId = o.INVESTOR_ID;//客户代码
            p.name = o.INVESTOR_NAM;//客户名称
            this.$store.dispatch('updateAddFollow', p);

            var p = this.investor;//获取store中的 跟进情况
            p.INVESTOR_ID = o.INVESTOR_ID;//客户代码
            p.INVESTOR_NAM = o.INVESTOR_NAM;//客户名称
            p.LINKTELEPHONE = o.LINKTELEPHONE;//电话
            p.MOBILE_NO = o.MOBILE_NO;//移动电话
            p.OPEN_STS = o.OPEN_STS;//新开户情况：1-新开户未入金 2-新开户有入金
            p.VIPTYP = o.VIPTYP;  //星级
            this.$store.dispatch('updateInvestor', p);

            this.$router.push({
              name: 'noPotentialCustomer'
            })
          } else {
            //未开户
            var p = this.pInvestor;//获取store中的 潜在客户信息
            p.CUST_ID = o.CUST_ID;//客户代码
            p.CUST_NAM = o.CUST_NAM;//客户名称
            p.CUST_SRC = o.CUST_SRC;//潜在客户客户来源
            p.INPUT_TIME = util.getDate(o.INPUT_TIME);//创建时间
            p.LINKTELEPHONE = o.LINKTELEPHONE;//潜在客户电话
            p.MOBILE_NO = o.MOBILE_NO;//潜在客户移动电话
            this.$store.dispatch('updatepInvestor', p);
            this.$router.push({
              name: 'potentialCustomer'
            })
          }
        }
        //跳转新建跟进
        else if (this.jumpFlag == 2) {
          var p = this.addFollow;//获取store中的 跟进情况
          p.InvestorId = o.CUST_ID || o.INVESTOR_ID;//客户代码
          p.name = o.CUST_NAM || o.INVESTOR_NAM;//客户名称
          this.$store.dispatch('updateAddFollow', p);
          this.$router.back();
        }
        else {
          var p = this.investor;//获取store中的 跟进情况
          p.INVESTOR_ID = o.INVESTOR_ID;//客户代码
          p.INVESTOR_NAM = o.INVESTOR_NAM;//客户名称
          p.LINKTELEPHONE = o.LINKTELEPHONE;//电话
          p.MOBILE_NO = o.MOBILE_NO;//移动电话
          p.OPEN_STS = o.OPEN_STS;//新开户情况：1-新开户未入金 2-新开户有入金
          p.VIPTYP = o.VIPTYP;  //星级
          this.$store.dispatch('updateInvestor', p);
          this.$router.back();
        }

      },
      //打电话
      callTel(MOBILE_NO) {
        window.location.href = "pobo:uncheck=1&pageId=800007&tel=" + MOBILE_NO;
      }
    }
  }
</script>
