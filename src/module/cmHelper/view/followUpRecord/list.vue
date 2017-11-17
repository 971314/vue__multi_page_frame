<template>
<!-- <div class="pobo-customer-info"> -->
    <div class="cmTrends recordList pobo-customer-info">

        <div>
            <common-nav>
                <div slot="body">
                    <span>跟进记录</span>
                </div>
                <div slot="footer" class="addFollow" @click="showBase = true">
                    新建跟进
                </div>
            </common-nav>
        </div>

        <tabbar class="no-margin" activeKey="0" @change="changeHandle">
            <tabbar-item eventKey="0">已开户</tabbar-item>
            <tabbar-item eventKey="1">未开户</tabbar-item>
        </tabbar>

        <div class="customer-info-center container">



            <div v-infinite-scroll="loadMore"  infinite-scroll-distance="10">
                <div class="group-title" v-for="(item, index) in list">
                    <div class="recordListDate"><i>&nbsp;</i>
                        <strong v-if="item.date==today">今天</strong>
                        <strong v-else-if="item.date==yesToday">昨天</strong>
                        <strong v-else>{{item.date}}</strong>
                    </div>
                    <div class="group">
                        <a class="cell" v-for="(d, j) in item.data" @click="goToDetail(d)">
                            <span class="cell-body">
                                <h3 v-if="tabIndex==0">{{d.INVESTOR_NAM + ' | ' + d.PROBLEM_TYP}}</h3>
                                <h3 v-if="tabIndex==1">{{d.INVESTOR_NAM}}</h3>
                                <h3>{{d.PROBLEM_DESC || d.FOLLOWDESC}}</h3>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

        </div>

        <slideup v-model="showBase">
            <div class="topArea">
                <div class="suItem text-center" @click="goToAddPage(1)">
                    已开户
                </div>
                <div class="suItem text-center" @click="goToAddPage(2)">
                    未开户
                </div>
            </div>
            <div class="suItem cancelAdd text-center" @click="showBase = false">
                取消
            </div>
        </slideup>

    </div>
<!-- </div> -->

</template>

<script>

    import {mapState} from 'vuex'
    import moment from "moment";
    import axios from 'axios';
    import browser from '../../utils/browser';
    import util from '../../utils/util';

    export default {

        data() {
            return {
                showBase : false,
                sourceList : [],
                list : [],
                begin : 1, //页码
                size : 10,
                tabIndex:0,
                loading : false,
                urlSuffix : 'investorFollow',
                today : util.getDate(),
                yesToday : util.addDate(null,-1)
            }
        },
        computed: {
          ...mapState({
            addFollow: ({followUpRecord}) => followUpRecord.addFollow,
            showEditBtn: ({followUpRecord}) => followUpRecord.showEditBtn,
            isEdit: ({followUpRecord}) => followUpRecord.isEdit
          })
        },
        mounted() {

        },
        activated() {
            this.begin = 1;
            this.list = [];
            this.sourceList = [];
            this.showBase = false;
            this.getList();
        },
        methods: {

            //切换tab
            changeHandle(val) {
                this.tabIndex = val;
                this.list = [];
                this.sourceList = [];
                this.begin = 1;
                if(val==0){
                    //已开户
                    this.urlSuffix = "investorFollow";
                }else{
                    //未开户
                   this.urlSuffix = "pInvestorFollow";
                }
                this.getList();
            },
            //跳转去【新增|编辑】跟进记录 页面
            goToAddPage(type){
                var a = {
                      businessType : '',//1:留存客户跟进   2:潜在客户跟进
                      followId : '',   //客户跟进Id
                      InvestorId : '', //投资者ID
                      name : '',       //投资者姓名
                      followType : '', //跟进类型code
                      followTypeName : '', //跟进类型
                      followDesc : '', //内容
                      followNote : '', //备注（处理结果）
                      attach : []      //附件列表
                };
                a.businessType = type;
                this.$store.dispatch('updateAddFollow', a);
                this.$store.dispatch('updatepShowEditBtn', false);
                this.$store.dispatch('updatepIsEdit', false);
                this.$router.push({path:'/addAndEdit'});
            },
            //查询跟进记录
            getList(){
                var _this = this;
                _this.$$loading();
                var url = PBHttpServer.cmHelper.serverUrl + this.urlSuffix + "/list/" + this.info.userId + "?begin=" + this.begin + "&size=" + this.size;
                this.$axios.get(url,{headers:{id:this.info.token}}, null).then(function(result) {
                    var datas = result.data.data;
                    if(datas.length <= 0){
                        _this.loading = false
                        return;
                    }if( (datas.length >0) && (datas.length < _this.size) ){
                        _this.loading = false
                    }else{
                        _this.loading = true
                    }
                    if(_this.tabIndex==1){
                        for (var i = 0; i < datas.length; i++) {
                            datas[i].FOLLOWDESC = datas[i].FOLLOWDESC.replace(/\\n/g," ");
                        }
                    }
                    
                    _this.sourceList = _this.sourceList.concat(datas);
                    var tempList = util.deepClone(_this.sourceList);
                    _this.list = util.dateSort(util.sortGroup(tempList, _this.tabIndex));;
                    _this.begin += 1;
                    _this.$$loaded();
                }).
                catch(function(err) {
                    console.log('服务器异常', err)
                });
            },
            //加载更多
            loadMore(){
                if(this.loading){
                    this.getList();
                }
            },
            //跳转跟进详情页面
            goToDetail(o){
                var follow = {
                      businessType : parseInt(this.tabIndex) + 1,//1:留存客户跟进   2:潜在客户跟进
                      followId : o.PROBLEM_ID || "",   //客户跟进Id
                      InvestorId : o.INVESTOR_ID, //投资者ID
                      name : '',       //投资者姓名
                      followType : '', //跟进类型code
                      followTypeName : '', //跟进类型
                      followDesc : '', //内容
                      followNote : '', //备注（处理结果）
                      attach : []      //附件列表
                };
                this.$store.dispatch('updateAddFollow', follow);
                this.$store.dispatch('updatepShowEditBtn', true);
                this.$store.dispatch('updatepIsEdit', true);
                this.$router.push('/addAndEdit');
            }

        }
    }
</script>
