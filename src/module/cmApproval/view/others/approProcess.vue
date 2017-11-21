<template>

    <div class="approProcess pobo-main-index">

        <div>
            <common-nav>
                <div slot="body">
                    <span>审批流程</span>
                </div>
            </common-nav>
        </div>

        <div class="container fzj-zy-content" v-if="result">

            <div class="group cusInfo">
                <a class="cell">
                    <span class="cell-body">
                        <div class="media flex-align-top">
                            <div class="media-object">
                                <img src="../../images/others/img05.png"/>
                            </div>
                            <div class="media-body">
                                <h3>{{result.appObjectName || ''}}</h3>
                                <p class="acc">资金账号 {{result.operatorId || ''}}</p>
                                <p>营业部门 {{result.departName || ''}}</p>
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
                        <span class="cell-footer">{{result.processName || ''}}</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">模板名称</span>
                        <span class="cell-footer">{{result.tplName || ''}}</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">提交时间</span>
                        <span class="cell-footer">{{result.appDateTime ? getDateDIY(result.appDateTime)[0]+' '+getDateDIY(result.appDateTime)[1] : ''}}</span>
                    </a>
                    <a class="cell accMana">
                        <span class="cell-body">客户经理</span>
                        <span class="cell-footer">{{result.operatorName || ''}}</span>
                    </a>
                </div>
            </div>

            <div class="applyInfo">
                <p class="applyIitle">备注内容</p>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body mark">{{result.note || ''}}</span>
                    </a>
                </div>
            </div>

            <div class="enclosure">
                <p class="enclosureIitle">附件信息</p>
                <div class="group">
                    <a class="cell" v-for="i in result.attachs" @click="imgPreview(i.url)">
                        <img class="toDetail" src="../../images/others/img08.png"/>
                        <span class="cell-body">
                            <img src="../../images/others/img06.png"/>
                            图片 {{i.name}}
                        </span>
                        <span class="cell-footer">{{i.size}}</span>
                    </a>
                    <!-- <a class="cell">
                        <img class="toDetail" src="../../images/others/img08.png"/>
                        <span class="cell-body">
                            <img src="../../images/others/img07.png"/>《保证金费率优惠申请模板》.pdf</span>
                        <span class="cell-footer">23.23K</span>
                    </a> -->
                </div>
            </div>

        </div>

        <div class="approSubmit" v-if="result">
            <button type="button" class="btn reject">驳回</button>
            <button type="button" class="btn aggree">同意</button>
        </div>

    </div>

  
</template>

<script>

    import {mapState} from 'vuex';
    import moment from "moment";
    import axios from 'axios';
    import util from '../../utils/util';

    export default {

        data() {
            return {
                result : null
            }
        },
        computed: {
          ...mapState({
            process: ({others}) => others.process
          })
        },
        activated() {
            this.getAccountApprove();
        },
        mounted() {
            
        },

        methods: {

            //查看任务详情
            getAccountApprove(){
                var _this = this;
                _this.$$axios({
                    restUrl: 'accountApproveDetail',
                    join: [ this.info.userId, _this.process.businessKeyId ],
                    loading : true
                })
                .then((response) => { 
                    if(response.length > 0){
                        _this.result = response[0];
                    }
                })
                .catch((res) => {
                    console.log('res', res);
                })
            },
            //日期格式化
            getDateDIY(d){
                return util.getDateDIY(d);
            },
            //图片预览
            imgPreview(url){
                var imgUrl = PBHttpServer.cmApproval.serverUrl + 'attachImages/' + this.info.userId + '/' + url;
                console.log(imgUrl);
                this.$router.push({path:'/preview',query: {imgurl: imgUrl}})
            }
            

        }
    }
</script>
