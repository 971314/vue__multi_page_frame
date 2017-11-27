<template>
    <div class="customerInfo businessDpt pobo-main-index">
        <common-nav>
            <div slot="body">{{pageTitle || '组织架构'}}</div>
        </common-nav>
        <!-- <div class="flex filterOption">
            <div class="flex-item" :class="{'active':activeOption==1}" @click="activeOption=1"><span>A-F</span></div>
            <div class="flex-item" :class="{'active':activeOption==2}" @click="activeOption=2"><span>G-L</span></div>
            <div class="flex-item" :class="{'active':activeOption==3}" @click="activeOption=3"><span>M-R</span></div>
            <div class="flex-item" :class="{'active':activeOption==4}" @click="activeOption=4"><span>S-X</span></div>
            <div class="flex-item" :class="{'active':activeOption==5}" @click="activeOption=5"><span>Y-Z/#</span></div>
        </div> -->
        <searchbar v-model="keyword">
            <searchbar-placeholder >
                <icon name="search" left size="lg"></icon>
                <span>搜索</span>
            </searchbar-placeholder>
            <searchbar-btn>
                <span>取消</span>
            </searchbar-btn>
        </searchbar>
        <div class="container fzj-zy-content">
            <index-list v-if="currentList.length>0">
                <index-section v-for="(v, i) in currentList" :key="i" :index="v.pinyin">
                    <div class="oneLevel">
                        <!-- <div class="capitalPinyin">A</div> -->
                        <div class="group">
                            <a class="cell" v-for="(item, index) in v.data" :key="index" @click="goReturn(item)">
                                <span class="cell-body">{{item.DEPARTMENT_NAM}}</span>
                                <div class="cell-footer">
                                    <img src="../../images/others/img03.png"/>
                                </div>
                            </a>
                        </div>
                    </div>
                </index-section>
            </index-list>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import {IndexList, IndexSection} from 'mint-ui';
    import util from '../../utils/util';

    export default {
        components: {
          IndexList,
          IndexSection
        },
        data() {
            return {
                //activeOption : 1,
                currentList: [],
                deptJson: [],
                keyword : '',
                departIdArr : [],//当前部门层级，的查询id
                hasNext : false,
                pageTitle : ''
            }
        },
        computed: {
            ...mapState({
                departPageReturn: ({others}) => others.departPageReturn
            })
        },
        activated() {
            this.departIdArr = [];
            this.departIdArr.push(this.info.departId);
            this.currentList = [];
            this.deptJson = [];
            this.keyword = '';
            this.pageTitle = '';
            this.getBusinessDpt();
        },
        mounted() {

        },
        beforeRouteLeave(to, from, next) {
          if(this.departIdArr.length == 1){
            next()
          }else if(this.departIdArr.length != 1 || !this.hasNext){
            if(to=="staffInfo" || to=="departmentDetail"){
                next()
            }else{
                console.log('!this.hasNext');
                this.departIdArr = this.departIdArr.splice(-1);
                this.getBusinessDpt();    
            }
          }else{
            console.log('beforeRouteLeave else');
            this.departIdArr = this.departIdArr.splice(-1);
            this.getBusinessDpt();
          }
        },
        watch: {
          keyword: function (val, oldVal) {
            if (!val) {
              this.currentList = util.deepClone(this.deptJson);
              return;
            }

            var tempList = util.deepClone(this.deptJson);

            for (var i = 0; i < tempList.length; i++) {
              tempList[i].data = tempList[i].data.filter(function(temp){
                return new RegExp(val).test(temp.DEPARTMENT_NAM) || 
                       new RegExp(val.toUpperCase()).test(temp.DEPARTMENT_NAM)
              })
            }
            tempList = tempList.filter(function(item){
              return item.data.length > 0
            })
            this.currentList = tempList;
          }

        },
        methods: {
            //查询部门列表
            getBusinessDpt(){
                var _this = this;
                var id = _this.departIdArr[_this.departIdArr.length-1];
                _this.$$axios({
                    restUrl: 'getDepartList',
                    join: [ [ _this.info.userId, ['departId', id ] ] ],
                    loading : true
                })
                .then((response) => { 
                    
                    if(!response){ return; }
                    var l = util.sortGroupDIY(response);
                    console.log(l);
                    this.deptJson = l;
                    this.currentList = l;
                    //有下级 部门
                    if(l.length > 1 || l[0].data.length > 1){
                        this.hasNext = true;
                    }else{
                        this.hasNext = false;
                    }
                    // console.log(this.hasNext);
                    this.addEventListener();
                })
                .catch((res) => {
                    console.log('res', res);
                })
            },
            //点击列表
            goReturn(o){
                //有下级部门，继续查询 下级部门
                console.log(this.hasNext);
                if(this.hasNext){
                    this.pageTitle = o.DEPARTMENT_NAM;
                    this.departIdArr.push(o.DEPARTMENT_ID);
                    this.getBusinessDpt();
                }else{
                //没有下级部门，跳转
                    this.$store.dispatch('updataDepartId', o.DEPARTMENT_ID);
                    this.$store.dispatch('updataDepartName', o.DEPARTMENT_NAM);
                    if(this.departPageReturn==1){
                        //跳转【员工列表】页面
                        this.$router.replace({ name: 'staffInfo' })
                    }else{
                        //跳转【营业部详情】页面
                        this.$router.push({ name: 'departmentDetail' })
                    }
                }
                
            },
            addEventListener(){
                var s = document.querySelector('.searchbar');
                var d = document.querySelector('.searchbar-input');
                var b = document.querySelector('.searchbar-btn');
                d.addEventListener("click",function(){
                    s.setAttribute("class","searchbar active");
                });
                b.addEventListener("click",function(){
                    s.setAttribute("class","searchbar");
                });
                // window.addEventListener("popstate", function(e) { 
                //     e.preventDefault();
                //     history.pushState(null, null,  location.href);
                //     console.log("我监听到了浏览器的返回按钮事件啦");
                    
                // }, false);
            }

        }
    }
</script>
