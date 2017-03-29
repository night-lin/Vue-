// src/store/index.js 完整代码

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  location: null,
  now: null,
  last_update: null,
  daily: null,
  hourly: null,
  air: null,
  moon: null,
  sun: null,
  temperature_unit: 'c',
  citys: {
    '北京': null,
    '福州': null
  },
  city_now: '福州',
  citySet: false
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
