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
            
            <div class="group">
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>手机号码变更申请完成</span></h3>
                        <h3><img src="../../images/cmHelperIndex/img14.png" v-for="s in starLevel"/><span>13:23</span></h3>
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>今天生日</span></h3>
                        <h3><img src="../../images/cmHelperIndex/img14.png" v-for="s in starLevel"/><span>13:23</span></h3>
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>手机号码变更申请完成</span></h3>
                        <h3><img src="../../images/cmHelperIndex/img14.png" v-for="s in starLevel"/><span>13:23</span></h3>
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>今天生日</span></h3>
                        <h3><img src="../../images/cmHelperIndex/img14.png" v-for="s in starLevel"/><span>13:23</span></h3>
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
                starLevel : ['','','','','']
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

                var url = PBHttpServer.cmHelper.serverUrl + "dailyInvestorMessage/info/" + this.userId;

                _this.$axios.get(url,{headers:{id:this.info.token}}, null).then(function (result) {
                  _this.$$loaded();
                }).catch(function (err) {
                  console.log('服务器异常', err)
                });
            }
        }
    }
</script>
