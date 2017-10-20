export default {
  getApiUrl (state, key) {
    let env = state.env

    if (state[env].apiUrls[key].startsWith('/')) {
      return state[env].serverUrl + state[env].apiUrls[key]
    } else {
      return state[env].apiUrls[key]
    }
  },
  getProp (state, key) {
    let env = state.env
    return state[env][key]
  }
}
