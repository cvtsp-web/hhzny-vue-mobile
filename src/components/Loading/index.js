import LoadingComponent from './Loading.vue'

let $vm
const LoadingPlugin = {
  install: function (Vue) {
    const Loading = Vue.extend(LoadingComponent)
    if (!$vm) {
      $vm = new Loading({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    Vue.loading = {
      show (mask) {
        $vm.show = true
        $vm.mask = mask
      },
      hide () {
        $vm.show = false
        $vm.mask = false
      }
    }

    Vue.mixin({
      created () {
        this.$loading = Vue.loading
      }
    })
  }
}

export default LoadingPlugin
