import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUserYield: false,
    isUserMoneyPaid: false,
    isUserProfit: false,
    isUserykfx: false,
    isUserfqzj: false,
    MoneyPaidTimeFrom: '',
    MoneyPaidTimeTo: '',
    YeildTimeFrom: '',
    YeildTimeTo: '',
    ProfitTimeFrom: '',
    ProfitTimeTo: '',
    ykfxTimeFrom: '',
    ykfxTimeTo: '',
    fqzjTimeFrom: '',
    fqzjTimeTo: '',
    YeildBack: true
  },
  mutations: {
    updateMoneyPaidTimeFrom (state, payload) {
      state.MoneyPaidTimeFrom = payload.MoneyPaidTimeFrom
    },
    updateMoneyPaidTimeTo (state, payload) {
      state.MoneyPaidTimeTo = payload.MoneyPaidTimeTo
    },
    updateYeildTimeFrom (state, payload) {
      state.YeildTimeFrom = payload.YeildTimeFrom
    },
    updateYeildTimeTo (state, payload) {
      state.YeildTimeTo = payload.YeildTimeTo
    },
    updateProfitTimeFrom (state, payload) {
      state.ProfitTimeFrom = payload.ProfitTimeFrom
    },
    updateProfitTimeTo (state, payload) {
      state.ProfitTimeTo = payload.ProfitTimeTo
    },
    updateykfxTimeFrom (state, payload) {
      state.ykfxTimeFrom = payload.ykfxTimeFrom
    },
    updateykfxTimeTo (state, payload) {
      state.ykfxTimeTo = payload.ykfxTimeTo
    },
    updatefqzjTimeFrom (state, payload) {
      state.fqzjTimeFrom = payload.fqzjTimeFrom
    },
    updatefqzjTimeTo (state, payload) {
      state.fqzjTimeTo = payload.fqzjTimeTo
    },
    updateYeildBack (state, payload) {
      state.YeildBack = payload.YeildBack
    },
    updateisUserYield (state, payload) {
      state.isUserYield = payload.isUserYield
    },
    updateisUserMoneyPaid (state, payload) {
      state.isUserMoneyPaid = payload.isUserMoneyPaid
    },
    updateisUserProfit (state, payload) {
      state.isUserProfit = payload.isUserProfit
    },
    updateisUserykfx (state, payload) {
      state.isUserykfx = payload.isUserykfx
    },
    updateisUserfqzj (state, payload) {
      state.isUserfqzj = payload.isUserfqzj
    }
  },
  actions: {
    updateMoneyPaidTimeFrom ({commit}, MoneyPaidTimeFrom) {
      commit({type: 'updateMoneyPaidTimeFrom', MoneyPaidTimeFrom: MoneyPaidTimeFrom})
    },
    updateMoneyPaidTimeTo ({commit}, MoneyPaidTimeTo) {
      commit({type: 'updateMoneyPaidTimeTo', MoneyPaidTimeTo: MoneyPaidTimeTo})
    },
    updateYeildTimeFrom ({commit}, YeildTimeFrom) {
      commit({type: 'updateYeildTimeFrom', YeildTimeFrom: YeildTimeFrom})
    },
    updateYeildTimeTo ({commit}, YeildTimeTo) {
      commit({type: 'updateYeildTimeTo', YeildTimeTo: YeildTimeTo})
    },
    updateProfitTimeFrom ({commit}, ProfitTimeFrom) {
      commit({type: 'updateProfitTimeFrom', ProfitTimeFrom: ProfitTimeFrom})
    },
    updateProfitTimeTo ({commit}, ProfitTimeTo) {
      commit({type: 'updateProfitTimeTo', ProfitTimeTo: ProfitTimeTo})
    },
    updateykfxTimeFrom ({commit}, ykfxTimeFrom) {
      commit({type: 'updateykfxTimeFrom', ykfxTimeFrom: ykfxTimeFrom})
    },
    updateykfxTimeTo ({commit}, ykfxTimeTo) {
      commit({type: 'updateykfxTimeTo', ykfxTimeTo: ykfxTimeTo})
    },
    updatefqzjTimeFrom ({commit}, fqzjTimeFrom) {
      commit({type: 'updatefqzjTimeFrom', fqzjTimeFrom: fqzjTimeFrom})
    },
    updatefqzjTimeTo ({commit}, fqzjTimeTo) {
      commit({type: 'updatefqzjTimeTo', fqzjTimeTo: fqzjTimeTo})
    },
    updateYeildBack ({commit}, YeildBack) {
      commit({type: 'updateYeildBack', YeildBack: YeildBack})
    },
    updateisUserYield ({commit}, isUserYield) {
      commit({type: 'updateisUserYield', isUserYield: isUserYield})
    },
    updateisUserMoneyPaid ({commit}, isUserMoneyPaid) {
      commit({type: 'updateisUserMoneyPaid', isUserMoneyPaid: isUserMoneyPaid})
    },
    updateisUserProfit ({commit}, isUserProfit) {
      commit({type: 'updateisUserProfit', isUserProfit: isUserProfit})
    },
    updateisUserykfx ({commit}, isUserykfx) {
      commit({type: 'updateisUserykfx', isUserykfx: isUserykfx})
    },
    updateisUserfqzj ({commit}, isUserfqzj) {
      commit({type: 'updateisUserfqzj', isUserfqzj: isUserfqzj})
    }
  },
  getters: {
  }
})
