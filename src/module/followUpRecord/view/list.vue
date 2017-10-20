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
                showBase : false
            }
        },

        mounted() {
            
        },

        methods: {

            //切换tab
            changeHandle(val) {

            },

            goToAddPage(type){
                this.$router.push({path:'/addAndEdit'});
            }

        }
    }
</script>
