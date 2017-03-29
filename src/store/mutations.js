// src/store/mutations.js
// import * as types from './mutation-types'

const mutations = {
  setWeather (state, {results, type}) {
  //  console.log(type)
    switch (type) {
      case 'now':
        state.now = results.now
        state.last_update = results.last_update
        break
      case 'daily':
        state.daily = results.daily
        state.last_update = results.last_update
        break
      case 'hourly':
        state.hourly = results.hourly
        break
      case 'air':
        state.air = results.air
        break
      case 'moon':
        state.moon = results.moon
        break
      case 'sun':
        state.sun = results.sun
    }

    state.location = results.location

    // console.log(state)
  },
  setCityWeather (state, {attr, results}) {
    state.citys[attr] = results.now
    state.citySet = true
  },
  deleteCity (state, {citys, self}) {
    for (let i = 0; i < citys.length; i++) {
      let attr = citys[i]
      delete state.citys[attr]
    }
    self.$Message.success('编辑成功')
  },
  addCity (state, {city, self}) {
    console.log(state.citys)
    if (state.citys.hasOwnProperty(city)) {
      self.$Message.error('已有该城市')
    } else {
      state.citys[city] = null
      self.$Message.success('添加成功')
    }
  },
  changeUnit (state, {unit, self}) {
    state.temperature_unit = unit
    self.$Message.success('温度单位切换成功')
    setTimeout(self.$refs.dialog.close, 1000)
  },
  changeNowCity (state, {city, self}) {
    state.city_now = city
    self.$Message.success('当前城市切换成功')
  }
}
export default mutations
