<template>

    <div class="approProcess staffInfoF pobo-customer-info">

        <div>
            <common-nav>
                <!-- <div slot="body">
                    <span>审批流程</span>
                </div> -->
            </common-nav>
        </div>

        <div class="container customer-info-center">

            <div class="group cusInfo">
                <a class="cell">
                    <span class="cell-body">
                        <div class="media flex-align-top">
                            <div class="media-object">
                                <img src="../../images/followUpRecord/img05.png"/>
                            </div>
                            <div class="media-body">
                                <h3>张三</h3>
                                <p class="acc">资金账号 0921152103</p>
                                <p>营业部门 上海总部</p>
                            </div>
                        </div>
                    </span>
                </a>
            </div>

            <div class="applyInfo">
                <p class="applyIitle">基本资料</p>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">电话号码</span>
                        <span class="cell-footer">15003636363</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">性别</span>
                        <span class="cell-footer">女</span>
                    </a>
                    <a class="cell mailNo">
                        <span class="cell-body">邮箱号码</span>
                        <span class="cell-footer">986523@qq.com</span>
                    </a>
                    <a class="cell accMana">
                        <span class="cell-body color1">从业资格号</span>
                        <span class="cell-footer color1">F0622366</span>
                    </a>
                    <a class="cell accMana mt20">
                        <img class="toDetail" src="../../images/followUpRecord/img08.png"/>
                        <span class="cell-body color2">业绩情况</span>
                    </a>
                    <a class="cell accMana mt20">
                        <img class="toDetail" src="../../images/followUpRecord/img08.png"/>
                        <span class="cell-body color2">详细资料</span>
                    </a>
                </div>
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
                
            }
        },

        mounted() {
            
        },

        methods: {

            //切换tab
            changeHandle(val) {

            }

        }
    }
</script>
