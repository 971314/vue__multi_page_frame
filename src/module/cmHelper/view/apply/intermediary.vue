<template>
  <div class="customerInfo pobo-customer-info intermediary">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
      <div slot="body">
        <div class="segmentedCtrl">
          <div :class="{'active':segmentedIndex==1}" @click="changeHandle(1)">自然居间人</div>
          <div :class="{'active':segmentedIndex==2}" @click="changeHandle(2)">法人居间人</div>
        </div>
      </div>
    </common-nav>

    <searchbar v-model="keyword" :autoBlur="false">
      <searchbar-placeholder>
        <icon name="search" left size="lg"></icon>
        搜索
      </searchbar-placeholder>
    </searchbar>

    <div class="selectDept customer-info-center">
      <index-list v-if="currentList.length>0">
        <index-section v-for="(v, i) in currentList" :key="i" :index="v.pinyin">
          <a href="javascript:void(0);" class="mint-cell" v-for="(item, index) in v.data"
             :key="index" v-text="item.INVESTOR_NAM+'('+item.MOBILE_NO+')'" @click="chooseToclick(item)">
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
      this.changeHandle(1)
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
      //切换开户状态
      changeHandle (segmentedIndex) {
        this.segmentedIndex = segmentedIndex
        this.getCusList(segmentedIndex)
      },
      //搜索框获取焦点
      searchFocus (flag) {
        this.focusFlag = flag
      },
      //列表
      getCusList (type,) {
        let _this = this
        /*_this.$$loading()
        _this.$axios.get(PBHttpServer.cmHelper.serverUrl + this.urlList.intermediary.url + '/' + this.info.userId + '/' + type, {
          headers: {
            id: this.info.token,
            timeout: 10000,
          }
        },).then(function (result) {*/
        let result = {
          data: {
            'retHead': '0',
            'desc': '正常',
            'custom': null,
            'timstamp': '20171116150113611',
            'data': {
              'T': [{
                'INVESTOR_ID': '100116',
                'MOBILE_NO': '899958118-',
                'INVESTOR_NAM': '投资者0116',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '-'
              }, {
                'INVESTOR_ID': '100117',
                'MOBILE_NO': '222703612-',
                'INVESTOR_NAM': '投资者0117',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '-'
              }, {
                'INVESTOR_ID': '100118',
                'MOBILE_NO': '180205711-',
                'INVESTOR_NAM': '投资者0118',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '-'
              }, {
                'INVESTOR_ID': '100130',
                'MOBILE_NO': '718768057',
                'INVESTOR_NAM': '投资者0130',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2'
              }, {
                'INVESTOR_ID': '100132',
                'MOBILE_NO': '783667057',
                'INVESTOR_NAM': '投资者0132',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2'
              }, {
                'INVESTOR_ID': '100136',
                'MOBILE_NO': '663818196',
                'INVESTOR_NAM': '投资者0136',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2'
              }, {
                'INVESTOR_ID': '100140',
                'MOBILE_NO': '123568741',
                'INVESTOR_NAM': '投资者0140',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2'
              }, {
                'INVESTOR_ID': '100141',
                'MOBILE_NO': '002588430',
                'INVESTOR_NAM': '投资者0141',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2'
              }, {
                'INVESTOR_ID': '100142',
                'MOBILE_NO': '336606533603',
                'INVESTOR_NAM': '投资者0142',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '603965333631396363'
              }, {
                'INVESTOR_ID': '100143',
                'MOBILE_NO': '899806508',
                'INVESTOR_NAM': '投资者0143',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2'
              }, {
                'INVESTOR_ID': '100147',
                'MOBILE_NO': '720905817837',
                'INVESTOR_NAM': '投资者0147',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '8370-7731851571-8195'
              }, {
                'INVESTOR_ID': '100149',
                'MOBILE_NO': '2078115020-',
                'INVESTOR_NAM': '投资者0149',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '0-'
              }, {
                'INVESTOR_ID': '100153',
                'MOBILE_NO': '235281202-',
                'INVESTOR_NAM': '投资者0153',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '-'
              }, {
                'INVESTOR_ID': '100155',
                'MOBILE_NO': '778238377-',
                'INVESTOR_NAM': '投资者0155',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '-'
              }, {
                'INVESTOR_ID': '100169',
                'MOBILE_NO': '889256898-',
                'INVESTOR_NAM': '投资者0169',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '-'
              }, {
                'INVESTOR_ID': '100177',
                'MOBILE_NO': '934371649-',
                'INVESTOR_NAM': '投资者0177',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '-'
              }, {
                'INVESTOR_ID': '100189',
                'MOBILE_NO': '874303898273',
                'INVESTOR_NAM': '投资者0189',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '273-1397222905212230'
              }, {
                'INVESTOR_ID': '103087',
                'MOBILE_NO': '6333202260-',
                'INVESTOR_NAM': '投资者3087',
                'VIPTYP': '3',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2',
                'LINKTELEPHONE': '0-'
              }, {
                'INVESTOR_ID': '103088',
                'MOBILE_NO': '699500526',
                'INVESTOR_NAM': '投资者3088',
                'VIPTYP': '0',
                'FIRST_PINYIN': 'T',
                'OPEN_STS': '2'
              }]
            }
          }
        }
        let list = result.data.data,
          cList = [],
          index = 0
        console.log(result)
        _this.count = 0
        if (list) {
          for (var i in list) {
            cList[index] = {'pinyin': i, data: list[i]}
            index++
            _this.count = _this.count + list[i].length
          }
          _this.deptJson = util.deepClone(cList)
          _this.currentList = util.deepClone(cList)
        }
        _this.$forceUpdate()
        setTimeout(function () {
          var hei = document.querySelector('.selectDept').offsetHeight
          document.querySelector('.mint-indexlist-content').style.height = hei + 'px'
//            _this.$$loaded()
        }, 50)
        /* }).catch(function (err) {
           console.log('服务器异常', err)
         })*/
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
