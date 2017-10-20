<template>
  <div>
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
      <div slot="body">
        <span>选择所属营业部</span>
      </div>
    </common-nav>
    <div class="selectDept">
      <search v-model="keyword" cancel-text="取消" placeholder="搜索营业部"></search>
      <index-list>
        <index-section v-for="(v, i) in currentList" :key="i" :index="v.initial">
          <a class="mint-cell" :class="{selected: currentResult.id === item.id}" v-for="(item, index) in v.data" :key="index" @click="selectResult(item)">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text" v-text="item.name"></span>
              </div>
              <div class="mint-cell-value"><span></span></div>
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

  export default {
    components: {
      IndexList,
      IndexSection,
      Search
    },
    computed: {
      ...mapState([
        'basicInfo',
        'deptJson'
      ])
    },
    data () {
      return {
        keyword: '',
        currentResult: {id: null, name: null},
        currentList: null
      }
    },
    async created () {
      this.currentResult.id = this.basicInfo.DEPARTMENT_ID
      this.currentResult.name = this.basicInfo.DEPARTMENT_NAME

      if (this.deptJson) {
        this.currentList = this.deal(this.deptJson)
        return
      }

      let param = {
        method: 'post',
        url: this.$getApiUrl('deptJson'),
        data: {
          'func': 2023,
          'type': 2,
          'data': [{
            'service': 'adequacy.107',
            'json': '{}'
          }]
        }
      }
      let response = await this.$axios(param)

      let rsltData = JSON.parse(response.data.data[0].proxyresult)
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

        this.$store.state.deptJson = deptJson
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
        this.currentResult = item
        this.basicInfo.DEPARTMENT_ID = item.id
        this.basicInfo.CHANNEL_DEPARTMENT_ID = item.id
        this.basicInfo.DEPARTMENT_NAME = item.name
        this.basicInfo.CHANNEL_DEPARTMENT_NAM = item.name
        this.$router.back()
      }
    }
  }
</script>
