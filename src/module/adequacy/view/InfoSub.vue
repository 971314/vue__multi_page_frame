<template>
  <div>
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackcom="true">
      <div slot="body">
        <span>投资目标</span>
      </div>
    </common-nav>
    <div class="header-bung"></div>
    <div class="info infoSub">
      <div v-for="(qstn, index) in qstns" :key="index">
        <div class="itemTitle" v-text="qstn.title"></div>
        <div class="inputInfo pl15 bd-top">
          <div class="flex inputText" v-if="qstn.type === 'single'" v-for="(answer, index2) in qstn.answers" :key="index2"
               @click="selectAnswer(basicInfo, qstn.field, answer.answer_cd)">
            <div class="flex-1" v-text="answer.answer_content"></div>
            <div class="flex-1 icon" :class="{selected: basicInfo[qstn.field] === answer.answer_cd}">
            </div>
          </div>
          <div class="inputText" v-if="qstn.type === 'multiple'" v-for="(answer, index2) in qstn.answers" :key="index2" v-show="answer.answer_type !== 'input' || answer.isShow">
            <div class="flex" v-if="!answer.answer_type"
                 @click="selectMultiAnswer(basicInfo, qstn, answer)">
              <div class="flex-1" v-text="answer.answer_content"></div>
              <div class="flex-1 icon" :class="{selected: basicInfo[qstn.field].indexOf(answer.answer_cd) > -1}">
              </div>
            </div>
            <input v-else="answer.answer_type === 'input'" class="text block w100p text-left" v-model="basicInfo[answer.field]" :placeholder="answer.placeholder"/>
          </div>
        </div>
      </div>
      <div class="deliver"></div>

      <div class="submitBtn">
        <a class="next" @click="next">下一步</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'

  export default {
    data () {
      return {
        qstns: [
          {
            title: '参与期货交易主要类型（可多选）',
            type: 'multiple',
            field: 'TRADE_TYP',
            answers: [
              {
                answer_cd: '0',
                answer_content: '投机'
              }, {
                answer_cd: '1',
                answer_content: '套利'
              }, {
                answer_cd: '2',
                answer_content: '套保'
              }, {
                answer_cd: '3',
                answer_content: '产品'
              }
            ]
          },
          {
            title: '投资品种（可多选）',
            type: 'multiple',
            field: 'INVEST_CATEGORY',
            answers: [
              {
                answer_cd: '0',
                answer_content: '期货'
              }, {
                answer_cd: '1',
                answer_content: '期权'
              }, {
                answer_cd: '2',
                answer_content: '资管产品'
              }, {
                answer_cd: '3',
                answer_content: '其它',
                changeAfter: (qstn, answer, values) => {
                  for (let as of qstn.answers) {
                    if (as.answer_type === 'input') {
                      as.isShow = values.indexOf(answer.answer_cd) > -1
                    }
                  }
                }
              }, {
                answer_type: 'input',
                placeholder: '请输入投资品种名称',
                field: 'INVEST_CATEGORY_ITEM',
                isShow: false
              }
            ]
          },
          {
            title: '投资期限',
            type: 'single',
            field: 'INVEST_TIME',
            answers: [
              {
                answer_cd: '0',
                answer_content: '0年-1年'
              }, {
                answer_cd: '1',
                answer_content: '1年-5年'
              }, {
                answer_cd: '2',
                answer_content: '5年以上'
              }
            ]
          },
          {
            title: '期望收益',
            type: 'single',
            field: 'INVEST_GAIN',
            answers: [
              {
                answer_cd: '0',
                answer_content: '稳健'
              }, {
                answer_cd: '1',
                answer_content: '成长'
              }, {
                answer_cd: '2',
                answer_content: '激进'
              }
            ]
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'personalInfo',
        'basicInfo'
      ])
    },
    mounted () {
    },
    methods: {
      selectMultiAnswer (obj, qstn, answer) {
        let field = qstn.field
        let value = answer.answer_cd
        let values = obj[field] ? obj[field].split(',') : []

        if (values.indexOf(value) > -1) {
          values.splice(values.indexOf(value), 1)
        } else {
          values.push(value)
        }

        obj[field] = values.join(',')

        answer.changeAfter && (answer.changeAfter(qstn, answer, values))
      },
      selectAnswer (obj = this, field, value) {
        obj[field] = value
      },
      next () {
        // 如果有不良诚信记录，直接进入临柜结果页面
        if (this.basicInfo.NO_CREDIT_TYP !== '0') {
          this.$router2.push('/neighbourCounter')
          return
        }
        // 如果有为非居，直接进入临柜结果页面
        if (this.basicInfo.ONLY_FOR_CHINESE_TAX_RESIDENTS !== 'Y') {
          this.$router2.push('/neighbourCounter')
          return
        }

        if (this.checkMessage(this.basicInfo)) {
          this.$router2.push('/infoCard')
        }
      },
      checkMessage (basicInfo) {
        if (!basicInfo.TRADE_TYP) {
          this.showAlert('参与期货交易主要类型未作答')
        } else if (!basicInfo.INVEST_TIME) {
          this.showAlert('投资期限未作答')
        } else if (!basicInfo.INVEST_GAIN) {
          this.showAlert('期望收益未作答')
        } else if (!basicInfo.INVEST_CATEGORY) {
          this.showAlert('投资品种未作答')
        } else if (basicInfo.INVEST_CATEGORY.indexOf('3') > -1 && !basicInfo.INVEST_CATEGORY_ITEM) {
          this.showAlert('其它投资品种未填写')
        } else {
          return true
        }
        return false
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
