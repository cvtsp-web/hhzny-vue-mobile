<template>
  <div class="page page-index">
    <!-- <div class="menu-list">
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
    </div> -->
    <div class="pageWrap">
      <!-- <mt-tab-container v-model="selected">
        <mt-tab-container-item id="realTime">
          <div class="banner"></div>
          <RealTime></RealTime>
        </mt-tab-container-item>
        <mt-tab-container-item id="dataList">
          <Equipment></Equipment>
        </mt-tab-container-item>
        <mt-tab-container-item id="alarm">
          <Alarm></Alarm>
        </mt-tab-container-item>
        <mt-tab-container-item id="statement">
        </mt-tab-container-item>
        <mt-tab-container-item id="mine">
        </mt-tab-container-item>
      </mt-tab-container> -->
      <router-view />
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="realTime">
          <img slot="icon">
          实时
        </mt-tab-item>
        <mt-tab-item id="equipmentList">
          <img slot="icon">
          数据
        </mt-tab-item>
        <mt-tab-item id="alarm">
          <img slot="icon">
          报警
        </mt-tab-item>
        <mt-tab-item id="report">
          <img slot="icon">
          报表
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      selected: 'realTime'
    }
  },
  watch: {
    selected(newVal) {
      this.$router.push(newVal);
    },
    '$route.name': {
      immediate: true,
      handler(newVal) {
        this.selected = newVal;
      }
    }
  }
}
</script>

<style lang="scss">
  // .tabBar {
  //   z-index: 10;
  // }
  // .mint-tabbar {
  //   z-index: 10;
  // }
  // .is-fixed {
  //   z-index: 10;
  // }
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
