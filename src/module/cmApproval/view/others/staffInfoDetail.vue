<template>

    <div class="approProcess staffInfoF pobo-main-index">

        <div>
            <common-nav>
                <!-- <div slot="body">
                    <span>审批流程</span>
                </div> -->
            </common-nav>
        </div>

        <div class="container fzj-zy-content">

            <div class="group cusInfo" v-if="result">
                <a class="cell">
                    <span class="cell-body">
                        <div class="media flex-align-top">
                            <div class="media-object">
                                <img src="../../images/others/img05.png"/>
                            </div>
                            <div class="media-body">
                                <h3>{{result.STAFF_NAM}}</h3>
                                <p class="acc">员工代码&nbsp;&nbsp;{{personnelId}}</p>
                                <p>所属部门&nbsp;&nbsp;{{result.DEPARTMENT_NAM || ''}}</p>
                            </div>
                        </div>
                    </span>
                </a>
            </div>

            <div class="applyInfo" v-if="result">
                <p class="applyIitle">基本资料</p>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">电话号码</span>
                        <span class="cell-footer">{{result.MOBILE || ''}}</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">邮箱号码</span>
                        <span class="cell-footer" v-if="result.EMAIL">{{result.EMAIL=="-"?'':result.EMAIL}}</span>
                    </a>
                    <a class="cell">
                        <span class="cell-body color1">资格证号</span>
                        <span class="cell-footer color1">{{result.ICFQC=="-"?'':result.ICFQC}}</span>
                    </a>
                    <a class="cell accMana" @click="$router.push({name:'glancePer'})">
                        <img class="toDetail" src="../../images/others/img08.png"/>
                        <span class="cell-body color2">业绩情况</span>
                    </a>
                </div>
            </div>

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
                result : null
            }
        },
        computed: {
            ...mapState({
                personnelId: ({others}) => others.personnelId
                //departName: ({others}) => others.departName
            })
        },
        activated() {
            this.getStaffDetail();
        },
        mounted() {

        },

        methods: {

            //查询员工基本信息
            getStaffDetail() {
                var _this = this;
                _this.$$axios({
                    restUrl: 'getStaffDetail',
                    join: [ this.info.userId, _this.personnelId ],
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
            }

        }
    }
</script>
