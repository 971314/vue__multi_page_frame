<template>
  <div>
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
      <div slot="body">
        <span>选择职业</span>
      </div>
    </common-nav>
    <div class="header-bung"></div>
    <div class="info selectProfession">
      <div class="list">
        <div class="item" v-for="(item, index) in professionJson" :class="{selected: currentResult.id === item.id}" :key="index" @click="selectResult(item)">
          <div v-text="item.id"></div>
        </div>
        <div class="inputInfo bd-top">
          <div class="inputText" v-if="currentResult.id === '其他'">
            <input class="text block w100p text-left" v-model="currentResult.name" placeholder="请填写职业"/>
            <button type="button" class="btnConfirm" @click="selectResult2(currentResult)">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'basicInfo',
        'professionJson'
      ])
    },
    mounted () {
      this.currentResult.id = this.basicInfo.OCCUPATION_CD
      this.currentResult.name = this.basicInfo.OCCUPATION_CD
    },
    data () {
      return {
        keyword: '',
        currentResult: {id: null, name: null}
      }
    },
    async created () {
      if (this.professionJson) {
        return
      }

      let param = {
        method: 'post',
        url: this.$getApiUrl('professionJson'),
        data: {
          'func': 2023,
          'type': 2,
          'data': [{
            'service': 'adequacy.114',
            'json': '{}'
          }]
        }
      }

      let response = await this.$axios(param)
      let rsltData = JSON.parse(response.data.data[0].proxyresult)
      if (rsltData.body.result) {
        let professionJson = rsltData.body.result.map(item => {
          return {
            id: item.OCCUPATION_CD,
            name: item.OCCUPATION_CD === '其他' ? '' : item.OCCUPATION_CD
          }
        })

        this.$store.dispatch('updateProfessionJson', professionJson)
      }
    },
    methods: {
      selectResult (item) {
        this.currentResult = item
        this.basicInfo.OCCUPATION_CD = item.name

        if (item.name) {
          this.$router.back()
        }
      },
      selectResult2 (item) {
        if (this.checkResult(item) && item.name) {
          this.selectResult(item)
          item.name = ''
        }
      },
      checkResult (item) {
        if (item.id === '其他' && !item.name) {
          this.showAlert('请填写职业或者选择一个职业')
          return false
        }

        return true
      },
      showAlert (msg) {
        this.$alert({
          maskClosable: true,
          btns: [{
            text: '确定',
            click: () => {
              return false
            }
          }],
          title: '<h4>提示</h4>',
          message: '<p>' + msg + '</p>'
        })
      }
    }
  }
</script>
