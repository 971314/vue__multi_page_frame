<template>

    <div class="cmHelperIndex">

        <div class="headerArea">
            <common-nav>
                <div slot="body">
                    <span>展业</span>
                </div>
                <div class="mine" slot="footer">
                    <img src="../images/img03.png"/>
                </div>
            </common-nav>
        </div>

        <div class="container">
            <div class="myAttention">
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">
                            <div class="media flex-align-top">
                                <div class="media-object">
                                    <i>14</i>
                                    <img src="../images/img01.png">
                                </div>
                                <div class="media-body">
                                    <h3>我的关注<span>09:10</span></h3>
                                    <p>李某某 股票期权股票期权股票期权股票期权股票期权</p>
                                </div>
                            </div>
                        </span>
                    </a>
                </div>
            </div>

            <div class="main-header-title bg-fff mt-15">
              <more-header :leftTitle="'客户管理'" :toWhere="''"></more-header>
            </div>

            <div class="flex row">
                <func-nav :title="'我的客户'" :subTitle="'管理留存客户'" :icon="'./images/img04.png'"></func-nav>
                <func-nav :title="'新增潜在客户'" :subTitle="'快捷添加联系人'" :icon="'./images/img05.png'" :className="['br0']"></func-nav>
            </div>

            <div class="flex row">
                <func-nav :title="'开户进度'" :subTitle="'新客开户一目'" :icon="'./images/img06.png'"></func-nav>
                <func-nav :title="'跟进记录'" :subTitle="'持续记录与客户'" :icon="'./images/img07.png'" :className="['br0']"></func-nav>
            </div>

            <div class="flex row">
                <func-nav :title="'权益排行榜'" :subTitle="'快捷添加联系人'" :icon="'./images/img08.png'" :className="['bb0']"></func-nav>
                <div class="flex-item bg-fff">&nbsp;</div>
            </div>

            <div class="main-header-title bg-fff mt-15">
              <more-header :leftTitle="'业务管理'" :toWhere="''"></more-header>
            </div>

            <div class="flex row">
                <func-nav :title="'快速申请'" :subTitle="'业务申请一键达'" :icon="'./images/img09.png'" :className="['bb0']"></func-nav>
                <func-nav :title="'审批进程'" :subTitle="'随时链接业务'" :icon="'./images/img10.png'" :className="['bb0','br0']"></func-nav>
            </div>

            <div class="main-header-title bg-fff mt-15">
              <more-header :leftTitle="'客户动态'" :toWhere="'pobo:uncheck=1&pageId=900005&url=cmHelperIndex/index.html#/cmTrends'"></more-header>
            </div>

            <div class="cusTrends">
                <div class="group">
                    <a class="cell">
                        <span class="cell-body"><i>&nbsp;</i>李某某 开户完成</span>
                        <div class="cell-footer">
                            <span>9:10</span>
                        </div>
                    </a>
                    <a class="cell">
                        <span class="cell-body"><i>&nbsp;</i>何某某 今天生日</span>
                        <div class="cell-footer">
                            <span>9:10</span>
                        </div>
                    </a>
                    <a class="cell">
                        <span class="cell-body"><i>&nbsp;</i>何某某 保证金优惠申请驳回</span>
                        <div class="cell-footer">
                            <span>9:10</span>
                        </div>
                    </a>
                </div>
            </div>

            <div class="main-header-title bg-fff mt-15">
              <more-header :leftTitle="'公司公告'" :toWhere="'pobo:uncheck=1&pageId=900005&url=indNews/index.html#/firm?infoId=001'"></more-header>
            </div>

            <div class="cusTrends company">
                <div class="group">
                    <a class="cell" v-for="c in comNewsList" :href="'pobo:uncheck=1&pageId=900005&url=indNews/index.html?#/details?type=2&info=' + c.infoId">
                        <span class="cell-body">{{c.infoTitle}}</span>
                    </a>
                </div>
            </div>

            <div class="bottom-tips text-center">我到底了哦~</div>

        </div>

    </div>

  
    
</template>

<script>

    import moment from "moment";
    import axios from 'axios';
    import browser from '../common/browser';
    import MoreHeader from '../../main/components/moreHeader.vue';
    import FuncNav from '../components/funcNav.vue';
    import util from '../common/util';

    export default {

        components:{
            MoreHeader,
            FuncNav
        },

        data() {
            return {
                //公司公告【数据列表】
                comNewsList : []
            }
        },

        mounted() {
            this.getCompanyNotice();
        },

        methods: {

            //查询【客户动态】
            getCusAc(){
                var params = {
                    "func":"12850",
                    "data":[{
                        "cmUserId":"0",
                        "begindate":util.getDate(),
                        "endDate":util.getDate(),
                        "begin":"1",
                        "size":"3"
                    }]
                };
                this.$axios.$get(url,params).then(function(res){

                }).catch(function(err){
                    console.log(err);
                })
            },

            //获取【公司公告】
            getCompanyNotice() {
                var _this = this;
                var params = {
                    "func":"10101",
                    "data": [{
                        "infoType": "001",
                        "currentPage":"1",
                        "pageSize":3
                    }]
                };
                var url = PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0';
                _this.$axios.post(url, params).then(function (result) {
                    var CONTENTS = result.data.data;
                    _this.comNewsList = CONTENTS;
                }).catch(function (err) {
                    console.log('服务器异常', err)
                });
            }

        }
    }
</script>
