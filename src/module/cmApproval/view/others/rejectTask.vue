<template>

    <div class="rejectTask pobo-main-index">

            <common-nav>
                <div slot="body">
                    <span>驳回</span>
                </div>
            </common-nav>

            <div class="container fzj-zy-content">
                <div class="content">
                    <textarea placeholder="请填写驳回意见"></textarea>
                </div>
            </div>

            <div class="approSubmit">
                <button type="button" class="btn reject">提交</button>
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
                
            }
        },
        computed: {
          ...mapState({
            process: ({others}) => others.process
          })
        },
        mounted() {
            
        },

        methods: {

            //处理某个审批
            dealApproval(){
                var _this = this;
                _this.$$axios({
                    restUrl: 'dealApproval',
                    join: [ 
                            [ _this.info.userId, 
                                ['processId', _this.process.processId],
                                ['businessKeyId',_this.process.businessKeyId],
                                ['taskId',_this.process.taskId],
                                ['flag',_this.process.flag],
                                ['message', _this.message]
                            ] 
                    ],
                    loading : true
                })
                .then((response) => { 
                    console.log(response);
                })
                .catch((res) => {
                    console.log('res', res);
                })
            }

        }
    }
</script>