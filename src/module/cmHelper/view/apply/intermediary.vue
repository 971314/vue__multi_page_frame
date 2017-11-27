<template>
  <div class="customerInfo pobo-customer-info intermediary">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
      <div slot="body">
        居间人
      </div>
    </common-nav>

    <searchbar v-model="keyword">
      <searchbar-placeholder>
        <icon name="search" left size="lg"></icon>
        <span>搜索</span>
      </searchbar-placeholder>
    </searchbar>

    <div class="selectDept customer-info-center">
      <index-list v-if="currentList.length>0">
        <index-section v-for="(v, i) in currentList" :key="i" :index="v.pinyin">
          <a href="javascript:void(0);" class="mint-cell" v-for="(item, index) in v.data"
             :key="index" v-text="item.INVESTOR_NAM" @click="chooseToclick(item)">
          </a>
        </index-section>

      </index-list>

    </div>

    <!--<div v-if="count && segmentedIndex==1" class="haveOpen text-center">{{count}}位已开户客户</div>-->


  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { IndexList, IndexSection } from 'mint-ui'
  import util from '../../utils/util'

  export default {
    components: {
      IndexList,
      IndexSection
    },
    computed: {
      ...mapState({
        addFollow: ({followUpRecord}) => followUpRecord.addFollow,
        investor: ({followUpRecord}) => followUpRecord.investor,
        pInvestor: ({followUpRecord}) => followUpRecord.pInvestor,
        jumpFlag: ({followUpRecord}) => followUpRecord.jumpFlag
      })
    },
    data () {
      return {
        urlcontent: 'investor',
        segmentedIndex: 0,
        keyword: '',
        currentList: [],
        deptJson: [],
        focusFlag: false,
        url: PBHttpServer.cmHelper.serverUrl,
        count: 0    //已开户人数
      }
    },
    activated () {
      this.getCusList()
    },
    mounted () {

    },
    watch: {
      keyword: function (val, oldVal) {
        if (!val) {
          this.currentList = util.deepClone(this.deptJson)
          return
        }

        var tempList = util.deepClone(this.deptJson)
        for (var i = 0; i < tempList.length; i++) {
          tempList[i].data = tempList[i].data.filter(function (temp) {
            return new RegExp(val).test(temp.INVESTOR_NAM) ||
              new RegExp(val).test(temp.CUST_NAM)
          })
        }
        tempList = tempList.filter(function (item) {
          return item.data.length > 0
        })
        this.currentList = tempList
        var hei = document.querySelector('.selectDept').offsetHeight
        var sc = document.querySelector('.mint-indexlist-content')
        sc.style.height = hei + 'px'

      },
      $route (to, from) {
        if (to.name == 'cmHelperIndex') {
          this.currentList = []
          this.urlcontent = 'investor'
          this.segmentedIndex = 1
        }
      }
    },
    methods: {
      //列表
      getCusList () {
        let _this = this
        _this.$$loading()
        _this.$axios.get(PBHttpServer.cmHelper.serverUrl + this.urlList.intermediary.url + '/' + this.info.userId, {
          timeout: 10000,
          headers: {
            id: this.info.token
          }
        },).then(function (result) {
          _this.$loading.hide()
          let list = result.data.data

          let lists = _this.sortGroupDIY(list)
          _this.deptJson = lists
          _this.currentList = lists

        }).catch(function (err) {
          _this.$loading.hide()
          if (err.response && err.response.status == 401) {
            _this.$router.replace('/')
          } else if (err.response) {
            _this.$toast(err.response.data.desc)
          } else {
            _this.$toast('网络超时，请稍后重试！')
          }
          console.log(err)
        })
      },
      //选择点击
      chooseToclick (item) {
        console.log(item)
        this.$store.dispatch('updataAppObject', {
          appObjectId: item.INVESTOR_ID,
          appObjectType: '3',
          appObjectName: item.INVESTOR_NAM
        })
        this.$router.back()
      }
    }
  }
</script>
