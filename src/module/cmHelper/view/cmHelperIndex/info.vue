<template>
  <div class="cusInfo">
    <common-nav>
        <div slot="body">
            <span>客户资料</span>
        </div>
    </common-nav>

    <div class="container">
        <div class="cusList">
            <div>
                <a class="cusItem">
                    <div>姓名</div>
                    <div>{{cusInfo.INVESTOR_NAM}}</div></a>
            </div>
            <div>
                <a class="cusItem">
                    <div>营业部</div>
                    <div>{{cusInfo.DEPARTMENT_NAM}}</div></a>
            </div>
            <div>
                <a class="cusItem">
                    <div>资金账号</div>
                    <div></div></a>
            </div>
            <div>
                <a class="cusItem">
                    <div>性别</div>
                    <div v-if="cusInfo.SEX=='0'">未知</div>
                    <div v-if="cusInfo.SEX=='1'">男</div>
                    <div v-if="cusInfo.SEX=='2'">女</div>
                </a>
            </div>
            <div>
                <a class="cusItem">
                    <div>身份证号码</div>
                    <div>{{cusInfo.ID_NO}}</div></a>
            </div>
            <div>
                <a class="cusItem groupLast">
                    <div>出生日期</div>
                    <div>{{cusInfo.BIRTH_DT}}</div></a>
            </div>
            <div>
                <a class="cusItem type2">
                    <div>通讯地址</div>
                    <!-- <div>上海浦东新区陆家嘴软件园澎博财经咨询有限公司5号楼501</div> -->
                    <div>{{cusInfo.LINKADDR}}</div>
                    
                </a>
            </div>
            <div>
                <a class="cusItem">
                    <div>公司名称</div>
                    <div></div></a>
            </div>
            <div>
                <a class="cusItem">
                    <div>手机号码</div>
                    <div>{{cusInfo.MOBILE_NO}}</div></a>
            </div>
            <div>
                <a class="cusItem groupLast">
                    <div>固定电话</div>
                    <div>{{cusInfo.LINKTELEPHONE}}</div></a>
            </div>
            <div>
                <a class="cusItem">
                    <div>客户来源</div>
                    <div>{{cusInfo.BROKER_NAM}}</div></a>
            </div>
            <div>
                <a class="cusItem groupLast">
                    <div>客户类型</div>
                    <div>{{cusInfo.INVESTOR_TYP}}</div></a>
            </div>
        </div>
        <div class="remarks">
            <textarea placeholder="备注" rows="3"></textarea>
        </div>
    </div>

  </div>
</template>

<script>
    export default {
        data() {
            return {
                cusInfo : {}
            }
        },
        mounted() {
            this.getCusInfo();
        },
        methods: {

            //获取【客户资料】
            getCusInfo() {
                var _this = this;
                var userId = 'test11';
                var investorId = this.$route.params.id;
                var url = PBHttpServer.apply.serverUrl + 'investor/base/'+userId+'/'+investorId;
                this.$axios.get(url, null).then(function(result) {
                    _this.cusInfo = result.data.data[0];
                }).
                catch(function(err) {
                    console.log('服务器异常', err)
                });
            }

        }

    }
</script>
