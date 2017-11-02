<template>
  <div class="customerInfo">
    <common-nav>
      <span slot="body">客户选择</span>
    </common-nav>
    <div class="selectDept">
      <div class="searchbar">
        <i class="mintui mintui-search" :class="{'alignLeft':focusFlag || keyword}"></i>
        <input class="searchbar-input" :class="{'inputFocus':focusFlag || keyword}" type="text" v-model="keyword"
               placeholder="搜索" @focus="searchFocus(true)" @blur="searchFocus(false)"/>
      </div>
      <index-list>
        <index-section v-for="(v, i) in currentList" :key="i" :index="v.initial">
          <a class="mint-cell" :class="{selected: currentResult.id === item.id}" v-for="(item, index) in v.data"
             :key="index" @click="jumpClick(item)">
            <div class="mint-list">
              <div class="cusName" v-text="'联系人姓名'+(index+1)+'(2345123373)'"></div>
              <div class="cusLevel">
                <img class="type1" src="../images/img14.png"/>
                <img class="type1" src="../images/img14.png"/>
                <img class="type1" src="../images/img14.png"/>
              </div>
            </div>
          </a>
        </index-section>
      </index-list>

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { IndexList, IndexSection, Search } from 'mint-ui'
  //  import util from '../common/util'

  export default {
    components: {
      IndexList,
      IndexSection,
      Search
    },
    computed: {},
    data () {
      return {
        segmentedIndex: 1,
        keyword: '',
        currentResult: {
          id: null,
          name: null
        },
        currentList: null,
        deptJson: [],
        focusFlag: false,
        params: {
          userId: '',
          type: 1
        }
      }
    },
    mounted () {

      // var rsltData = JSON.parse(json.data);
      var rsltData = {
        'body': {
          'result': [{
            'DEPARTMENT_ID': 'JcLf',
            'FIRST_PINYIN': 'I',
            'FULL_PINYIN': 'IBYWFZB',
            'DEPARTMENT_NAM': 'IBu4e1au52a1u53d1u5c55u90e8'
          }, {
            'DEPARTMENT_ID': 'ItJn',
            'FIRST_PINYIN': 'B',
            'FULL_PINYIN': 'BJFGS',
            'DEPARTMENT_NAM': 'u5317u4eacu5206u516cu53f8'
          }, {
            'DEPARTMENT_ID': 'JJLu',
            'FIRST_PINYIN': 'B',
            'FULL_PINYIN': 'BJYYB',
            'DEPARTMENT_NAM': 'u5317u4eacu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JSKw',
            'FIRST_PINYIN': 'C',
            'FULL_PINYIN': 'CFGLZX',
            'DEPARTMENT_NAM': 'u8d22u5bccu7ba1u7406u4e2du5fc3'
          }, {
            'DEPARTMENT_ID': 'J6Kt',
            'FIRST_PINYIN': 'C',
            'FULL_PINYIN': 'CCYYB',
            'DEPARTMENT_NAM': 'u957fu6625u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JNM7',
            'FIRST_PINYIN': 'C',
            'FULL_PINYIN': 'CDYYB',
            'DEPARTMENT_NAM': 'u6210u90fdu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'IqJg',
            'FIRST_PINYIN': 'D',
            'FULL_PINYIN': 'DLYYB',
            'DEPARTMENT_NAM': 'u5927u8fdeu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JALj',
            'FIRST_PINYIN': 'F',
            'FULL_PINYIN': 'FZSYB',
            'DEPARTMENT_NAM': 'u7ebau7ec7u4e8bu4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'J4Kq',
            'FIRST_PINYIN': 'F',
            'FULL_PINYIN': 'FSYYB',
            'DEPARTMENT_NAM': 'u4f5bu5c71u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'IxKK',
            'FIRST_PINYIN': 'F',
            'FULL_PINYIN': 'FZYYB',
            'DEPARTMENT_NAM': 'u798fu5ddeu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JGLo',
            'FIRST_PINYIN': 'G',
            'FULL_PINYIN': 'GTSYB',
            'DEPARTMENT_NAM': 'u94a2u94c1u4e8bu4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Jz',
            'FIRST_PINYIN': 'G',
            'FULL_PINYIN': 'GZDEYWB',
            'DEPARTMENT_NAM': 'u5e7fu5ddeu7b2cu4e8cu4e1au52a1u90e8'
          }, {
            'DEPARTMENT_ID': 'Ji01',
            'FIRST_PINYIN': 'G',
            'FULL_PINYIN': 'GZYYB',
            'DEPARTMENT_NAM': 'u5e7fu5ddeu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'IvKG',
            'FIRST_PINYIN': 'H',
            'FULL_PINYIN': 'HEBYYB',
            'DEPARTMENT_NAM': 'u54c8u5c14u6ee8u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Jv01',
            'FIRST_PINYIN': 'H',
            'FULL_PINYIN': 'HWSYB',
            'DEPARTMENT_NAM': 'u6d77u5916u4e8bu4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'IwKI',
            'FIRST_PINYIN': 'H',
            'FULL_PINYIN': 'HZYYB',
            'DEPARTMENT_NAM': 'u676du5ddeu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Jq01',
            'FIRST_PINYIN': 'J',
            'FULL_PINYIN': 'JGKHB',
            'DEPARTMENT_NAM': 'u673au6784u5ba2u6237u90e8'
          }, {
            'DEPARTMENT_ID': 'Js01',
            'FIRST_PINYIN': 'J',
            'FULL_PINYIN': 'JGKHEB',
            'DEPARTMENT_NAM': 'u673au6784u5ba2u6237u4e8cu90e8'
          }, {
            'DEPARTMENT_ID': 'Jr01',
            'FIRST_PINYIN': 'J',
            'FULL_PINYIN': 'JGKHWB',
            'DEPARTMENT_NAM': 'u673au6784u5ba2u6237u4e94u90e8'
          }, {
            'DEPARTMENT_ID': 'J9L6',
            'FIRST_PINYIN': 'J',
            'FULL_PINYIN': 'JGKHYB',
            'DEPARTMENT_NAM': 'u673au6784u5ba2u6237u4e00u90e8'
          }, {
            'DEPARTMENT_ID': 'Jf01',
            'FIRST_PINYIN': 'J',
            'FULL_PINYIN': 'JGYWZB',
            'DEPARTMENT_NAM': 'u673au6784u4e1au52a1u603bu90e8'
          }, {
            'DEPARTMENT_ID': 'JQLC',
            'FIRST_PINYIN': 'J',
            'FULL_PINYIN': 'JRSCB',
            'DEPARTMENT_NAM': 'u91d1u878du5e02u573au90e8'
          }, {
            'DEPARTMENT_ID': 'JdMC',
            'FIRST_PINYIN': 'J',
            'FULL_PINYIN': 'JRTYB',
            'DEPARTMENT_NAM': 'u91d1u878du540cu4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'J3Kp',
            'FIRST_PINYIN': 'K',
            'FULL_PINYIN': 'KMYYB',
            'DEPARTMENT_NAM': 'u6606u660eu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Jj03',
            'FIRST_PINYIN': 'M',
            'FULL_PINYIN': 'MHGSYB',
            'DEPARTMENT_NAM': 'u7164u5316u5de5u4e8bu4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Jg01',
            'FIRST_PINYIN': 'N',
            'FULL_PINYIN': 'NJYYB',
            'DEPARTMENT_NAM': 'u5357u4eacu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Jy',
            'FIRST_PINYIN': 'N',
            'FULL_PINYIN': 'NNYWB',
            'DEPARTMENT_NAM': 'u5357u5b81u4e1au52a1u90e8'
          }, {
            'DEPARTMENT_ID': 'JTKe',
            'FIRST_PINYIN': 'N',
            'FULL_PINYIN': 'NYHGSYB',
            'DEPARTMENT_NAM': 'u80fdu6e90u5316u5de5u4e8bu4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JFLi',
            'FIRST_PINYIN': 'N',
            'FULL_PINYIN': 'NBYYB',
            'DEPARTMENT_NAM': 'u5b81u6ce2u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Jk01',
            'FIRST_PINYIN': 'Q',
            'FULL_PINYIN': 'QQSYB',
            'DEPARTMENT_NAM': 'u671fu6743u4e8bu4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Jo01',
            'FIRST_PINYIN': 'Q',
            'FULL_PINYIN': 'QYJRB',
            'DEPARTMENT_NAM': 'u4f01u4e1au91d1u878du90e8'
          }, {
            'DEPARTMENT_ID': 'J7Ku',
            'FIRST_PINYIN': 'Q',
            'FULL_PINYIN': 'QDYYB',
            'DEPARTMENT_NAM': 'u9752u5c9bu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'IuKL',
            'FIRST_PINYIN': 'S',
            'FULL_PINYIN': 'SDFGS',
            'DEPARTMENT_NAM': 'u5c71u4e1cu5206u516cu53f8'
          }, {
            'DEPARTMENT_ID': 'Jp01',
            'FIRST_PINYIN': 'S',
            'FULL_PINYIN': 'SFYWZX',
            'DEPARTMENT_NAM': 'u4e0au5206u4e1au52a1u4e2du5fc3'
          }, {
            'DEPARTMENT_ID': 'JMKM',
            'FIRST_PINYIN': 'S',
            'FULL_PINYIN': 'SHDDMLYYB',
            'DEPARTMENT_NAM': 'u4e0au6d77u4e1cu5927u540du8defu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Ju01',
            'FIRST_PINYIN': 'S',
            'FULL_PINYIN': 'SHJGB',
            'DEPARTMENT_NAM': 'u4e0au6d77u673au6784u90e8'
          }, {
            'DEPARTMENT_ID': 'JHLq',
            'FIRST_PINYIN': 'S',
            'FULL_PINYIN': 'SHJGEB',
            'DEPARTMENT_NAM': 'u4e0au6d77u673au6784u4e8cu90e8'
          }, {
            'DEPARTMENT_ID': 'IyJk',
            'FIRST_PINYIN': 'S',
            'FULL_PINYIN': 'SHSJDDYYB',
            'DEPARTMENT_NAM': 'u4e0au6d77u4e16u7eaau5927u9053u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'J0Km',
            'FIRST_PINYIN': 'S',
            'FULL_PINYIN': 'SZFGS',
            'DEPARTMENT_NAM': 'u6df1u5733u5206u516cu53f8'
          }, {
            'DEPARTMENT_ID': 'J1Kn',
            'FIRST_PINYIN': 'S',
            'FULL_PINYIN': 'SYYYB',
            'DEPARTMENT_NAM': 'u6c88u9633u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JKLv',
            'FIRST_PINYIN': 'T',
            'FULL_PINYIN': 'TYYYB',
            'DEPARTMENT_NAM': 'u592au539fu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'J8Kv',
            'FIRST_PINYIN': 'T',
            'FULL_PINYIN': 'TSYYB',
            'DEPARTMENT_NAM': 'u5510u5c71u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'Je01',
            'FIRST_PINYIN': 'T',
            'FULL_PINYIN': 'TZGLB',
            'DEPARTMENT_NAM': 'u6295u8d44u7ba1u7406u90e8'
          }, {
            'DEPARTMENT_ID': 'J2Kc',
            'FIRST_PINYIN': 'W',
            'FULL_PINYIN': 'WHYYB',
            'DEPARTMENT_NAM': 'u6b66u6c49u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JILr',
            'FIRST_PINYIN': 'X',
            'FULL_PINYIN': 'XAYYB',
            'DEPARTMENT_NAM': 'u897fu5b89u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JO',
            'FIRST_PINYIN': 'X',
            'FULL_PINYIN': 'XMYYB',
            'DEPARTMENT_NAM': 'u53a6u95e8u8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'JBLC',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YFZX',
            'DEPARTMENT_NAM': 'u7814u53d1u4e2du5fc3'
          }, {
            'DEPARTMENT_ID': 'IrMM',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YWTZEB',
            'DEPARTMENT_NAM': 'u4e1au52a1u62d3u5c55u4e8cu90e8'
          }, {
            'DEPARTMENT_ID': 'IrMO',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YWTZEBa',
            'DEPARTMENT_NAM': 'u4e1au52a1u62d3u5c55u4e8cu90e8a'
          }, {
            'DEPARTMENT_ID': 'IrML',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YWTZSB',
            'DEPARTMENT_NAM': 'u4e1au52a1u62d3u5c55u4e09u90e8'
          }, {
            'DEPARTMENT_ID': 'IrMP',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YWTZSBA',
            'DEPARTMENT_NAM': 'u4e1au52a1u62d3u5c55u4e09u90e8A'
          }, {
            'DEPARTMENT_ID': 'IrMQ',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YWTZSBB',
            'DEPARTMENT_NAM': 'u4e1au52a1u62d3u5c55u4e09u90e8B'
          }, {
            'DEPARTMENT_ID': 'IrMN',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YWTZWB',
            'DEPARTMENT_NAM': 'u4e1au52a1u62d3u5c55u4e94u90e8'
          }, {
            'DEPARTMENT_ID': 'IrMK',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YWTZYB',
            'DEPARTMENT_NAM': 'u4e1au52a1u62d3u5c55u4e00u90e8'
          }, {
            'DEPARTMENT_ID': 'JCLB',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YXZX',
            'DEPARTMENT_NAM': 'u8425u9500u4e2du5fc3'
          }, {
            'DEPARTMENT_ID': 'Jm01',
            'FIRST_PINYIN': 'Y',
            'FULL_PINYIN': 'YSJSSYB',
            'DEPARTMENT_NAM': 'u6709u8272u91d1u5c5eu4e8bu4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'J5Ks',
            'FIRST_PINYIN': 'Z',
            'FULL_PINYIN': 'ZZYYB',
            'DEPARTMENT_NAM': 'u90d1u5ddeu8425u4e1au90e8'
          }, {
            'DEPARTMENT_ID': 'IzQ7',
            'FIRST_PINYIN': 'Z',
            'FULL_PINYIN': 'ZGYHZQ',
            'DEPARTMENT_NAM': 'u4e2du56fdu94f6u6cb3u8bc1u5238'
          }, {
            'DEPARTMENT_ID': 'JLLx',
            'FIRST_PINYIN': 'C',
            'FULL_PINYIN': 'CQYYB',
            'DEPARTMENT_NAM': 'u91cdu5e86u8425u4e1au90e8'
          }]
        },
        'head': {'message': 'u6b63u5e38', 'title': 'u8425u4e1au90e8u5217u8868', 'service': 'adequacy.107', 'code': '0'}
      }

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
        this.deptJson = deptJson
        this.currentList = this.deal(deptJson)
      }

      this.getCusList()

    },
    watch: {
      keyword: function (val, oldVal) {
        if (!val) {
          this.currentList = this.deal(this.deptJson)
          return
        }
        // console.log("--**--");
        // console.log(this.deptJson);
        this.currentList = this.deal(this.deptJson).filter(item => {
          item.data = item.data.filter(item1 => {
            return new RegExp(val).test(item1.name) || new RegExp(val.toUpperCase()).test(item1.pinyin)
          })
          return item.data.length
        })
      }
    },
    methods: {
      deal (list) {

        console.log(list)

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
      //切换开户状态
      changeHandle (segmentedIndex) {
        this.segmentedIndex = segmentedIndex
      },
      //搜索框获取焦点
      searchFocus (flag) {
        this.focusFlag = flag
      },
      //获取【客户列表】
      getCusList () {
        // var _this = this;
        // this.$axios.get("", this.params).then(function(result) {
        //     _this.deptJson = result.data.data;
        // }).
        // catch(function(err) {
        //     console.log('服务器异常', err)
        // });
      },
      //选择跳转
      jumpClick (data) {
        this.$store.dispatch('updataChooseCustomer', data)
        this.$router.push('/applyFill')
      }
    }
  }
</script>
