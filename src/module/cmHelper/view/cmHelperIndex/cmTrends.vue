<template>

    <div class="cmTrends pobo-customer-info">

        <div>
            <common-nav>
                <div slot="body">
                    <span>客户动态</span>
                </div>
                <div slot="footer">
                    <div class="picker-area">
                        <input class="date-picker" v-if="isIos" v-model="date" type="date" @blur = "changeDate()"/>
                        <input class="date-picker" v-if="!isIos" v-model="date" type="date" @change = "changeDate()"/>
                        <img class="calendar-icon" src="../../images/cmHelperIndex/img15.png"/>
                    </div>
                </div>
            </common-nav>
        </div>

        <div class="container customer-info-center">
            <div v-if="lists" class="no-data text-center">
                <div class="text-center" v-if="lists.length <= 0">
                    <img src="../../images/cmHelperIndex/img19.png"/>
                </div>
                暂无数据
            </div>
            <div class="cmTrendsGroup" v-for="(item, index) in lists">
                <div class="group-title setHeight">
                    <i>&nbsp;</i>
                    <strong v-if="item.MSGTIME==date">今天</strong>
                    <strong v-else-if="item.MSGTIME==yesToday">昨天</strong>
                    <strong v-else>{{item.MSGTIME}}</strong>
                </div>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">
                            <h3>{{item.INVESTOR_NAM}}<span>{{item.MSGTIME}}</span></h3>
                            {{item.REMINDMSG}}
                        </span>
                    </a>
                </div>
            </div>

        </div>

    </div>

  
</template>

<script>

    import moment from "moment";
    import axios from 'axios';
    import browser from '../../utils/browser';
    import util from '../../utils/util';

    export default {

        data() {
            return {
                pickerValue : '',
                lists : null,
                begin : 1,
                size : 10,
                date : util.getDate(),
                yesToday : util.addDate(null,-1),
                //客户端类型（ios || android）
                isIos : browser.versions.ios || browser.versions.iPhone || browser.versions.iPad
            }
        },
        activated(){
            this.getCusDynamic();
        },
        mounted() {
            
        },

        methods: {
            changeDate(){
                this.getCusDynamic();
            },
            //查询【客户动态】
            getCusDynamic(){
                var _this = this;
                _this.$$loading();

                var url = PBHttpServer.cmHelper.serverUrl + "investorMessages/info/"+ this.info.userId +"/?beginDate="+this.date+"&endDate="+this.date+"&begin="+ this.begin +"&size=" + this.size;
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
