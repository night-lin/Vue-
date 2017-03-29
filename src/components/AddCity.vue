<template>
 <div id = "wrap">
    <div class= "add-city">
      <div class="top-nav">
        <div  class = "container-fluid">
          <router-link to="ManageCity"><i class="iconfont">&#xe675;</i></router-link>
          <span>添加城市</span>
        </div>
      </div>
        <div class="content">
          <form id = "search" class="font-middle" @submit.prevent =" findResult ()" >
            <input icon="close-round" id ="search_input" type="text" name = "search" placeholder = "请输入城市（拼音/中文）"class="city-search" @blur ="findResult()">
            <i @click="clearSearch()" class="iconfont delete-icon">&#xe67d;</i>
          </form>
           <template v-if="searchFlag" >
            <div class="nav-recommend font-small">
              <span v-if = "search_results.length>0">找到{{search_results.length}}个结果:</span>
              <span v-else-if = "search_results.length===0&&noResult">查询到0个结果</span>
              <span v-else>搜索中...</span>
            </div>
            <div class="search-result-city">
              <ul>
                <template v-for = "(item, index) in search_results">
                    <li @click ="addCity(item.name)"><span class="font-light">{{ item.name }}</span>:{{ item.path }}</li>
                </template>
              </ul>
            </div>
          </template>
          <template v-else="searchFlag" >
            <div class="nav-recommend font-middle">
                推荐城市
            </div>
            <div class="city-add-list font-middle">
              <ul>
                <Row>
                  <Col span ="8" >
                    <li @click = "fillInput( nowSity )" class= "font-gray">当前位置:{{ nowSity }}</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('北京')">北京</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('上海')" >上海</li>
                  </Col>
                </Row>
                <Row>
                  <Col span ="8" >
                    <li @click = "fillInput('广州')">广州</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('深圳')">深圳</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('天津')">天津</li>
                  </Col>
                </Row>

                <Row>
                  <Col span ="8" >
                    <li @click = "fillInput('武汉')">武汉</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('沈阳')">沈阳</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('重庆')">重庆</li>
                  </Col>
                </Row>
                <Row>
                  <Col span ="8" >
                    <li @click = "fillInput('杭州')">杭州</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('南京')">南京</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('哈尔滨')">哈尔滨</li>
                  </Col>
                </Row>
                <Row>
                  <Col span ="8" >
                    <li @click = "fillInput('长春')">长春</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('呼和浩特')">呼和浩特</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('石家庄')">石家庄</li>
                  </Col>
                </Row>
                <Row>
                  <Col span ="8" >
                    <li @click = "fillInput('银川')">银川</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('乌鲁木齐')">乌鲁木齐</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('拉萨')">拉萨</li>
                  </Col>
                </Row>
                <Row>
                  <Col span ="8" >
                    <li @click = "fillInput('西宁')">西宁</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('西安')">西安</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('兰州')">兰州</li>
                  </Col>
                </Row>
                <Row>
                  <Col span ="8" >
                    <li @click = "fillInput('太原')">太原</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('昆明')">昆明</li>
                  </Col>
                  <Col span ="8" >
                    <li @click = "fillInput('南宁')">南宁</li>
                  </Col>
                </Row>
              </ul>
            </div>
          </template>
        </div>
      
     </div>
 </div>
</template>
<script>
  export default {
    data () {
      return {
        searchFlag: false,
        noResult: false,
        search_results: []
      }
    },
    computed: {
      nowSity () {
        return this.$store.state.city_now
      }
    },
    methods: {
      searchValid () {
        this.searchFlag = true
        console.log(this.searchFlag)
      },
      searchInvalid () {
        this.searchFlag = false
        this.noResult = false
      },
      clearSearch () {
        let inputSearch = document.getElementById('search_input')
        inputSearch.value = ''
        this.search_results = []
        this.searchInvalid()
      },
      fillInput (value) {
        let inputSearch = document.getElementById('search_input')
        inputSearch.value = value
        this.findResult()
      },
      findResult () {
        // 先清空
        this.search_results = []
        let value = document.getElementById('search_input').value
        if (value.length > 0) {
          // 汉字
          var url = 'https://crossorigin.me/https://api.thinkpage.cn/v3/location/search.json?key=v4vcbtzwf99dvnqh' + '&q=' + value
          this.searchValid()
          this.$http.get(url).then(function (response) {
            console.log(response.body.results)
            let result = response.body.results
            for (let i = 0; i < result.length; i++) {
              this.search_results.push({name: result[i].name, path: result[i].path})
            }
            if (this.search_results.length === 0) {
              this.noResult = true
            }
          }, function (response) {
            console.log(response)
          })
        }
      },
      addCity (city) {
        this.$store.dispatch('addCity', {city: city, self: this})
        // this.clearSearch()
      }
    }
  }
</script>
