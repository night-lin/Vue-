<template>
  <div id="wrap">
    <div class="home">
      <div class="container-fluid">
        <div class="header">
          <nav class="top-nav">
            <Row>
              <Col span="8">
              <router-link to="ManageCity"><i class="iconfont">&#xe66b;</i></router-link>
              </Col>
              <Col span="8">
              <p class="tx-center"><span v-if='location'>{{location }}</span><span v-else='location'>加载中...</span><i class="iconfont">&#xe636;</i></p>
              </Col>
              <Col span="8">
              <router-link class="fr" to="/Setting"><i class="iconfont">&#xe619;</i></router-link>
              </Col>
            </Row>
          </nav>
        </div>
        <div class="content">
          <div class="now-state">
          <template v-if="!now||!daily||!air||!hourly">
              <Spin fix>
                <Icon type="load-c" size=5 class="demo-spin-icon-load"></Icon>
                <div>数据加载中...</div>
              </Spin>
            </template>
            <template v-if="now&&daily&&air">
              <p><span class="font-xx-large">{{  now.temperature }}°</span></p>
              <p><span class="font-large">{{ now.text }}</span></p>
              <p><span class="font-middle">{{ daily[2].high}}°/<span class="font-gray">{{ daily[2].low}}°</span ></span></p>
              <p><span class="font-middle">空气{{ air.city.quality }}</span></p>
            </template>
           
            <div class="last-update">
              <span class="font-gray font-x-small" v-if="lastUpdate">{{ lastUpdate.match(/T(\S*)(\s*)\+/)[1] }}更新</span>
             
            </div>
          </div>
          <div class="today-weather">
            <ul>
              <template v-if="hourly">
                <li v-for="(item, index) in hourly">
                  <div class="font-small hourly-time font-gray">{{ item.time.match(/T(\S*)(\s*):00\+/)[1] }}</div>
                  <div class="font-small "><img :src=imgUrl(item.code) width="30"></div>
                  <div class="font-small">{{ item.temperature }}°</div>
                </li>
              </template>
             
            </ul>
          </div>
          <div class="week-weather">
            <ul class="week-weather-list">
              <template v-if="daily">
                <li v-for="(item, index) in daily">
                  <Row>
                    <Col span="8" class="font-small daily-date tx-le"> <span>{{ item.date }}</span>
                    </Col>
                    <Col span="8" class="daily-date col-xs-4 tx-center">
                      <img :src="imgUrl(item.code_day)" width="40">
                    </Col>
                    <Col span="8" class="font-small daily-date col-xs-4 tx-ri"> 
                    <span>{{ item.high}}° /</span>
                    <span class="font-gray">
                          {{item.low}}
                        </span>
                    </Col>
                  </Row>
                </li>
              </template>
           
            </ul>
          </div>
          <div class="wind-state">
            <p class="font-middle">风向风力</p>
            <Row>
              <Col class="wind-icon" span="12">
                <i class="iconfont rotate-wind font-xx-large">&#xe608;</i>
                <i class="iconfont rotate-wind font-x-large">&#xe608;</i>
              </Col>
              <Col class="wind-level" span="12">
                <div v-if="now"><span class="font-gray">风向 &nbsp;  </span> {{ now.wind_direction}} </div>
                <div v-else="now"><span class="font-gray">风向&nbsp;  </span>加载中...</div>
                <div v-if="now"><span class="font-gray">风力&nbsp;  </span>{{windLevel(now.wind_scale)}} </div>
                <div v-else="now"><span class="font-gray">风力 &nbsp; </span>加载中...</div>
              </Col>
            </Row>
            <img></img>
          </div>
          <div class="moon-state">
            <i class="iconfont">&#xe601;</i><span v-if="moon"> &nbsp;{{moon[0].phase_name}}</span>
            <span class="font-gray" v-else="moon">加载中...</span>
          </div>
          <div class="sun-state">
            <div class ="sun-box">
              <div class="semi-circle">
                <Icon class="rotate-sun" type="ios-sunny" size="30" color="#f9df16"></Icon>
                <span class="sun-text">日出日落</span>
              </div>
            </div>
            <Row class="sun-time">
              <Col span = "12" v-if="sun">{{sun[0].sunrise}}  </Col> 
              <Col span = "12" class="tx-ri" v-if="sun"> {{sun[0].sunset}}  </Col> 
              <span class="font-gray" v-else="sun">加载中...</span>
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      // 通过ip获取当前的天气情况和地理定位，存入state中
      this.$store.dispatch('setWeather', {vue: this, type: 'now', city: this.$store.state.city_now, unit: this.$store.state.temperature_unit})
      // 通过ip获取一周的天气情况和地理定位，存入state中
      this.$store.dispatch('setWeather', {vue: this, type: 'daily', city: this.$store.state.city_now, unit: this.$store.state.temperature_unit})
      // 通过ip获取24小时的天气情况和地理定位，存入state中
      this.$store.dispatch('setWeather', {vue: this, type: 'hourly', city: this.$store.state.city_now, unit: this.$store.state.temperature_unit})
      // 通过ip获取空气情况，存入state中
      this.$store.dispatch('setWeather', {vue: this, type: 'air', city: this.$store.state.city_now, unit: this.$store.state.temperature_unit})
      // 通过ip获取月亮，存入state中
      this.$store.dispatch('setWeather', {vue: this, type: 'moon', city: this.$store.state.city_now, unit: this.$store.state.temperature_unit})
      // 通过ip获取日出日落，存入state中
      this.$store.dispatch('setWeather', {vue: this, type: 'sun', city: this.$store.state.city_now, unit: this.$store.state.temperature_unit})
    },
    data () {
      return {
        manageFlag: false,
        hide_citys: [],
        delete_citys: []
      }
    },
    computed: {
      lastUpdate () {
        return this.$store.state.last_update
      },
      location () {
        return this.$store.state.city_now
      },
      now () {
        return this.$store.state.now
      },
      daily () {
        return this.$store.state.daily
      },
      hourly () {
        var items = this.$store.state.hourly
        return items
      },
      air () {
        return this.$store.state.air
      },
      moon () {
        return this.$store.state.moon
      },
      sun () {
        return this.$store.state.sun
      }
    },
    methods: {
      imgUrl (code) {
        return '../static/3d_60/' + code + '.png'
      },
      windLevel (code) {
        switch (code) {
          case '0':
            return '无风'
          case '1':
            return '软风'
          case '2':
            return '轻风'
          case '3':
            return '微风'
          case '4':
            return '和风'
          case '5':
            return '劲风'
          case '6':
            return '强风'
          case '7':
            return '疾风'
          case '8':
            return '大风'
          case '9':
            return '烈风'
          case '10':
            return '狂风'
          case '11':
            return '暴风'
          case '12':
            return '飓风'
        }
      }
    }
}
</script>
