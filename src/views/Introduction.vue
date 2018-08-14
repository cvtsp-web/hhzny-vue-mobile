<template>
  <div class="page page-intro">
    <!-- <div class="logo">
      <img src="../assets/img/logo.png" alt="logo">
    </div> -->
    <div class="banner"></div>
    <h1 class="title">平台介绍</h1>
    <div class="content">
      <p>上海汇鸿智能控制系统股份有限公司是专业从事电气安全、节能和电力设备智能控制系统的研发、制造、销售的高新技术企业。长期以来，我们致力于为用户提供优质的产品及系统化的解决方案。</p>
      <p>“质量是生存之本，创新是发展之源”是我们的一贯宗旨：“安全、控制、能效”是我们的长期发展方向。公司已通过ISO 9001:2008质量体系认证及国家CCC认证。</p>
      <p>公司高度重视技术创新和产品质量，拥有一支潜心钻研、追求创新的研发团队和一支勤奋高效、锐意进取的销售团队。公司坚信：完善的质量管理体系，严格的工艺管理和品质检测，是产品质量的最大保障。</p>
      <p>本着技术领先、品质求精、诚信为本、客户第一的理念，公司在全国各地区设立了办事处，竭诚为各地客户提供产品信息和技术支持、提供优质的售前和售后服务，上海汇鸿将持续发展、不懈努力，让我们的产品与您的事业共创辉煌！</p>
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
  .page-intro {
    .banner {
        width: 100%;
        height: 3.84rem;
        background: url("../assets/img/banner.png") center center / 100% 100% no-repeat;
    }
    .content {
      background: #fff;
      padding: .2rem 0;
    }
  }

  .title {
    padding-left: .2rem;
    font-size: 20px;
  }

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

  p {
    padding: 0 .2rem;
    text-indent: 28px;
    line-height: 22px;
  }
</style>
