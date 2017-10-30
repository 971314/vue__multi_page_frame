<template>
    <div class="customerInfo">
        <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
            <div slot="body">
                <div class="segmentedCtrl">
                    <div :class="{'active':segmentedIndex==1}" @click="changeHandle(1)">已开户</div>
                    <div :class="{'active':segmentedIndex==2}" @click="changeHandle(2)">未开户</div>
                </div>
            </div>
        </common-nav>
        <div class="selectDept">
            <!-- <search v-model="keyword" cancel-text="取消" placeholder="搜索"></search> -->
            <!-- <div @click="searchFocus()">
                <searchbar v-model="keyword" >
                    <searchbar-placeholder>
                        <i class="mintui mintui-search"></i><span>搜索</span>
                    </searchbar-placeholder>
                </searchbar>
            </div> -->
            <div class="searchbar">
                <i class="mintui mintui-search" :class="{'alignLeft':focusFlag || keyword}"></i>
                <input class="searchbar-input" :class="{'inputFocus':focusFlag || keyword}" type="text" v-model="keyword" placeholder="搜索" @focus="searchFocus(true)" @blur="searchFocus(false)"/>
            </div>
            <index-list>
                <index-section v-for="(v, i) in currentList" :key="i" :index="v.initial">
                    <a class="mint-cell" :class="{selected: currentResult.id === item.id}" v-for="(item, index) in v.data" :key="index" @click="selectResult(item)">
                        <div class="mint-list">
                            <a class="mobileIcon"><img src="../images/img18.png"/></a>
                            <div class="cusName" v-text="'联系人姓名'+(index+1)+'(2345123373)'"></div>
                            <div class="cusLevel">
                                <img class="type1" src="../images/img14.png"/>
                                <img class="type1" src="../images/img14.png"/>
                                <img class="type1" src="../images/img14.png"/>
                                <img class="type2" src="../images/img16.png"/>
                                <img class="type3" src="../images/img17.png"/>
                            </div>
                        </div>
                    </a>
                </index-section>
                <div class="haveOpen text-center">180位已开户客户</div>
            </index-list>
            
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { IndexList, IndexSection, Search } from 'mint-ui'
  import json from '../common/jsonData'

  export default {
    components: {
        IndexList,
        IndexSection,
        Search
    },
    computed: {
      
    },
    data () {
        return {
            segmentedIndex : 1,
            keyword: '',
            currentResult: {id: null, name: null},
            currentList: null,
            deptJson : [],
            focusFlag : false
        }
    },
    mounted () {

      var rsltData = JSON.parse(json.data)
      //console.log(rsltData);
      if (rsltData.body.result) {
        let deptJson = rsltData.body.result.map(item => {
          return {
            'initial': item.FIRST_PINYIN,
            'data': [{
              'id': item.DEPARTMENT_ID,
              'name': item.DEPARTMENT_NAM,
              'pinyin': item.FULL_PINYIN
            }]
          }
        })

        this.currentList = this.deal(deptJson)
      }
    },
    watch: {
      keyword: function (val, oldVal) {
        if (!val) {
          this.currentList = this.deal(JSON.parse(JSON.stringify(this.deptJson)))
          return
        }

        this.currentList = this.deal(JSON.parse(JSON.stringify(this.deptJson))).filter(item => {
          item.data = item.data.filter(item1 => {
            return new RegExp(val).test(item1.name) || new RegExp(val.toUpperCase()).test(item1.pinyin)
          })
          return item.data.length
        })
      }
    },
    methods: {
      deal (list) {
        let resultListT = {}
        for (let item of list) {
          if (resultListT[item.initial]) {
            resultListT[item.initial].data = resultListT[item.initial].data.concat(item.data)
          } else {
            resultListT[item.initial] = JSON.parse(JSON.stringify(item))
          }
        }

        return Object.values(resultListT).sort((item, item1) => {
          if (item.initial === item1.initial) {
            return 0
          }
          return item1.initial > item.initial ? -1 : 1
        })
      },
      selectResult (item) {

      },
      changeHandle(segmentedIndex){
        this.segmentedIndex = segmentedIndex;
      },
      searchFocus(flag){
        console.log(111);
        this.focusFlag = flag;
      }
    }
  }
</script>
