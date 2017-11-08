<template>

    <div class="approProcess">

        <div>
            <common-nav>
                <div slot="body">
                    <span>审批流程</span>
                </div>
            </common-nav>
        </div>

        <div class="container">

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
                <p class="applyIitle">申请信息</p>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">申请内容</span>
                        <span class="cell-footer">保证金费率优惠申请</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">模板名称</span>
                        <span class="cell-footer">交易所-1.1倍</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">提交时间</span>
                        <span class="cell-footer">08-21 09:21</span>
                    </a>
                    <a class="cell accMana">
                        <span class="cell-body">客户经理</span>
                        <span class="cell-footer">王XX</span>
                    </a>
                </div>
            </div>

            <div class="applyInfo">
                <p class="applyIitle">备注内容</p>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body mark">备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备备注备注备注备注</span>
                    </a>
                </div>
            </div>

            <div class="enclosure">
                <p class="enclosureIitle">附件信息</p>
                <div class="group">
                    <a class="cell">
                        <img class="toDetail" src="../../images/followUpRecord/img08.png"/>
                        <span class="cell-body">
                            <img src="../../images/followUpRecord/img06.png"/>
                            图片 2012131351212211.jpg
                        </span>
                        <span class="cell-footer">235K</span>
                    </a>
                    <a class="cell">
                        <img class="toDetail" src="../../images/followUpRecord/img08.png"/>
                        <span class="cell-body">
                            <img src="../../images/followUpRecord/img07.png"/>《保证金费率优惠申请模板》.pdf</span>
                        <span class="cell-footer">23.23K</span>
                    </a>
                </div>
            </div>

        </div>

        <div class="approSubmit">
            <button type="button" class="btn reject">驳回</button>
            <button type="button" class="btn aggree">同意</button>
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
