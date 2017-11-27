<template>

    <div class="rejectTask pobo-main-index">

            <common-nav>
                <div slot="body">
                    <span>{{process.flag==1?'同意':'驳回'}}</span>
                </div>
            </common-nav>

            <div class="container fzj-zy-content">
                <div class="content">
                    <textarea :placeholder="'请填写'+ (process.flag==1?'同意':'驳回') +'意见'" v-model="message"></textarea>
                </div>
            </div>

            <div class="approSubmit">
                <button type="button" class="btn reject" @click="submit">提交</button>
            </div>

    </div>
  
</template>

<script>

    import {mapState} from 'vuex';
    import moment from "moment";
    import axios from 'axios';

    export default {

        data() {
            return {
                message : '',
                submitFlag : false
            }
        },
        computed: {
          ...mapState({
            process: ({others}) => others.process
          })
        },
        activated() {
            this.message = '';
            this.submitFlag = false;
        },
        mounted() {
            
        },
        methods: {

            //提交
            submit(){
                var _this = this;
                if(_this.submitFlag){ 
                  //防止重复提交
                  return; 
                }else if(_this.process.flag==2 && !_this.message){
                    _this.$toast('请输入驳回意见！');
                    return;
                }
                _this.submitFlag = true;
                //处理某个审批
                _this.dealApproval();
            },

            //处理某个审批
            dealApproval(){
                var _this = this;
                _this.$$axios({
                    restUrl: 'dealApproval',
                    join: [  _this.info.userId ],
                    options : {
                        'processId': _this.process.processId,
                        'businessKeyId':_this.process.businessKeyId,
                        'taskId':_this.process.taskId,
                        'flag':_this.process.flag,
                        'message': _this.message
                    },
                    loading : true
                })
                .then((response) => { 
                    
                    _this.$toast('提交成功！');
                    setTimeout(() => {
                        _this.submitFlag = false;
                        var process = {
                          businessKeyId : '',    //流程实例编号
                          processId : '',        //流程类型编号
                          taskId : '',           //任务编号
                          flag : '',             //1同意  2驳回
                          message : '',          //意见  
                          taskFlag : ''          //1待审批  2已审批 
                        }
                        _this.$store.dispatch('updataProcess', process);
                        // _this.$router.replace({ name: 'approTask' })
                        _this.$router.go(-2)
                    }, 3000)
                })
                .catch((res) => {
                    console.log('res', res);
                    _this.submitFlag = false;
                })
            }
            
        }
    }
</script>