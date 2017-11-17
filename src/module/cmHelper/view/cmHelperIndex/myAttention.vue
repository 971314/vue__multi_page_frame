<template>

    <div class="cmTrends myAttention pobo-customer-info">

        <div>
            <common-nav>
                <div slot="body">
                    <span>今日关注</span>
                </div>
            </common-nav>
        </div>

        <div class="container customer-info-center">
            <div v-if="lists"><div class="text-center" v-if="lists.length <= 0" style="padding:10px 0;">无数据</div></div>
            <div class="group">
                <a class="cell" v-for="(item, index) in lists">
                    <span class="cell-body">
                        <h3>{{item.INVESTOR_NAM}}<span>{{item.REALMSG}}</span></h3>
                        <h3><img src="../../images/cmHelperIndex/img14.png" v-for="s in starLevel"/><span>{{item.MSGTIME}}</span></h3>
                    </span>
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
                starLevel : ['','','','',''],
                lists : null
            }
        },
        activated() {
            this.getDailyInvestorMessage();
        },
        mounted() {
            
        },

        methods: {
            //我的关注
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
