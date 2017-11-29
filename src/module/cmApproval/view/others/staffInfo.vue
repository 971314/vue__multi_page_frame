<template>
  <div class="pbframe staffInfo pobo-main-index">
        <common-nav>
            <div slot="body">
                <span>{{departName}}员工</span>
            </div>
            <!-- <div slot="footer" @click="$router.push({ name: 'staffInfoSearch' })">
                <img src="../../images/others/img10.png"/>
            </div> -->
        </common-nav>

        <searchbar v-model="keyword">
            <searchbar-placeholder >
                <icon name="search" left size="lg"></icon>
                <span>搜索</span>
            </searchbar-placeholder>
            <searchbar-btn>
                <span>取消</span>
            </searchbar-btn>
        </searchbar>

        <div class="searchMask" v-show="searching" @click="searching=false"></div>
        <mask-layer :clickable="true" v-show="searching"/>

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

    import {mapState} from 'vuex';
    import util from '../../utils/util';

    export default {
        data() {
            return {
                //activeOption: 0,
                //showOptions: false
                keyword : '',
                lists : null,
                deptList : null,
                departId : '',
                departName : '',
                hasRequest : false,
                searching : false
            }
        },
        computed: {
            ...mapState({
                storeDepartId: ({others}) => others.departId,
                storeDepartName: ({others}) => others.departName
            })
        },
        activated() {
            this.keyword = '';
            this.hasRequest = false;
            this.departId = this.storeDepartId || '';
            this.departName = this.storeDepartName || '';
            this.getStaffList();
        },
        mounted() {

        },
        watch: {
          keyword: function (val, oldVal) {
            if (!val) {
              this.lists = util.deepClone(this.deptList);
              return;
            }
            var l = util.deepClone(this.deptList);
            var list = [];
            for(var i = 0 ; i < l.length ; i++){
                if( new RegExp(val).test(l[i].STAFF_NAM) || 
                    new RegExp(val.toUpperCase()).test(l[i].STAFF_NAM) || 
                    new RegExp(val).test(l[i].STAFF_ID) || 
                    new RegExp(val.toUpperCase()).test(l[i].STAFF_ID)){
                    list.push(l[i]);
                }
            }
            this.lists = list;
          }

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
                    this.deptList = response;
                    if(!this.hasRequest){
                        this.addEventListener();
                    }
                    this.hasRequest = true;
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
            },
            // closeSearch(){
            //     console.log('closeSearch');
            //     this.searching=false;
            // },
            addEventListener(){
                var _this = this;
                var s = document.querySelector('.searchbar');
                var d = document.querySelector('.searchbar-input');
                var b = document.querySelector('.searchbar-btn');
                d.addEventListener("click",function(){
                    _this.searching = true;
                    s.setAttribute("class","searchbar active");
                    
                });
                b.addEventListener("click",function(){
                    _this.searching = false;
                    _this.keyword = '';
                    s.setAttribute("class","searchbar");
                    
                });

            },

        }
    }
</script>
