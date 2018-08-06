<template>
  <div class="page page-index">
    <page-header></page-header>
    <div class="overview">
      <h3 class="title">机构概览</h3>
      <div class="detail">
        <p class="line"><span>机构编号:</span>{{orgInfo.orgId}}</p>
        <p class="line"><span>机构名称:</span>{{orgInfo.orgName}}</p>
        <p class="line"><span>报警总数:</span>{{orgInfo.alarmCount}}个</p>
        <p class="line"><span>维保总数:</span>{{orgInfo.maintenaceCount}}条</p>
        <p class="line"><span>设备总数:</span>{{orgInfo.termCount}}个</p>
        <p class="line"><span>传感器总数:</span>{{orgInfo.sensorCount}}个</p>
      </div>
    </div>
    <div class="sensor">
      <h3 class="title">传感器详情</h3>
      <div class="detail">
        <p class="total"><span class="f24">{{orgInfo.sensorCount}}</span><br>总数</p>
        <div class="list">
          <p>{{orgInfo.sensorNormalCount||0}}<br>正常</p>
          <p>{{orgInfo.sensorFaultCount||0}}<br>故障</p>
          <p>{{orgInfo.sensorAlarmCount||0}}<br>报警</p>
          <p>{{orgInfo.sensorConnFaultCount||0}}<br>断网</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/Header'

export default {
  components: {PageHeader},
  data () {
    return {
      orgInfo: ''
    }
  },
  methods: {
    loadData () {
      this.$axios.get(`/orgnizations/${this.$parent.$data.orgId}/summary`)
        .then(({data: res}) => {
          this.orgInfo = res
        })
        .catch(e => {
          this.$emit('toast', {message: e.message})
        })
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
  .page-index {
    padding-top: 44px;
    color: #333;
    .overview {
      padding: 0 .4rem;
      .detail {
        border-radius: 5px;
        box-shadow: 1px 1px 8px #ddd;
        padding: .2rem;
        background: #fff;
        .line {
          padding: 0 .2rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span:nth-child(1) {
            min-width: 78px;
            text-align: right;
            margin-right: .2rem;
          }
        }
      }
    }
    .sensor {
      padding: .4rem;
      .detail {
        border-radius: 5px;
        box-shadow: 1px 1px 8px #ddd;
        background: #fff;
        padding: .4rem .2rem;
        text-align: center;
        line-height: 20px;
        p {
          margin: 0;
        }
        .f24 {
          font-size: 28px;
        }
        .list {
          margin-top: .2rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
</style>
