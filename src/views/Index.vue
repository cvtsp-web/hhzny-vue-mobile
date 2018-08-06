<template>
  <div class="page page-index">
    <div class="banner"></div>
    <div class="menu-list">
      <div class="item">
        <router-link class="mask" to="/overview"></router-link>
        <img src="../assets/img/overview.png" alt="overview">
        <p>机构概览</p>
      </div>
      <div class="item">
        <router-link class="mask" to="/alarm/list"></router-link>
        <img src="../assets/img/alarm.png" alt="alarm">
        <p>报警信息</p>
      </div>
      <div class="item">
        <router-link class="mask" to="/terminal/list"></router-link>
        <img src="../assets/img/terminal.png" alt="terminal">
        <p>设备信息</p>
      </div>
      <div class="item">
        <router-link class="mask" to="/maintain/list"></router-link>
        <img src="../assets/img/maintain.png" alt="maintain">
        <p>维保信息</p>
      </div>
      <div class="item">
        <router-link class="mask" to="/introduction"></router-link>
        <img src="../assets/img/introduction.png" alt="introduction">
        <p>平台介绍</p>
      </div>
      <div class="item">
        <router-link class="mask" to="/introduction"></router-link>
        <img src="../assets/img/service.png" alt="service">
        <p>服务窗口</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .banner {
    width: 100%;
    height: 3.84rem;
    background: url("../assets/img/banner.png") center center / 100% 100% no-repeat;
  }

  .menu-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding: .7rem .5rem;
    background: url("../assets/img/bg.jpg") center center / cover no-repeat;
    .item {
      position: relative;
      color: #fff;
      text-align: center;
      font-size: 16px;
      margin-top: .4rem;
      &:nth-child(1),
      &:nth-child(2) {
        margin: 0;
      }
      img {
        width: 2.3rem;
        height: 2.3rem;
        display: block;
      }
      p {
        margin: .1rem 0 0;
      }
    }
  }
</style>
