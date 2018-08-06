<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" @toast="toast" @orgid="setOrgId">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" @toast="toast" @orgid="setOrgId">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  name: 'App',
  data () {
    return {
      orgId: ''
    }
  },
  methods: {
    setOrgId (id) {
      this.orgId = id
    },
    /**
     * 弹出toast
     * @param {object} args - 参数对象
     * @param {string} args.message - 提示信息
     */
    toast (args) {
      Toast({
        message: args.message || '',
        // duration为 -1 则不会自动关闭
        duration: args.duration || 1500,
        // top bottom middle
        position: args.position || 'middle'
      })
    }
  },
  created () {
    if (!this.orgId) {
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="scss">
  @import "~normalize.css";

  /*
   * 页面一些样式
   */

  html {
    background: #F5F5F5;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0 auto;
    min-width: 320px;
    max-width: 480px;
    color: #000;
    font-size: 14px;
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
  }

  .f12 {
    font-size: 12px;
  }

  .f14 {
    font-size: 14px;
  }

  .f16 {
    font-size: 16px;
  }

  .f18 {
    font-size: 18px;
  }

  .f20 {
    font-size: 20px;
  }

  .mint-button--primary {
    background: #6CB132;
  }

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: auto;
  }
</style>
