<template>
  <header class="page-header">
    <div class="header-bar">
      <div @click="$router.replace('/overview')" class="header-item" :class="{active:$route.path==='/overview'}">机构概览
      </div>
      <div @click="$router.replace('/terminal/list')" class="header-item"
           :class="{active:$route.path==='/terminal/list'}">设备信息
      </div>
      <div @click="$router.replace('/alarm/list')" class="header-item" :class="{active:$route.path==='/alarm/list'}">
        报警信息
      </div>
      <div @click="$router.replace('/maintain/list')" class="header-item"
           :class="{active:$route.path==='/maintain/list'}">维保
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .page-header {
    width: 100%;
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: #fff;
    .logo {
      background: #fff;
      position: relative;
      z-index: 1;
      img {
        height: 40px;
        display: block;
        margin: auto;
      }
    }
    .header-bar {
      position: relative;
      top: -1px;
      background: #fff;
      display: flex;
      box-shadow: 0 1px 8px #ccc;
      justify-content: space-between;
      align-items: center;
    }
    .header-item {
      width: 25%;
      height: 100%;
      text-align: center;
      line-height: 44px;
      color: #333;
      text-decoration: none;
      &.active {
        border-bottom: 2px solid #6CB132;
      }
    }
  }
</style>
