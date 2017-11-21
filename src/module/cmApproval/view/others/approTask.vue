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

        <div class="container fzj-zy-content">
            

            

            <div class="group" v-infinite-scroll="loadMore"  infinite-scroll-distance="10">
                <a class="cell" v-for="(item, i) in lists" @click="goTaskDetail(item.businessKeyId)">
                    <span class="cell-body">
                        <h3>{{item.appObjectName}} {{item.processName}}</h3>
                        <h3>客户经理 {{item.operatorName}}({{item.departName}})</h3>
                    </span>
                    <div class="date" v-if="qrytype==1">
                        <p>{{item.appDate ? getDateDIY(item.appDate)[0] : ''}}</p>
                        <p>{{item.appDate ? getDateDIY(item.appDate)[1] : ''}}</p>
                    </div>
                    <div class="date" v-if="qrytype==2">
                        <p :class="{'fontType1':item.appStatus!='3','fontType2':item.appStatus=='3'}">{{item.appStatusName}}</p>
                        <p>{{item.appDate ? getDateDIY(item.appDate)[0] + ' ' +getDateDIY(item.appDate)[1] : ''}}</p>
                    </div>
                </a>
            </div>

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
                lists : [],
                loadMoreFlag : false
            }
        },
        computed: {
          ...mapState({
            process: ({others}) => others.process
          })
        },
        activated() {
            //查看我要处理的审批
            this.getLeaderApprove();
        },
        mounted() {
            
        },

        methods: {

            //切换tab
            changeHandle(val) {
                this.lists = [];
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
                        return;
                    }else if(response.length > 0 && response.length < _this.size){
                        _this.loadMoreFlag = false;
                    }else if(response.length >= _this.size){
                        _this.begin += 1;
                        _this.loadMoreFlag = true;
                    }
                    this.lists = this.lists.concat(response);
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
            goTaskDetail(businessKeyId){
                var process = this.process;
                process.businessKeyId = businessKeyId;
                this.$store.dispatch('updataProcess', process);
                this.$router.push({ name: 'approProcess' })
            },
            //日期格式化
            getDateDIY(d){
                return util.getDateDIY(d);
            }
        }
    }
</script>
