<template>
  <div class="pbframe staffInfo pobo-main-index">
        <common-nav>
            <div slot="body">
                <span>员工资料</span>
            </div>
            <div slot="footer" @click="$router.push({ name: 'staffInfoSearch' })">
                <img src="../../images/others/img10.png"/>
            </div>
        </common-nav>

        <div class="av-dropdown-group">
                <div class="av-dropdown-selected">

                    <div class="av-selected-items" @click="goDepartPage">
                        <span class="selected-items-text">{{departName || '组织架构'}}</span>
                        <span class="down-dria"></span>
                    </div>

                    <!-- <div class="av-selected-items" :class="{'active':activeOption==2}" @click="activeOption=2">
                        <span class="selected-items-text">员工类型</span>
                        <span class="down-dria"></span>
                        <div class="split-line"></div>
                    </div>

                    <div class="filterArea" v-show="activeOption==2">
                        <div class="department">
                            <ul class="area">
                                <li>全中国</li>
                                <li>北京</li>
                                <li>天津</li>
                                <li class="active">上海</li>
                                <li>山西</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                            </ul>
                            <ul class="yingye">
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                            </ul>
                        </div>
                        <div class="filterAreaMask" @click="activeOption=0"></div>
                    </div> -->

                </div>
            </div>

        <div class="container fzj-zy-content" v-if="lists">

            <div class="pobo-no-data1" v-if="lists.length <= 0">
                <div class="text-center" >
                    <img src="../../images/others/img19.png"/>
                </div>
                <span>暂无数据</span>
            </div>

            <div class="content">
                <div class="group">
                    <a class="cell" v-for="item in lists" @click="goStaffDetailPage(item)">
                        <span class="cell-body">
                            <p>{{item.STAFF_NAM}}({{item.STAFF_ID}})</p>
                            <p>{{item.DEPARTMENT_NAM}}</p>
                        </span>
                    </a>
                </div>
            </div>

        </div>

    </div>
</template>
<script>

    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                //activeOption: 0,
                //showOptions: false
                lists : null,
                departId : '',
                departName : ''
            }
        },
        computed: {
            ...mapState({
                storeDepartId: ({others}) => others.departId,
                storeDepartName: ({others}) => others.departName
            })
        },
        activated() {
            this.departId = this.storeDepartId || '';
            this.departName = this.storeDepartName || '';
            this.getStaffList();
        },
        mounted() {

        },
        methods: {
            //查询员工列表
            getStaffList(){
                var _this = this;
                _this.$$axios({
                    restUrl: 'getStaffList',
                    join: [ [ _this.info.userId, ['departId', _this.departId] ] ],
                    loading : true
                })
                .then((response) => {
                    this.lists = response;
                })
                .catch((res) => {
                    console.log('res', res);
                })
            },
            //跳转去【部门列表】
            goDepartPage(){
                this.$store.dispatch('updataDepartPageReturn', 1);
                //this.$router.push({ name: 'businessDpt' })
                this.$router.replace({ name: 'businessDpt' })
            },
            //跳转去【员工基本信息】
            goStaffDetailPage(o){
                this.$store.dispatch('updataPersonnelId', o.STAFF_ID);
                this.$store.dispatch('updataPersonnelName', o.STAFF_NAM);
                this.$store.dispatch('updataDepartName', o.DEPARTMENT_NAM);
                this.$router.push({ name: 'staffInfoDetail' })
            }

        }
    }
</script>
