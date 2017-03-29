<template>
 <div id = "wrap">
  <div class = "manage-city">
    
   
      <div class="header">
        <div class="top-nav">
          <div class = "container-fluid">
            <template v-if="manageFlag">
              <Row>
                <Col span ="8" ><span @click = "manageValid(),delete_release()"><i class="iconfont">&#xe67d;</i></span></Col>
                <Col span ="8" class="tx-center">编辑城市</Col>
                <Col span ="8" class="tx-ri" ><span @click = "deleteCityAbs(),manageValid()"><i class="iconfont">&#xe610;</i></span></Col>
              </Row>
            </template>
            <template v-else="manageFlag">
              <Row>
                <Col span ="12" >
                  <router-link to="home"><i class="iconfont">&#xe675;</i></router-link>
                  <span>管理城市</span>
                </Col>
                <Col span ="10" class="tx-ri">
                    <span @click = "manageValid()"><i class="iconfont">&#xe606;</i></span>
                </Col>
                <Col span ="2" class="tx-ri">
                    <router-link to="AddCity"><i class="iconfont">&#xe61f;</i></router-link>
                </Col>
              </Row>
            </template>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="city-list">
          <ul>
              <template v-for="(item, index) in getCityWeather">
                <li @click ="changeNowCity(index)"  v-show ="showCity(index)">
                <div class="container-fluid">
                  <Row>
                    <Col span = "12" class="city-name">
                        <span class="font-middle">{{index}}</span>
                        <span class="font-middle">
                          <i v-if ="isNowCity(index)" class="iconfont">&#xe636;</i>
                        </span>
                    </Col>  
                      <template v-if="manageFlag">
                        <template v-if="getCitySet">
                          <Col span = "10" class=" city-weather tx-ri" v-if ="item" >
                            <p class="font-large"  >{{item.temperature }}°</p>
                            <p class="font-gray">{{item.text }}</p>
                          </Col>
                          <Col span = "2" class=" tx-ri">
                            <span class="delete-city" @click ="deleteCityTemp(index)">
                            <Icon type="ios-close" size="30"></Icon>
                            </span>
                          </Col>
                        </template>
                        <template v-else="getCitySet">
                          <Spin>
                            <span>加载中</span>
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                          </Spin>
                        </template>
                      </template>
                      <template v-else="manageFlag">
                        <template v-if="item">
                          <Col span = "12" class="city-weather tx-ri">
                            <p class="font-large">{{item.temperature }}°</p>
                            <p class="font-gray">{{item.text }}</p>
                          </Col>
                        </template>
                        <template v-else="item">
                          <Col span = "12" class="city-weather tx-ri">
                            <Spin>
                              <span>加载中</span>
                              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            </Spin>
                          </Col>
                        </template>
                      </template>
                    </Row>
                  </div>
                </li>
            </template>
          </ul>
          
        </div>
      </div>
    
  </div>
 </div> 
</template>
<script>
  import Home from './Home'
  export default {
    data () {
      return {
        manageFlag: false,
        delete_citys: []
      }
    },
    created () {
      this.$store.dispatch('setCityWeather', {vue: this})
    },
    component: Home,
    computed: {
      getCityWeather () {
        return this.$store.state.citys
      },
      getCitySet () {
        return this.$store.state.citySet
      }
    },
    methods: {
      isNowCity (city) {
        var nowCity = this.$store.state.city_now
        if (city === nowCity) {
          return true + ''
        } else {
          return false
        }
      },
      manageValid () {
        console.log(this.manageFlag)
        this.manageFlag = !this.manageFlag
      },
      deleteCityTemp (city) {
        this.delete_citys.push(city)
      },
      showCity (city) {
        if (this.delete_citys.indexOf(city) > -1) {
          return false
        } else {
          return true
        }
      },
      delete_release () {
        this.delete_citys = []
      },
      deleteCityAbs () {
        this.$store.dispatch('deleteCity', {citys: this.delete_citys, self: this})
        this.delete_release()
      },
      changeNowCity (city) {
        this.$store.dispatch('changeNowCity', {city: city, self: this})
      }
    }
  }
</script>
