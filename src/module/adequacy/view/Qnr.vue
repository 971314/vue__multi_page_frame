<template>
  <div>
    <common-nav class="header" :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl" :goClose="showClose"
                :gobackcom="true">
      <div slot="body">
        适当性评估
      </div>
    </common-nav>
    <div class="qnr">
      <div class="content">
        <p class="qnr-progress" v-if="qstnTotal">
          <span class="num" v-text="qstnIndex + 1"></span><span class="total" v-text="'/' + qstnTotal"></span>
        </p>
        <p class="qnr-title">{{ qstn.QUESTION }}</p>
        <div class="multi" v-if="qstn.QUESTION_TYP === '1'">
          <i class="icon-info"></i>
          <p class="qnr-info">本题可多选，但评分以最高分值选项为准</p>
        </div>
        <div class="qnr-item" v-if="qstn.QUESTION_TYP === '1'">
          <a v-for="(item, index) in qstn.ANSWER" :key="index"
             :class="{icon: 1, selected: qstn.selected.indexOf(item.ANSWER_CD) > -1 }"
             @click="selectAnswer(item.ANSWER_CD)">
            {{ item.ANSWER_CD}}.{{ item.ANSWER_CONTENT}}
          </a>
        </div>
        <div class="qnr-item" v-else>
          <a v-for="(item, index) in qstn.ANSWER" :key="index"
             :class="{icon: 1, selected: qstn.selected.indexOf(item.ANSWER_CD) > -1 }"
              @click="selectAnswer(item.ANSWER_CD)">
            {{ item.ANSWER_CD}}.{{ item.ANSWER_CONTENT}}
          </a>
        </div>
      </div>

      <div class="btnbox">
        <btn class="qstn-btn prev" v-if="!isEdit" :disabled="disabledPrev" type="button"
             @click="prev" value="上一题">上一题
        </btn>
        <btn class="qstn-btn next" v-if="!isEnd &&!isEdit" :disabled="disabledNext" type="button"
             @click="next" value="下一题">下一题
        </btn>
        <btn class="qstn-btn" v-if="isEnd && !isEdit " :disabled="disabledNext" type="button"
             @click="submit" value="提交">提交
        </btn>
        <btn class="qstn-btn one" v-if="isEdit" :disabled="disabledNext" type="button"
             @click="editCompleted" value="确定">确定
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return this.initData()
    },
    watch: {
      '$route'(to, from) {
        if (to.path.indexOf('/qnr/') > -1) {
          this.qstnIndex = parseInt(to.params.num, 10) - 1
        }
      },
      async qstnIndex() {
        await this.changeIndex()
      }
    },
    beforeRouteLeave(to, from, next) {
      if (!this.isEnterComplete && this.$route.query.type == 'edit' && this.qstn.QUESTION_TYP === '1') {
        this.questions[this.qstnIndex].selected = [];
        for (let i = 0; i < this.deepCopyData[this.qstnIndex].selected.length; i++) {
          this.questions[this.qstnIndex].selected.push(this.deepCopyData[this.qstnIndex].selected[i]);
        }
        next();
      } else {
        next();
      }
    },
    async created() {
      this.initData()
      // 没有数据则加载数据

      if (!this.questions || !this.questions.length) {
        await this.loadData()
      }

      this.qstnIndex = parseInt(this.$route.params.num, 10) - 1
      await this.changeIndex()
    },
    computed: {
      ...mapState([
        'serverUrl',
        'token',
        'questions'
      ])
    },
    methods: {
      async changeIndex() {
        Object.assign(this, this.initData(), {qstnIndex: this.qstnIndex})

        // 第一题
        if (this.qstnIndex === 0) {
          this.disabledPrev = true
        }

        // 最后一题
        if (this.questions && this.questions.length === this.qstnIndex + 1) {
          this.isEnd = true
        }

        if (this.$route.query.type === 'edit') {
          this.isEdit = true
          this.showClose = false
        }

        this.questions && this.questions.length && this.fixData()
      },
      initData() {
        return {
          isOneTime: false,
          isEnterComplete: false,
          deepCopyData: {},
          gobackUrl: 'goBack',
          qstn: {},
          qstnTotal: 0,
          qstnIndex: 0,
          myanswer: [],
          isEnd: false,
          isEdit: false,
          disabledPrev: false,
          disabledNext: true,
          showClose: true
        }
      },
      async loadData() {
        this.$loading.toggle('')

        let config = {
          method: 'post',
          url: this.$getApiUrl('getAppropriatenessContent'),
          data: {
            'func': 2020,
            'type': 2,
            'token': this.$store.state.token,
            'account': this.personalInfo.PHONENUM,
            'data': [{
              'service': 'adequacy.102',
              'json': JSON.stringify(this.personalInfo)
            }]
          }
        }

        let response = await this.$axios(config)
        this.$loading.hide()

        let qstn = JSON.parse(response.data.data[0].proxyresult)

        let questions = qstn.body.result.QUESTION.filter((item, index) => {
          return item.QUESTION_TYP === '0' || item.QUESTION_TYP === '1'
        })

        questions = questions.map((item, index) => {
          item.selected = []
          return item
        })

        await this.$store.dispatch('updateQuestions', questions)
      },
      fixData() {
        this.qstn = this.questions[this.qstnIndex]
        this.qstnTotal = this.questions.length
        if (this.qstn.selected && this.qstn.selected.length) {
          this.disabledNext = false
        }
      },
      selectAnswer(index) {
        if (this.$route.query.type == 'edit' && this.qstn.QUESTION_TYP === '1' && !this.isOneTime) {
          this.isOneTime = true;
          this.deepCopyData = JSON.parse(JSON.stringify(this.questions));
        }
        if (this.qstn.QUESTION_TYP === '1') { //多选题
          if (this.qstn.selected.indexOf(index) < 0) {
            this.qstn.selected.push(index)
          } else {
            this.qstn.selected.splice(this.qstn.selected.indexOf(index), 1)
          }
        } else {                              //单选题
          this.qstn.selected.length = 0
          this.qstn.selected.push(index)
        }

        //判断当前题目是否已做（兼容多选题）
        if (this.qstn.selected.length > 0) {
          this.disabledNext = false
        } else {
          this.disabledNext = true
        }
        this.$store.dispatch('updateQuestion', this.qstn);
      },
      prev() {
        this.$router2.push('/qnr/' + (this.qstnIndex))
      },
      async next() {
        this.$router2.push('/qnr/' + (this.qstnIndex + 2))
      },
      async submit() {
        await this.$store.dispatch('updateQuestions', this.questions)
        this.$router2.push('/qcm')
      },
      editCompleted() {
        this.isEnterComplete = true;
        this.$router.back()
      }
    }
  }
</script>
