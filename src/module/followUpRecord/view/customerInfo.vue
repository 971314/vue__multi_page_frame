<template>
    <div class="customerInfo">
        <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
            <div slot="body">
                <div class="segmentedCtrl">
                    <div :class="{'active':segmentedIndex==1}" @click="changeHandle(1)">已开户</div>
                    <div :class="{'active':segmentedIndex==2}" @click="changeHandle(2)">未开户</div>
                </div>
            </div>
        </common-nav>
        <div class="selectDept">
            <div class="searchbar">
                <i class="mintui mintui-search" :class="{'alignLeft':focusFlag || keyword}"></i>
                <input class="searchbar-input" :class="{'inputFocus':focusFlag || keyword}" type="text" v-model="keyword" placeholder="搜索" @focus="searchFocus(true)" @blur="searchFocus(false)"/>
            </div>
            <index-list>
                <index-section v-for="(v, i) in currentList" :key="i" :index="v.pinyin">
                    <!-- 留存客户 -->
                    <a v-if="segmentedIndex==1" class="mint-cell"  v-for="(item, index) in v.data" :key="index" @click="goTo(item)">
                        <div class="mint-list">
                            <!-- <a class="mobileIcon" :href="'tel:'+item.MOBILE_NO"><img src="../images/img18.png"/></a>
                            <div class="cusName" v-text="item.INVESTOR_NAM+'('+item.MOBILE_NO+')'"></div> -->
                            <a class="mobileIcon" ><img src="../images/img18.png"/></a>
                            <div class="cusName">item.VIPTYP</div>
                            <div class="cusLevel">
                                <!-- <img class="type1" src="../images/img14.png" v-if="item.VIPTYP" v-for="i in new Array(item.VIPTYP*1)"/> -->
                                <img class="type1" src="../images/img14.png" v-for="i in new Array(2)"/>
                                <img class="type2" src="../images/img16.png" v-if="item.OPEN_STS=='1'"/>
                                <div v-if="item.OPEN_STS=='2'">
                                    <img class="type2" src="../images/img16.png" />
                                    <img class="type3" src="../images/img17.png" />    
                                </div>
                            </div>
                        </div>
                    </a>
                    <!-- 潜在客户 -->
                    <a v-if="segmentedIndex==2" class="mint-cell" v-for="(item, index) in v.data" :key="index" @click="goTo(item)">
                        <div class="mint-list">
                            <a class="mobileIcon" :href="'tel:'+item.MOBILE_NO"><img src="../images/img18.png"/></a>
                            <div class="cusName" v-if="item.CUST_NAM" v-text="item.CUST_NAM+'('+item.MOBILE_NO+')'"></div>
                        </div>
                    </a>
                </index-section>
                <div v-if="count && segmentedIndex==1" class="haveOpen text-center">{{count}}位已开户客户</div>
            </index-list>
            
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { IndexList, IndexSection } from 'mint-ui'
  import util from '../common/util'

  export default {
        components: {
            IndexList,
            IndexSection
        },
        computed: {

        },
        data() {
            return {
                segmentedIndex: 1,
                keyword: '',
                currentResult: {
                    id: null,
                    name: null
                },
                currentList: [],
                deptJson: [],
                focusFlag: false,
                url : PBHttpServer.apply.serverUrl,
                userId : 'sysadmin',
                count : 0    //已开户人数
            }
        },
        mounted() {
            this.getCusList('investor/list/'+this.userId);
        },
        watch: {
            keyword: function(val, oldVal) {
                if (!val) {
                    this.currentList = util.deepClone(this.deptJson); 
                    return;
                }
                //根据【客户名称】【移动电话】【拼音首字母】搜索
                this.currentList = util.deepClone(this.deptJson).filter(item =>{
                    item.data = item.data.filter(item1 =>{
                        return new RegExp(val).test(item1.INVESTOR_NAM) || 
                               new RegExp(val).test(item1.MOBILE_NO) || 
                               new RegExp(val.toUpperCase()).test(item1.FIRST_PINYIN)
                    }); 
                    return item.data.length;
                })
            }
        },
        methods: {
            //切换开户状态
            changeHandle(segmentedIndex) {
                this.segmentedIndex = segmentedIndex;
                // this.$forceUpdate();
                if(segmentedIndex==1){
                    //获取【客户列表】 
                    this.getCusList('investor/list/'+this.userId);
                }else{
                    //获取【潜在客户列表】 
                    this.getCusList('pInvestor/list/'+this.userId);
                }
            },
            //搜索框获取焦点
            searchFocus(flag) {
                this.focusFlag = flag;
            },
            //获取【客户列表|潜在客户列表】
            getCusList(urlSuffix) {
                var _this = this; 
                var url = this.url + urlSuffix;
                _this.$axios.get(url, null).then(function(result) {
                    var list = result.data.data;
                    var cList = [];
                    var index = 0;
                    _this.count = 0;
                    if(list){
                        for (var i in list) {
                            cList[index] = {'pinyin':i,data:list[i]};
                            index ++;
                            _this.count = _this.count + list[i].length;
                        }
                        _this.deptJson = util.deepClone(cList);
                        _this.currentList = util.deepClone(cList);
                    }
                    
                }).
                catch(function(err) {
                    console.log('服务器异常', err)
                });
            },
            //跳转详情页面
            goTo(o){
                //console.log();
                var follow = this.$store.state.addFollow;
                follow.InvestorId = o.INVESTOR_ID;
                follow.name = o.INVESTOR_NAM;
                this.$store.dispatch('updateAddFollow', follow);
                //this.$router.push({path:'/addAndEdit'});
                history.back();
            }
        }
    }
</script>
