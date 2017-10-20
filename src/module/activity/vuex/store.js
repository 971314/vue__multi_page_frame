import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentId: '',
    currentAct: true,
    remainDay: '0',
    enrollAcID: '',
    activeInfo: {
      actId: ``,  //活动ID
      actName: ``,  //活动名称
      beginTime: ``, //开始时间
      endTime: ``,  //结束时间
      address: ``,  //地址
      region: ``, //区域
      scale: ``,   //规模
      imgPath: ``  //图片
    }
  },
  mutations: {
    updateActiveInfo (state, payload) {
      state.activeInfo = payload.activeInfo
    },
    updateCurrentId (state, payload) {
      state.currentId = payload.currentId
    },
    updateCurrentAct (state, payload) {
      state.currentAct = payload.currentAct
    },
    updateremainDay (state, payload) {
      state.remainDay = payload.remainDay
    },
    updateenrollAcID (state, payload) {
      state.enrollAcID = payload.enrollAcID
    }
  },
  actions: {
    updateActiveInfo ({commit}, activeInfo) {
      commit({type: 'updateActiveInfo', activeInfo: activeInfo})
    },
    updateCurrentId ({commit}, currentId) {
      commit({type: 'updateCurrentId', currentId: currentId})
    },
    updateCurrentAct ({commit}, currentAct) {
      commit({type: 'updateCurrentAct', currentAct: currentAct})
    },
    updateremainDay ({commit}, remainDay) {
      commit({type: 'updateremainDay', remainDay: remainDay})
    },
    updateenrollAcID ({commit}, enrollAcID) {
      commit({type: 'updateenrollAcID', enrollAcID: enrollAcID})
    }
  },
  getters: {}
});

export default store;
