<template>
  <div class="staffInfoSearch pobo-main-index">

    <div class="searchArea">
        <div class="searchInput">
            <input type="text" name="search" placeholder="搜索" v-model="keyword"/>
        </div>
        <span class="cancel" @click="$router.back()">取消</span>
    </div>

    <div class="container fzj-zy-content">

        <!-- <div class="pobo-no-data1" v-if="currentList.length <= 0 && keyword">
            <div class="text-center" >
                <img src="../../images/others/img19.png"/>
            </div>
            <span>暂无数据</span>
        </div> -->

        <div class="content">
            <div class="group" v-if="currentList.length > 0 && keyword">
                <a class="cell" v-for="item in currentList" @click="goStaffDetailPage(item)">
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
  
  import { mapState } from 'vuex';
  import util from '../../utils/util';

  export default {
    data(){
      return {
        keyword : '',
        deptJson : [],
        currentList : []
      }
    },
    activated(){
        this.getStaffList();
    },
    mounted() {
        
    },
    watch: {
      keyword: function (val, oldVal) {
        if (!val) {
          this.currentList = util.deepClone(this.deptJson);
          return;
        }
        var l = util.deepClone(this.deptJson);
        var list = [];
        for(var i = 0 ; i < l.length ; i++){
            if( new RegExp(val).test(l[i].STAFF_NAM) || 
                new RegExp(val.toUpperCase()).test(l[i].STAFF_NAM) || 
                new RegExp(val).test(l[i].STAFF_ID) || 
                new RegExp(val.toUpperCase()).test(l[i].STAFF_ID)){
                list.push(l[i]);
            }
        }
        this.currentList = list;
      }

    },
    methods: {
        //查询员工列表
        getStaffList(){
            var _this = this;
            _this.$$axios({
                restUrl: 'getStaffList',
                join: [ [ _this.info.userId, ['departId', ''] ] ],
                loading : true
            })
            .then((response) => { 
                this.deptJson = response;
                //this.currentList = response;
            })
            .catch((res) => {
                console.log('res', res);
            })
        },
        //跳转去【员工基本信息】
        goStaffDetailPage(o){
            this.$store.dispatch('updataPersonnelId', o.STAFF_ID);
            this.$store.dispatch('updataDepartName', o.DEPARTMENT_NAM);
            this.$router.push({ name: 'staffInfoDetail' })  
        }
    }
  }
</script>