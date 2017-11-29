<template>

  <div class="cmHelperIndex pobo-customer-info">

    <div class="headerArea">
      <common-nav>
        <div slot="body">
          <span>展业</span>
        </div>
        <div class="mine" slot="footer" @click="goToperance" style="font-size: 15px">
          <!--<img src="../../images/cmHelperIndex/img03.png"/>-->
          个人业绩
        </div>
      </common-nav>
    </div>

    <div class="container customer-info-center">
      <div class="myAttention">
        <div class="group">
          <a class="cell" @click="goToAttention">
                        <span class="cell-body">
                            <div class="media flex-align-top">
                                <div class="media-object">
                                    <!-- <i>14</i> -->
                                    <img src="../../images/cmHelperIndex/img01.png">
                                </div>
                                <div class="media-body">
                                    <h3>今日关注（{{lists.length}}）<span v-if="lists.length > 0">{{lists[0].MSGTIME || ''}}</span></h3>
                                    <p v-if="lists.length > 0">{{lists[0].INVESTOR_NAM || ''}} {{lists[0].REALMSG || ''}} </p>
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
        <func-nav :title="'我的客户'" :subTitle="'管理客户信息'" :icon="'./images/cmHelperIndex/img04.png'"
                  toWhere="customerInfoList" :jumpType="1"></func-nav>
        <func-nav :title="'新增未开户'" :subTitle="'一键添加联系人'" :icon="'./images/cmHelperIndex/img05.png'"
                  toWhere="potentialCustomerAdd" :className="['br0']"></func-nav>
      </div>

      <div class="flex row">
        <func-nav :title="'开户进度'" :subTitle="'新客开户即刻看'" :icon="'./images/cmHelperIndex/img06.png'"
                  toWhere="schedule"></func-nav>
        <func-nav :title="'跟进记录'" :subTitle="'常与客户多沟通'" :icon="'./images/cmHelperIndex/img07.png'" toWhere="list"
                  :className="['br0']"></func-nav>
      </div>

      <div class="flex row">
        <func-nav :title="'权益排行榜'" :subTitle="'查看优质客户'" :icon="'./images/cmHelperIndex/img08.png'"
                  toWhere="equityRanking" :className="['bb0']"></func-nav>
        <div class="flex-item bg-fff">&nbsp;</div>
      </div>

      <div class="main-header-title bg-fff mt-15">
        <more-header :leftTitle="'业务管理'" :toWhere="''"></more-header>
      </div>

      <div class="flex row">
        <func-nav :title="'快速申请'" :subTitle="'业务申请一键达'" toWhere="applyFast" :icon="'./images/cmHelperIndex/img09.png'"
                  :className="['bb0']"></func-nav>
        <func-nav :title="'审批进程'" :subTitle="'申请进度随时看'" toWhere="approvalIndex"
                  :icon="'./images/cmHelperIndex/img10.png'" :className="['bb0','br0']"></func-nav>
      </div>

      <div class="main-header-title bg-fff mt-15">
        <more-header :leftTitle="'客户动态'"
                     :toWhere="'pobo:uncheck=1&pageId=900005&url=cmHelper/index.html#/cmTrends'"></more-header>
      </div>

      <div class="cusTrends">
        <div class="cusTrendsNOdata" v-if="lists.length <= 0">暂无数据</div>
        <div class="group" @click="goToCmTrends()">
          <a class="cell" v-for="item in lists">
            <span class="cell-body"><i>&nbsp;</i>{{item.INVESTOR_NAM
}} {{item.REALMSG}}</span>
            <div class="cell-footer">
              <span>{{item.MSGTIME}}</span>
            </div>
          </a>
          
        </div>
      </div>

      <div v-if="false" class="main-header-title bg-fff mt-15">
        <more-header :leftTitle="'公司公告'"
                     :toWhere="'pobo:uncheck=1&pageId=900005&url=indNews/index.html#/firm?infoId=001'"></more-header>
      </div>

      <div v-if="false" class="cusTrends company">
        <div class="group">
          <a class="cell" v-for="c in comNewsList"
             :href="'pobo:uncheck=1&pageId=900005&url=indNews/index.html?#/details?type=2&info=' + c.infoId">
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
  import MoreHeader from '../../../main/components/moreHeader.vue';
  import FuncNav from '../../components/funcNav.vue';
  import util from '../../utils/util';

  export default {

    components: {
      MoreHeader,
      FuncNav
    },

    data() {
      return {
        //公司公告【数据列表】
        comNewsList: [],
        lists : []
      }
    },
    activated() {

    },
    mounted() {
      //document.querySelector('body').setAttribute('style', '-webkit-overflow-scrolling: auto')
      this.getCompanyNotice();
      this.getCusMessages();
      this.getDailyInvestorMessage();
    },

    methods: {
      goToperance() {
        this.$router.push({
          name: 'performanceCenter'
        })
      },
      goToAttention() {
          this.$router.push({
            name: 'myAttention'
          })
      },

      //获取【公司公告】
      getCompanyNotice() {
        var _this = this;
        var params = {
          "func": "10101",
          "data": [{
            "infoType": "001",
            "currentPage": "1",
            "pageSize": 3
          }]
        };
        var url = PBHttpServer.indNews.serverUrl + 'pobo_info_app/1_0';
        _this.$axios.post(url, params).then(function (result) {
          var CONTENTS = result.data.data;
          _this.comNewsList = CONTENTS;
        }).catch(function (err) {
          console.log('服务器异常', err)
        });
      },
      //查询【客户动态】
      getCusMessages(){
        // var url = PBHttpServer.cmHelper.serverUrl + 'investorMessages/info/' + this.info.userId + '?beginDate=' + util.getDate() + '&endDate=' + util.getDate() + '&begin=1&size=3';
        var url = PBHttpServer.cmHelper.serverUrl + 'investorMessages/info/' + this.info.userId + '?beginDate=2017-10-10&endDate=2017-10-10&begin=1&size=3';
        this.$axios.get(url,{headers:{id:this.info.token}}, null).then(function (result) {
          console.log(result);
        }).catch(function (err) {
          console.log('服务器异常', err)
        });
      },

      //跳转【客户动态页面】
      goToCmTrends(){
        window.location.href = "pobo:uncheck=1&pageId=900005&url=cmHelper/index.html#/cmTrends";
      },
      //查询【今日关注】
      getDailyInvestorMessage(){
          var _this = this;
          _this.$$loading();

          var url = PBHttpServer.cmHelper.serverUrl + "dailyInvestorMessage/info/" + this.info.userId;

          _this.$axios.get(url,{headers:{id:this.info.token}}, null).then(function (result) {
            _this.$$loaded();
            _this.lists = result.data.data;
          }).catch(function (err) {
            console.log('服务器异常', err)
          });
      }

    }
  }
</script>
