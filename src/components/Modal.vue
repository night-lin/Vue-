<template>
  <div>
    <transition name="fade">
      <div class="modal" v-show="show">
          <div class="modal-confirm-dialog">
              <div class="modal-confirm-content">
                  <!--头部-->
                  <div class="modal-confirm-header">
                      <slot name="header">
                          <p class="title">{{modal.title}}</p>
                      </slot>
                      <a v-on:click="close()" class="close" href="javascript:void(0)"></a>
                  </div>
                  <!--内容区域-->
                  <div class="modal-confirm-body">
                      <slot name="body">
                        <div v-html="modal.text"></div>
                          
                      </slot>
                  </div>
                  <!--尾部,操作按钮-->
                  <div class="modal-confirm-footer">
                      <slot name="button">
                      <template v-if="modal.showCancelButton">
                        <div class="modal-confirm-btn">
                          <a  href="javascript:void(0)"   v-on:click="close(1)">{{modal.cancelButtonText}}</a>
                        </div> 
                      </template>
                      <template v-if="modal.showConfirmButton">
                        <div class="modal-confirm-btn">
                          <a class="modal-confirm-btn" href="javascript:void(0)" v-on:click="submit">{{modal.confirmButtonText}}</a>
                        </div>  
                      </template>
                      </slot>
                  </div>
              </div>
          </div>
      </div>
    </transition>
    <div v-show="show" class="modal-backup" ></div>
  </div>
</template>  
<script>
export default {
    /**
  * modal 模态接口参数
  * @param {string} modal.title 模态框标题
  * @param {string} modal.text 模态框内容
  * @param {boolean} modal.showCancelButton 是否显示取消按钮
  * @param {string} modal.cancelButtonClass 取消按钮样式
  * @param {string} modal.cancelButtonText 取消按钮文字
  * @param {string} modal.showConfirmButton 是否显示确定按钮
  * @param {string} modal.confirmButtonClass 确定按钮样式
  * @param {string} modal.confi
  */
  props: ['modalOptions', 'unit'],
  computed: {
      /**
      * 格式化props进来的参数,对参数赋予默认值
      */
    modal: {
      get () {
        let modal = this.modalOptions
        modal = {
          title: modal.title || '提示',
          text: modal.text,
          showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton,
          cancelButtonClass: modal.cancelButtonClass ? modal.showCancelButton : 'btn-default',
          cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消',
          showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.cancelButtonClass,
          confirmButtonClass: modal.confirmButtonClass ? modal.confirmButtonClass : 'btn-active',
          confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定'
        }
        return modal
      }
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    submit () {
      this.resolve('submit')
    },
    close () {
      this.show = false
    },
    // 显示confirm弹出
    confirm () {
      this.show = true
    }
  }
}
</script>
