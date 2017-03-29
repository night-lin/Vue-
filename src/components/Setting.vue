<template>
 <div id = "wrap">
    <div class= "set">
        <div class="top-nav">
          <div  class = "container-fluid">
            <router-link to="/Home"><i class="iconfont">&#xe675;</i></router-link>
            <span>设置</span>
          </div>
        </div>
        <div class="content">
          <div class="set-list">
            <div  class = "container-fluid">
              <ul>
                <li @click = "modalStatr()" >
                  <Row>
                    <Col span = "12">
                      <span class="font-middle">温度设置</span>
                    </Col> 
                    <Col span = "12" class="tx-ri">
                      <span class="font-gray font-middle text-upper">{{ unit }}°</span>
                      <span class="font-middle "><i class ="iconfont">&#xe609;</i></span>
                    </Col> 
                  </Row>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
    <div class="set-dialog">
      <modal  :modalOptions="options" :unit ="unit" ref="dialog">
        <template slot ="body">
          <div class="tempera-unit">
            <ul>
              <li class="row">
                <Row>
                  <Col span="22" class="tx-le">
                    <label for="C">°C</label>
                  </Col>
                  <Col span="2" class=" tx-ri">
                    <input class="unit-radio" type="radio" id="C" name = "unit"  value="c" v-model="unit">
                  </Col>
                </Row>
              </li>
              <li>
              <Row>
                <Col span="22">
                  <label for="F">°F</label>
                </Col>
                <Col span="2" class=" tx-ri">
                  <input name = "unit" class="unit-radio" type="radio" id="F" value="f" v-model="unit">
                </Col>
                </Row>
              </li>
            </ul>
          </div>
        </template>
      </modal>
    </div>
 </div>
</template>
<script>
  // var selectHtml = ''
  import Modal from './Modal'
  export default {
    data () {
      return {
        unit: this.getUnit(),
        options: {
          title: '温度单位',
          showConfirmButton: false
        }
      }
    },
    components: {'modal': Modal},
    methods: {
      modalStatr () {
        this.$refs.dialog.confirm()
      },
      getUnit () {
        return (this.$store.state.temperature_unit)
      }
    },
    watch: {
      unit () {
        this.$store.dispatch('changeUnit', {unit: this.unit, self: this})
      }
    }
}
</script>
