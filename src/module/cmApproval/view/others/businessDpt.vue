<template>
    <div class="customerInfo businessDpt pobo-main-index">
        <common-nav>
            <div slot="body">
                {{pageTitle[pageTitle.length-1] || ''}}
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
                pageTitle : ['营业部'],
                hasRequest : false,
                searching : false
            }
        },
        computed: {
            ...mapState({
                departPageReturn: ({others}) => others.departPageReturn,
                storeDepartIdArr: ({others}) => others.departIdArr,
                storePageTitle: ({others}) => others.pageTitle
            })
        },
        activated() {
            var _this = this;
            //this.departIdArr = storeDepartIdArr;
            //this.pageTitle = storePageTitle;
            this.hasRequest = false;
            if(this.departIdArr.length==0){
                this.departIdArr.push(this.info.departId);
            }
            this.currentList = [];
            this.deptJson = [];
            this.keyword = '';
            
            this.getBusinessDpt();

            history.pushState(null, null, location.href)
            window.addEventListener("popstate", _this.pushStateListen, false);    
        },
        mounted() {

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
                    join: [ [ _this.info.userId, ['departId', id+"" ] ] ],
                    loading : true
                })
                .then((response) => { 
                    
                    if(!response){ return; }
                    var l = util.sortGroupDIY(response);
                    
                    //过滤掉 接口返回的 重复部门
                    if( (l.length ==1 && (l[0].data).length>1 ) || l.length > 1){
                        var id = _this.departIdArr[_this.departIdArr.length-1];
                        for (var i = 0; i < l.length; i++) {
                            var tempList = l[i].data;
                            for (var j = 0; j < tempList.length; j++) {
                                if(tempList[j].DEPARTMENT_ID == id){
                                    tempList.splice(j,1);
                                    console.log(l);
                                }
                            }
                            if(tempList.length ==0){
                               l.splice(i,1);
                            }
                        }
                    }

                    this.deptJson = l;
                    this.currentList = l;
                    //有下级 部门
                    if(l.length > 1 || l[0].data.length > 1){
                        this.hasNext = true;
                    }else{
                        this.hasNext = false;
                    }
                    if(!this.hasRequest){
                        this.addEventListener();
                    }
                    this.hasRequest = true;
                })
                .catch((res) => {
                    console.log('res', res);
                })
            },
            //点击列表
            goReturn(o){
                
                var _this = this;
                var id = _this.departIdArr[_this.departIdArr.length-1];
                if(o.DEPARTMENT_ID==id && _this.currentList.length > 1){ return; }
                //有下级部门，继续查询 下级部门
                if(this.hasNext){
                    this.departIdArr.push(o.DEPARTMENT_ID);
                    this.pageTitle.push(o.DEPARTMENT_NAM);
                    var departIdArr2 = this.departIdArr;
                    var pageTitleArr = this.pageTitle;
                    this.$store.dispatch('updatadePartIdArr', departIdArr2);
                    this.$store.dispatch('updataPageTitle', pageTitleArr);
                    this.getBusinessDpt();
                }else{
                    //没有下级部门，跳转
                    window.removeEventListener("popstate", this.pushStateListen, false);
                    this.$store.dispatch('updataDepartId', o.DEPARTMENT_ID);
                    this.$store.dispatch('updataDepartName', o.DEPARTMENT_NAM);
                    if(this.departPageReturn==1){
                        //跳转【员工列表】页面
                        //this.$router.push({ name: 'staffInfo' })
                        this.$router.replace({ name: 'staffInfo' })
                    }else{
                        //跳转【营业部详情】页面
                        //this.$router.push({ name: 'departmentDetail' })
                        this.$router.replace({ name: 'departmentDetail' })
                    }
                }
                
            },
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
            pushStateListen(e){
                var _this = this;
                if(_this.departIdArr.length <= 1){
                    window.removeEventListener("popstate", _this.pushStateListen, false);
                    //_this.$router.replace( {name :'mainIndex'} );
                    //_this.$router.back();
                    history.back();
                }else{
                    history.pushState(null, null, location.href)
                    _this.departIdArr.pop();//删除最后一个元素
                    _this.pageTitle.pop();//删除最后一个元素
                    var departIdArr2 = _this.departIdArr;
                    var pageTitleArr = _this.pageTitle;
                    _this.$store.dispatch('updatadePartIdArr', departIdArr2);
                    _this.$store.dispatch('updataPageTitle', pageTitleArr);
                    _this.getBusinessDpt();
                }
            }

        }
    }
</script>
