<template>

    <div class="cmTrends approTask pobo-main-index">

        <div>
            <common-nav>
                <div slot="body">
                    <span>审批任务</span>
                </div>
            </common-nav>
        </div>
        <tabbar class="no-margin" @change="changeHandle">
                <tabbar-item>待审批</tabbar-item>
                <tabbar-item>已审批</tabbar-item>
            </tabbar>

        <div class="container fzj-zy-content" v-if="lists">
            

            <div class="pobo-no-data1" v-if="lists.length <= 0">
                <div class="text-center" >
                    <img src="../../images/others/img19.png"/>
                </div>
                <span>暂无数据</span>
            </div>

            <div class="group" v-if="lists.length > 0" v-infinite-scroll="loadMore"  infinite-scroll-distance="10">
                <a class="cell" v-for="(item, i) in lists" @click="goTaskDetail(item)">
                    <span class="cell-body">
                        <h3>{{cutName(item.appObjectName)}} | {{item.processName}}</h3>
                        <h3>{{item.operatorName}} ({{item.departName}})</h3>
                    </span>
                    <div class="date" v-if="qrytype==1 && item.appDate">
                        <p>{{item.appDate ? $$timeFormate({date: item.appDate, format: 'M-D'}) : ''}}</p>
                        <p>{{item.appDate ? $$timeFormate({date: item.appDate, format: 'h:m'}) : ''}}</p>
                    </div>
                    <div class="date" v-if="qrytype==2">
                        <p :class="{'fontType1':item.appStatus!='3','fontType2':item.appStatus=='3'}">{{item.result}}</p>
                        <p v-if="item.appDate">{{getDateDIY(item.appDate) + ' ' +$$timeFormate({date: item.appDate, format: 'h:m'})}}</p>
                    </div>
                </a>
            </div>
            <div class="countNum" v-if="lists.length > 0"><span>共{{lists.length}}条</span></div>

        </div>

    </div>

  
</template>

<script>

    import {mapState} from 'vuex'
    import moment from "moment";
    import axios from 'axios';
    import util from '../../utils/util';

    export default {

        data() {
            return {
                begin : 1,
                size : 10,
                qrytype : 1, //1未完成 2已完成
                lists : null,
                loadMoreFlag : false
            }
        },
        computed: {
          ...mapState({
            process: ({others}) => others.process
          })
        },
        activated() {
            this.lists = [];
            this.begin = 1;
            //查看我要处理的审批
            this.getLeaderApprove();
        },
        mounted() {
            
        },

        methods: {

            //切换tab
            changeHandle(val) {
                this.lists = null;
                this.begin = 1;
                this.loadMoreFlag = false;
                this.qrytype = val + 1;
                this.getLeaderApprove();
            },
            //查看我要处理的审批
            getLeaderApprove(){
                var _this = this;
                _this.$$axios({
                    restUrl: 'leaderApprove',
                    join: [ [ _this.info.userId, ['qrytype',_this.qrytype], ['begin',_this.begin], ['size',_this.size] ] ],
                    loading : true
                })
                .then((response) => { 
                    if(response.length == 0){
                        _this.lists = [];
                        return;
                    }else if(response.length > 0 && response.length < _this.size){
                        _this.loadMoreFlag = false;
                    }else if(response.length >= _this.size){
                        _this.begin += 1;
                        _this.loadMoreFlag = true;
                    }
                    if(!_this.lists){ _this.lists = []; }
                    //response = util.dateSort(response, 'appDate')
                    _this.lists = util.dateSort(_this.lists.concat(response),'appDate');

                })
                .catch((res) => {
                    console.log('res', res);
                })
            },
            //加载更多
            loadMore(){
                if(this.loadMoreFlag){
                    this.getLeaderApprove();
                }
            },
            //跳转任务详情
            goTaskDetail(o){
                var process = this.process;
                process.businessKeyId = o.businessKeyId;
                process.processId = o.processId;
                process.taskId = o.taskId;
                process.taskFlag = this.qrytype;
                this.$store.dispatch('updataProcess', process);
                this.$router.push({ name: 'approProcess' })
            },
            //日期格式化
            getDateDIY(d){
                if(!d){ return ""; }
                if(d.indexOf('.') >= 0){
                   d = d.substring(0,d.indexOf('.')); //过滤掉 小数点以及 小数点后面的 字符
                }
                var ddd = new Date();
                var ddd2 = new Date(d);
                var y = ddd.getFullYear();
                var y2 = ddd2.getFullYear();
                if(y==y2){
                    return this.$$timeFormate({date: d, format: 'M-D'})
                }else{
                    return this.$$timeFormate({date: d, format: 'Y-M-D'})
                }
            }
        }
    }
</script>
