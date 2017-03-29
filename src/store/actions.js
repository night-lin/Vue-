// src/store/actions.js

// import * as types from './mutation-types'
const actions = {
  setWeather (context, {vue, type, city, unit}) {
    var url = ''
    var url1 = 'https://crossorigin.me/'
    var url2 = ''
    // url1 = ''
    // console.log(type)
    switch (type) {
      // 获取当前ip对应的天气
      case 'now': url2 = 'https://api.thinkpage.cn/v3/weather/now.json?key=v4vcbtzwf99dvnqh&location=beijing&language=zh-Hans&unit=c'
        break
      case 'daily': url2 = 'https://api.thinkpage.cn/v3/weather/daily.json?key=v4vcbtzwf99dvnqh&location=beijing&language=zh-Hans&unit=c&start=-1&days=5'
        break
      case 'hourly': url2 = 'https://api.thinkpage.cn/v3/weather/hourly.json?key=v4vcbtzwf99dvnqh&location=beijing&language=zh-Hans&unit=c&start=0&hours=24'
        break
      case 'air':url2 = 'air/now.json?key=v4vcbtzwf99dvnqh&location=beijing&language=zh-Hans&scope=city'
        url1 = 'https://crossorigin.me/https://api.seniverse.com/v3/'
        break
      case 'moon':url2 = 'moon.json?key=v4vcbtzwf99dvnqh&location=beijing&language=zh-Hans&start=0&days=7'
        url1 = 'https://crossorigin.me/https://api.seniverse.com/v3/geo/'
        break
      case 'sun':url2 = 'sun.json?key=v4vcbtzwf99dvnqh&location=beijing&language=zh-Hans&start=0&days=7'
        url1 = 'https://crossorigin.me/https://api.seniverse.com/v3/geo/'
        break
    }
    if (city) {
      url2 = url2.replace(/beijing/, city)
    } else {
      url2 = url2.replace(/beijing/, 'ip')
    }
    if (unit) {
      url2 = url2.replace(/unit=c/, 'unit=' + unit)
    }
    url = url1 + url2
    // console.log(url)
    vue.$http.get(url).then(
      function (response) {
        // console.log('action请求成功，结果如下')
        let weather = response.body.results[0]
        context.commit('setWeather', {results: weather, type: type})
      }, function (response) {
      console.log('action请求失败，结果如下')
    })
  },
  setCityWeather (context, {vue}) {
    let state = context.state.citys
    console.log(state)
    for (let i in state) {
      let city = i
      let url = 'https://crossorigin.me/https://api.thinkpage.cn/v3/weather/now.json?key=v4vcbtzwf99dvnqh&location=beijing&language=zh-Hans&unit=c'
      url = url.replace(/beijing/, city)
      vue.$http.get(url).then(
         function (response) {
           let weather = response.body.results[0]
           context.commit('setCityWeather', {attr: city, results: weather})
         }, function (response) {
        console.log('action请求失败，结果如下')
      }
      )
    }
  },
  deleteCity (context, {citys, self}) {
    context.commit('deleteCity', {citys: citys, self: self})
  },
  addCity (context, {city, self}) {
    context.commit('addCity', {city: city, self: self})
  },
  changeUnit (context, {unit, self}) {
    context.commit('changeUnit', {unit: unit, self: self})
  },
  changeNowCity (context, {city, self}) {
    context.commit('changeNowCity', {city: city, self: self})
  }
}
export default actions
/* export default {
  addTotalTime ({ commit }, time) {
    commit(types.ADD_TOTAL_TIME, time)
  },
  decTotalTime ({ commit }, time) {
    commit(types.DEC_TOTAL_TIME, time)
  },
  savePlan ({ commit }, plan) {
    commit(types.SAVE_PLAN, plan)
  },
  deletePlan ({ commit }, plan) {
    commit(types.DELETE_PLAN, plan)
  }
}
*/
