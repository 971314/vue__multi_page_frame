<template>

    <div class="cmTrends approTask pobo-customer-info">

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

        <div class="container customer-info-center">
            

            

            <div class="group">
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX</h3>
                        <h3>保证金费率优惠申请</h3>
                    </span>
                    <div class="date">
                        <p>09-12</p>
                        <p>13:22</p>
                    </div>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX</h3>
                        <h3>保证金费率优惠申请</h3>
                    </span>
                    <div class="date">
                        <p>09-12</p>
                        <p>13:22</p>
                    </div>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX</h3>
                        <h3>保证金费率优惠申请</h3>
                    </span>
                    <div class="date">
                        <p>09-12</p>
                        <p>13:22</p>
                    </div>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX</h3>
                        <h3>保证金费率优惠申请</h3>
                    </span>
                    <div class="date">
                        <p>09-12</p>
                        <p>13:22</p>
                    </div>
                </a>
            </div>

        </div>

    </div>

  
</template>

<script>

    import moment from "moment";
    import axios from 'axios';

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
