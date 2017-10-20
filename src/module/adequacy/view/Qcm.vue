<template>
  <div>
    <common-nav class="header" :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl" :gobackcom="true">
      <div slot="body">
        适当性评估
      </div>
      <div slot="footer">
        <a @click="edit" class="edit">修改</a>
      </div>
    </common-nav>
    <div class="qcm">
      <div class="content">
        <div class="qcm-item" v-for="(qstn, index) in questions">
          <div v-if="qstn.QUESTION_TYP === '1'">
            <p class="qcm-title">{{ qstn.QUESTION }}</p>
            <i class="icon-info"></i>
            <p class="qcm-info">本题可多选，但评分以最高分值选项为准</p>
            <label class="icon" v-for="(item, index2) in qstn.ANSWER" :class="{ selected: qstn.selected.indexOf(item.ANSWER_CD) > -1 }">
              {{ item.ANSWER_CD }}.{{ item.ANSWER_CONTENT }}
            </label>
          </div>
          <div v-else>
            <p class="qcm-title">{{ qstn.QUESTION }}</p>
            <label class="icon" v-for="(item, index2) in qstn.ANSWER" :class="{ selected: qstn.selected.indexOf(item.ANSWER_CD) > -1 }">
              {{ item.ANSWER_CD }}.{{ item.ANSWER_CONTENT }}
            </label>
          </div>
        </div>
      </div>
      <div class="btnbox">
        <btn type="button" value="确认无误，提交" @click="submit" class="btn" :disabled="canNotSubmit">确认无误，提交</btn>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import filters from '../common/filters'

  export default {
    data () {
      return {
        gobackUrl: 'goBack',
        canNotSubmit: false
      }
    },
    computed: {
      ...mapState([
        'serverUrl',
        'basicInfo',
        'personalInfo',
        'token',
        'questions',
        'scoreResult',
        'cfAdequacyJson'
      ])
    },
    methods: {
      async submit () {
        this.$loading.toggle('')

        this.canNotSubmit = true
        let pcd = this.questions[0].PAPER_CD
        let ans = []

        this.questions.forEach((item, index) => {
          item.selected.forEach((item2, index2) => {
            ans.push({
              PAPER_CD: pcd,
              QUESTION_CD: item.QUESTION_CD,
              ANSWER: String(item2)
            })
          })
        })

        let request = {
          method: 'post',
          url: this.$getApiUrl('submitAppropriateness'),
          data: {
            'func': 2020,
            'type': 2,
            'token': this.token,
            'account': this.personalInfo.PHONENUM,
            'data': [{
              'service': 'adequacy.103',
              'json': JSON.stringify(Object.assign({}, this.personalInfo, {ANSWERS: ans}))
            }]
          }
        }

        try {
          let response = await this.$axios(request)
          let rsltData = JSON.parse(response.data.data[0].proxyresult)
          if (rsltData.body.result) {
            this.scoreResult.GRADE_CODE = rsltData.body.result.GRADE_CODE
            this.scoreResult.MATCH_PRD_RISK = rsltData.body.result.MATCH_PRD_RISK
            this.scoreResult.LOWEST_NAM = rsltData.body.result.LOWEST_NAM
            this.scoreResult.SCORE = rsltData.body.result.SCORE

            let response2 = await this.$axios.post(this.$getApiUrl('makeAgreements'), this.makeAgreementsRequest())
            if (response2.data.errcode === 0) {
              this.$router2.push('/qrt')
            } else {
              throw new Error('生成协议错误')
            }
          } else {
            throw new Error('提交问卷错误')
          }
        } catch (e) {
          this.canNotSubmit = false
          this.showError(e.message)
        } finally {
          this.$loading.hide()
        }
      },
      edit () {
        let arr = []

        this.questions.forEach((item, index) => {
          let i = index + 1
          arr.push({
            text: ('0' + i).split('').reverse().splice(0, 2).reverse().join(''),
            click: (() => {
              let url = '/qnr/' + i + '?type=edit'
              return () => {
                this.$router2.push(url)
              }
            })(this)
          })
        })

        this.$alert({
          maskClosable: true,
          btns: arr,
          title: '<h4>选择修改题号</h4>'
        })
        let alt = document.getElementsByClassName('alert')[0]
        alt.parentNode.className = 'modifyAnswer'
      },
      showError (message) {
        this.$alert({
          maskClosable: true,
          btns: [{
            text: '确定',
            click: () => false
          }],
          title: '<h4>提示</h4>',
          message: `<p>${message || '提交错误'}</p>`
        })
      },
      makeAgreementsRequest () {
        return {
          id: this.personalInfo.ID_NO,
          name: this.personalInfo.INVESTOR_NAM,
          tel: this.personalInfo.PHONENUM,
          agreementType: 'BASE_INFO',
          signature: null,
          params: Object.assign({}, this.genAgreementBaseInfo(), this.genAgreementConfirmNotify(), this.genAgreementConfirmNotify(), this.genAgreementQuestionInfo())
        }
      },
      genAgreementConfirmNotify () {
        return {
          INVESTOR_NAM: `${this.personalInfo.INVESTOR_NAM}`,
          ID_NO: `${this.personalInfo.ID_NO}`,
          SCORE: `${this.scoreResult.SCORE}`,
          GRADE_CODE: `${this.scoreResult.GRADE_CODE}`,
          LOWEST_NAM: `${this.scoreResult.LOWEST_NAM}`,
          MATCH_PRD_RISK: `${this.scoreResult.MATCH_PRD_RISK}`,
          DATE: `${filters.dataFormat(new Date(), 'YYYY年MM月DD日')}`,
          DATE_INSTITUTION: `${filters.dataFormat(new Date(), 'YYYY年MM月DD日')}`
        }
      },
      genAgreementQuestionInfo () {
        let result = {
          INVESTOR_NAM: `${this.personalInfo.INVESTOR_NAM}`,
          ID_NO: `${this.personalInfo.ID_NO}`,
          ID_TYP: `中国公民身份证`,
          SCORE: `${this.scoreResult.SCORE}`,
          GRADE_CODE: `${this.scoreResult.GRADE_CODE}`,
          LOWEST_NAM: `${this.scoreResult.LOWEST_NAM}`,
          MATCH_PRD_RISK: `${this.scoreResult.MATCH_PRD_RISK}`,
          DATE: `${filters.dataFormat(new Date(), 'YYYY年MM月DD日')}`,
          DATE_TIME: `${filters.dataFormat(new Date(), 'YYYY-MM-DD hh:mm:ss')}`,
          QUESTION: []
        }

        this.questions && this.questions.forEach(item => {
          result.QUESTION.push(`${item.QUESTION}`)
          item.selected && item.selected.sort().forEach(index => {
            let answer = item.ANSWER[index.toUpperCase().charCodeAt() - 65]
            result.QUESTION.push(`${answer.ANSWER_CD}.${answer.ANSWER_CONTENT}`)
          })
          result.QUESTION.push(``)
        })

        return result
      },
      genAgreementBaseInfo () {
        return {
          INVESTOR_NAM: `${this.basicInfo.INVESTOR_NAM}`,
          SEX: `${['', '男', '女'][parseInt(0 + this.basicInfo.SEX)]}`,
          BIRTH_DT: `${this.basicInfo.BIRTH_DT}`,
          COUNTRY_CD: `${this.basicInfo.COUNTRY_CD}`,
          ID_TYP: `中国公民身份证`,
          ID_NO: `${this.basicInfo.ID_NO}`,
          IDVALID_ST_DT: `${this.basicInfo.IDVALID_ST_DT}`,
          IDVALID_END_DT: `${this.basicInfo.isLongValid ? '永久' : this.basicInfo.IDVALID_END_DT}`,
          LINKTELEPHONE: `${this.basicInfo.LINKTELEPHONE}`,
          FAX_NO: `${this.basicInfo.FAX_NO}`,
          EMAIL: `${this.basicInfo.EMAIL}`,
          POSTCODE: `${this.basicInfo.POSTCODE}`,
          LINKADDR: `${this.basicInfo.LINKADDR}`,
          OCCUPATION_CD: `${this.basicInfo.OCCUPATION_CD}`,
          NO_CREDIT_TYP: `${this.basicInfo.NO_CREDIT_TYP.split(',').map(index => ['无', '中国人民银行征信中心', '最高人民法院失信被执行人名单', '工商行政管理机构', '税务管理机构', '监管机构、自律组织', '投资者在期货经营机构从事投资活动时产生的违约失信行为记录', '过度维权等不当行为信息', '其它组织'][index]).join(',')}`,
          CONTROLLINK: `${[this.basicInfo.CONTROLLINK_ITEM, '否'][parseInt(0 + this.basicInfo.CONTROLLINK)]}`,
          BENEFICIARY: `${['本人', this.basicInfo.BENEFICIARY_ITEM][parseInt(0 + this.basicInfo.BENEFICIARY)]}`,
          TRADE_TYP: `${this.basicInfo.TRADE_TYP.split(',').map(index => ['投机', '套利', '套保', '产品'][index]).join(',')}`,
          INVEST_TIME: `${['0年-1年', '1年-5年', '5年以上'][parseInt(0 + this.basicInfo.INVEST_TIME)]}`,
          INVEST_CATEGORY: `${this.basicInfo.INVEST_CATEGORY.split(',').map(index => ['期货', '期权', '资管产品', this.basicInfo.INVEST_CATEGORY_ITEM][index]).join(',')}`,
          INVEST_GAIN: `${this.basicInfo.INVEST_GAIN.split(',').map(index => ['稳健', '成长', '激进'][index]).join(',')}`,
          DATE: `${filters.dataFormat(new Date(), 'YYYY年MM月DD日')}`,
          DATE_TIME: `${filters.dataFormat(new Date(), 'YYYY-MM-DD hh:mm:ss')}`
        }
      }
    }
  }
</script>
