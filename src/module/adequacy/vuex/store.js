import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    env: 'production', // development or production
    questions: null,
    token: '',
    brokerId: '',
    development: {
      serverUrl: 'http://101.226.207.142:9080',
      apiUrls: {
        login: '/mockjsdata/2/Hall/appropriateness?func=2020_login',
        getToken: '/mockjsdata/2/Hall/hall',
        getRandomCode: '/mockjsdata/2/Hall/captcha/gen',
        verifyRandomCode: '/mockjsdata/2/Hall/appropriateness',
        getAppropriatenessContent: '/mockjsdata/2/Hall/appropriateness?func=2020_content',
        submitAppropriateness: '/mockjsdata/2/Hall/appropriateness?func=2020_submit',
        submitAppropriatenessProfile: '/mockjsdata/2/Hall/appropriateness?func=2020_profile',
        getAppropriatenessResult: '/mockjsdata/2/Hall/appropriateness?func=2020_result',
        professionJson: '/mockjsdata/2/Hall/conf/professionJson',
        deptJson: '/mockjsdata/2/Hall/conf/deptJson',
        cfAdequacyJson: '/mockjsdata/2/Hall/conf/cfAdequacyJson',
        signature: 'adequacySignature/index.html#/',
        getAgreements: '/mockjsdata/2/Hall/getAgreements',
        makeAgreements: '/agreement/makeAgreements',
        viewAgreementByPng: '/agreement/png',
        signatureAndUploadAgreements: '/agreement/signatureAndUploadAgreements',
        getDefaultDepartment: '/mockjsdata/2/getDefaultDepartment'
      }
    },
    production: {
      serverUrl: 'http://101.226.207.143:58080/Hall',
      apiUrls: {
        login: '/webservice',
        getToken: '/hall',
        getRandomCode: '/captcha/gen',
        verifyRandomCode: '/webservice',
        getAppropriatenessContent: '/webservice',
        submitAppropriateness: '/webservice',
        submitAppropriatenessProfile: '/webservice',
        getAppropriatenessResult: '/webservice',
        professionJson: '/webservice',
        deptJson: '/webservice',
        signature: 'adequacySignature/index.html#/',
        getAgreements: '/webservice',
        makeAgreements: '/agreement/makeAgreements',
        viewAgreementByPng: '/agreement/png',
        signatureAndUploadAgreements: '/agreement/signatureAndUploadAgreements',
        getDefaultDepartment: '/webservice'
      }
    },
    personalInfo: {
      INVESTOR_NAM: '',
      ID_NO: '',
      PHONENUM: ''
      // INVESTOR_NAM: 'test机器人',
      // ID_NO: '420106195709250416',
      // PHONENUM: '13122669926'
    },
    basicInfo: {
      ID_TYP: '1',
      ID_NO: '',
      PHONENUM: '',
      INVESTOR_NAM: '',
      INVESTOR_TYP: '0',
      COUNTRY_CD: 'CHN',
      BIRTH_DT: '',
      OCCUPATION_CD: '',
      SEX: '',
      ONLY_FOR_CHINESE_TAX_RESIDENTS: '',
      LINKADDR: '',
      POSTCODE: '',
      POSTCODE_MUST: false,
      LINKTELEPHONE: '',
      FAX_NO: '',
      FAX_NO_MUST: false,
      EMAIL: '',
      EMAIL_MUST: false,
      isLongValid: false,
      IDVALID_ST_DT: '',
      IDVALID_END_DT: '',
      CONTROLLINK: '',  // 是否存在实际控制关系，单选：0-是,1-否
      CONTROLLINK_ITEM: '', // 是否存在实际控制关系：选其他后，填写的内容
      TRADE_TYP: '',    // 参与期货的主要交易类型，多选：0-投机，1-套利,2-套保,3-产品
      BENEFICIARY: '',  // 交易的实际受益人，单选：0-本人,1-其他
      BENEFICIARY_MUST: false,
      BENEFICIARY_ITEM: '', // 交易的实际受益人：选其他后，填写的内容
      INVEST_TIME: '',  // 投资期限，单选： 0-( 0年-1年)；1-(1年-5年)；2-(5年以上)
      INVEST_CATEGORY: '', // 投资品种，多选：0、1、2、3分别表示：期货,期权,资管产品,其他
      INVEST_CATEGORY_ITEM: '', // 投资品种：选其他后，填写的内容
      INVEST_GAIN: '',  // 期望收益，多选: 0、1、2   分别表示：稳健, 成长,激进
      DEPARTMENT_ID: '', // 所属部门
      NO_CREDIT_TYP: '', // 不良记录
      NO_CREDIT_TYP_MUST: false
    },
    scoreResult: {
      GRADE_CODE: '',
      MATCH_PRD_RISK: '',
      LOWEST_NAM: '',
      SCORE: ''
    },
    agreementsJson: null,
    professionJson: null,
    deptJson: null,
    cfAdequacyJson: null
  },
  mutations: {
    updateQuestions (state, payload) {
      state.questions = payload.questions
    },
    updateQuestion (state, payload) {
      state.questions.forEach((item, index) => {
        if (item.SEQ_NO === payload.question.SEQ_NO) {
          Object.assign(item, payload.question)
        }
      })
    },
    updateToken (state, payload) {
      state.token = payload.token
    },
    updatePersonalInfo (state, payload) {
      state.personalInfo = payload.personalInfo
    },
    updateBasicInfo (state, payload) {
      state.basicInfo = payload.basicInfo
    },
    updateDeptJson (state, payload) {
      state.deptJson = payload.deptJson
    },
    updateProfessionJson (state, payload) {
      state.professionJson = payload.professionJson
    },
    updateAgreementsJson (state, payload) {
      state.agreementsJson = payload.agreementsJson
    },
    updateShowPaper (state, payload) {
      state.isShowPaper = payload.isShowPaper
    }
  },
  actions: {
    updateQuestions ({commit}, questions) {
      commit({type: 'updateQuestions', questions: questions})
    },
    updateQuestion ({commit}, question) {
      commit({type: 'updateQuestion', question: question})
    },
    updateToken ({commit}, token) {
      commit({type: 'updateToken', token: token})
    },
    updatePersonalInfo ({commit}, personalInfo) {
      commit({type: 'updatePersonalInfo', personalInfo: personalInfo})
    },
    updateBasicInfo ({commit}, basicInfo) {
      commit({type: 'updateBasicInfo', basicInfo: basicInfo})
    },
    updateDeptJson ({commit}, deptJson) {
      commit({type: 'updateDeptJson', deptJson: deptJson})
    },
    updateProfessionJson ({commit}, professionJson) {
      commit({type: 'updateProfessionJson', professionJson: professionJson})
    },
    updateAgreementsJson ({commit}, agreementsJson) {
      commit({type: 'updateAgreementsJson', agreementsJson: agreementsJson})
    },
    updateShowPaper ({commit}, isShowPaper) {
      commit({type: 'updateShowPaper', isShowPaper: isShowPaper})
    }
  }
})
