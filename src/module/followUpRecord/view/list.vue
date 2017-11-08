<template>

    <div class="cmTrends recordList">

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

        <div class="container">
            

            <tabbar class="no-margin" @change="changeHandle">
                <tabbar-item>已开户</tabbar-item>
                <tabbar-item>未开户</tabbar-item>
            </tabbar>

            <div class="group-title">
                <i>&nbsp;</i><strong>今天</strong>
            </div>
            <div class="group">
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX</h3>
                        <h3>收集手续费费率优惠申请所需资料</h3>
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX</h3>
                        <h3>收集手续费费率优惠申请所需资料</h3>
                    </span>
                </a>
            </div>

            <div class="group-title">
                <i>&nbsp;</i><strong>2017/11/09</strong>
            </div>
            <div class="group">
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX</h3>
                        <h3>收集手续费费率优惠申请所需资料</h3>
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX</h3>
                        <h3>收集手续费费率优惠申请所需资料</h3>
                    </span>
                </a>
            </div>

        </div>

        <slideup v-model="showBase">
            <div class="topArea">
                <div class="suItem text-center" @click="goToAddPage(0)">
                    已开户
                </div>
                <div class="suItem text-center" @click="goToAddPage(1)">
                    未开户
                </div>
            </div>
            <div class="suItem cancelAdd text-center" @click="showBase = false">
                取消
            </div>
        </slideup>

    </div>

  
</template>

<script>

    import moment from "moment";
    import axios from 'axios';
    import browser from '../common/browser';

    export default {

        data() {
            return {
                showBase : false,
                userId : "sysadmin"
            }
        },

        mounted() {
            this.getList("investorFollow/list/" + this.userId + "?begin=1&size=10");
        },

        methods: {

            //切换tab
            changeHandle(val) {
                if(val==0){
                   this.getList("investorFollow/list/" + this.userId + "?begin=1&size=10"); 
                }else{
                   this.getList("pInvestorFollow/list/" + this.userId + "?begin=1&size=10"); 
                }
            },
            //跳转去【新增|编辑】跟进记录 页面
            goToAddPage(type){
                this.$router.push({path:'/addAndEdit'});
            },
            //查询跟进记录
            getList(urlSuffix){
                this.$axios.get(PBHttpServer.apply.serverUrl + urlSuffix, null).then(function(result) {
                    console.log(result);
                }).
                catch(function(err) {
                    console.log('服务器异常', err)
                });
            }

        }
    }
</script>
