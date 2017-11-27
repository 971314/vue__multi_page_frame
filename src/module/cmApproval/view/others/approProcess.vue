<template>

    <div class="approProcess pobo-main-index">

        <div>
            <common-nav>
                <div slot="body">
                    <span v-if="taskFlag==1">审批流程</span>
                    <span v-if="taskFlag==2">审批详情</span>
                </div>
            </common-nav>
        </div>

        <div class="container fzj-zy-content" v-if="result">

            <!-- <div class="enclosure margin1" v-if="taskFlag==2">
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">审批意见</span>
                        <span class="cell-footer access">{{result.appStatusName}}</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">审批时间</span>
                        <span class="cell-footer">XXX</span>
                    </a>
                </div>
            </div> -->

            <div class="applyInfo">
                <p class="applyIitle">发起人</p>
                <div class="group">
                    <a class="cell" @click="toStaffDetail">
                        <span class="cell-body">姓名</span>
                        <span class="cell-footer access">{{result.operatorName}}-{{result.operatorId}}</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">所属部门</span>
                        <span class="cell-footer">{{result.departName}}</span>
                    </a>
                </div>
            </div>

            <div class="applyInfo">
                <p class="applyIitle">申请人</p>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">姓名</span>
                        <span class="cell-footer">{{result.appObjectName}}</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">类型</span>
                        <span class="cell-footer">{{result.appobjectTypeName}}</span>
                    </a>
                </div>
            </div>

            <div class="applyInfo">
                <p class="applyIitle">申请项目</p>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">申请类型</span>
                        <span class="cell-footer">{{result.processName}}</span>
                    </a>
                    <a class="cell" :class="{'noTPL':result.tplName == '非模板'}">
                        <!-- <img v-if="result.tplName != '非模板'" class="toDetail" src="../../images/others/img08.png"/> -->
                        <span class="cell-body">模板名称</span>
                        <span class="cell-footer" :class="{'access':result.tplName != '非模板'}" @click="result.tplName != '非模板' ?iconClick(result.tplDesc):''">{{result.tplName}}</span>
                    </a>
                    <a class="cell" v-if="result.availBeginDate">
                        <span class="cell-body">申请期间</span>
                        <span class="cell-footer">
                            {{$$timeFormate({date: result.availBeginDate, format: 'Y-M-D'})}} 至 {{$$timeFormate({date: result.availEndDate,format:'Y-M-D'})}}
                        </span>
                    </a>
                    <!-- <a class="cell accMana">
                        <span class="cell-body">提交时间</span>
                        <span class="cell-footer">{{$$timeFormate({date: result.appDateTime, format: 'Y-M-D'})}} {{$$timeFormate({date: result.appDateTime,format:'h:m'})}}</span>
                    </a>
                    <a class="cell accMana">
                        <span class="cell-body">审批进程</span>
                        <span class="cell-footer">XXX</span>
                    </a> -->
                </div>
            </div>

            <div class="enclosure">
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">提交时间</span>
                        <span class="cell-footer">{{$$timeFormate({date: result.appDateTime, format: 'Y-M-D'})}} {{$$timeFormate({date: result.appDateTime,format:'h:m'})}}</span>
                    </a>
                    <a class="cell" v-if="taskFlag==2" @click="toApprovalDetail">
                        <span class="cell-body">审批进程</span>
                        <span class="cell-footer access">{{result.appStatusName}}</span>
                    </a>
                </div>
            </div>

            <div class="applyInfo" v-if="result.note">
                <p class="applyIitle">备注内容</p>
                <div class="group borderBottom0">
                    <a class="cell">
                        <span class="cell-body mark">{{result.note || ''}}</span>
                    </a>
                </div>
            </div>

            <div class="enclosure" v-if="result.attachs">
                <p class="enclosureIitle">附件信息</p>
                <div class="group">
                    <a class="cell canGO" v-for="i in result.attachs" @click="imgPreview(i.url)">
                        <img class="toDetail" src="../../images/others/img08.png"/>
                        <span class="cell-body">
                            <img src="../../images/others/img06.png"/>{{i.name}}
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

        <div class="approSubmit" v-if="result && taskFlag==1">
            <button type="button" class="btn reject" @click="toDealPage(2)">驳回</button>
            <button type="button" class="btn aggree" @click="toDealPage(1)">同意</button>
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
                result : null,
                taskFlag : ''
            }
        },
        computed: {
          ...mapState({
            process: ({others}) => others.process
          })
        },
        activated() {
            this.taskFlag = this.process.taskFlag
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
                this.$router.push({path:'/preview',query: {imgurl: imgUrl}})
            },
            //跳转到 处理审批 页面
            toDealPage(flag){
                var process = this.process;
                process.flag = flag;
                this.$store.dispatch('updataProcess', process);
                this.$router.push({ name: 'rejectTask' })
            },
            //模板介绍模态框
            iconClick (desc) {

                this.$alert({
                  maskClosable: true,
                  message: desc.replace(/【/g, '<br/>【'),
                  title: this.result.tplName
                })
            },
            //查看员工资料
            toStaffDetail(){
                this.$store.dispatch('updataPersonnelId', this.result.operatorId);
                this.$router.push({ name: 'staffInfoDetail' })
            },
            //查看审批历史
            toApprovalDetail(){
                var proHis = {
                  appStatusName : this.result.appStatusName,//审核状态
                  processName : this.result.processName,  //申请内容
                  appDateTime : this.result.appDateTime   //提交时间
                }
                this.$store.dispatch('updataProHis', proHis);
                this.$router.push({ name: 'approvalProcess' })
            }

        }
    }
</script>
