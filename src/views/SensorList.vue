<template>
  <div class="page page-sensor">
    <page-header></page-header>
    <div class="overview">
      <div class="detail">
        <p class="line"><span>终端编号</span><span>{{termId}}</span></p>
        <p class="line"><span>设备名称</span><span>{{termName}}</span></p>
        <p class="line"><span>报警数量</span><span>{{alarmCount||0}}</span></p>
        <p class="line"><span>故障数量</span><span>{{exceptionCount||0}}</span></p>
        <p class="line"><span>最后上送日期</span><span>{{lastUploadDate}}</span></p>
      </div>
    </div>
    <div class="list">
      <div class="item" @click="showSensorDetail(item)" v-for="(item,index) in dataList" :key="index">
        <div class="color blue" v-if="item.sensorStatus==='00'"></div>
        <div class="color red" v-if="item.sensorStatus==='01'"></div>
        <div class="color yellow" v-if="item.sensorStatus==='02'"></div>
        <div class="color gray" v-if="item.sensorStatus==='03'"></div>
        <div style="flex-grow: 1;">
          <p class="line">
            <span>{{item.sensorId}}</span>
            <span class="status" v-if="item.sensorStatus=='00'">正常</span>
            <span class="status" v-if="item.sensorStatus=='01'">故障</span>
            <span class="status" v-if="item.sensorStatus=='02'">警告</span>
            <span class="status" v-if="item.sensorStatus=='03'">断网</span>
          </p>
          <p class="address" style="color:#999;">安装地址：{{item.sensorAddress}}</p>
        </div>
      </div>
    </div>
    <infinite-loading spinner="circles" @infinite="loadData" :distance="500" ref="infiniteLoading">
      <span slot="no-more" class="no-more">没有更多数据了~</span>
      <span slot="no-results" class="no-more">没有更多数据了~</span>
    </infinite-loading>

    <mt-popup
      v-if="sensorDetail"
      v-model="popupVisible"
      popup-transition="popup-fade"
      class="popup-window">
      <div class="popup-content">
        <i class="close" @click="popupVisible=false"></i>
        <p class="title">探测器信息</p>
        <p class="line"><span>所属子系统</span><span>{{sensorDetail.sysType}}</span></p>
        <p class="line"><span>传感器编号</span><span>{{sensorDetail.sensorId}}</span></p>
        <p class="line"><span>安装位置</span><span>{{sensorDetail.sensor_address}}</span></p>
        <p class="line"><span>传感器规格</span><span>{{sensorDetail.sensor_specification}}</span></p>
        <p class="line"><span>功能</span><span>{{sensorDetail.functionCode}}</span></p>
        <p class="line"><span>支路</span><span>{{sensorDetail.routeNo}}</span></p>
        <p class="line"><span>表等级</span><span>{{sensorDetail.tableLevel||0}}</span></p>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import PageHeader from '../components/Header'

export default {
  data () {
    return {
      page: 1,
      limit: 20,
      orgId: '',
      sysType: '',
      termId: '',
      termName: '',
      lastUploadDate: '',
      dataList: [],
      alarmCount: '',
      exceptionCount: '',
      popupVisible: false,
      sensorDetail: null
    }
  },
  components: {
    PageHeader,
    InfiniteLoading
  },
  methods: {
    loadNum () {
      this.$axios.get('/api/terminalmaintain/queryExceptionCount?termId=' + this.termId)
        .then(({data: res}) => {
          console.log(res)
          this.alarmCount = res.alarm
          this.exceptionCount = res.exception
        })
        .catch(e => {})
    },
    loadDetail (sensorId) {
      this.$axios.post(this.$urls.sensor.detail, {sensorId: sensorId})
        .then(({data: {status, data, ret_code: code, ret_msg: message}}) => {
          if (status === 500) {
            this.$router.push('/login')
            throw new Error('登录状态失效，请重新登录')
          }
          if (code !== '00') {
            throw new Error(message)
          }
          this.sensorDetail = data
          this.popupVisible = true
          this.$loading.hide()
        })
        .catch(err => {
          this.$loading.hide()
          this.$emit('toast', {message: err.message})
        })
    },
    showSensorDetail (item) {
      this.$loading.show()
      this.loadDetail(item.sensorId)
    },
    loadData ($state) {
      let params = {
        page: this.page,
        limit: this.limit,
        orgId: '',
        sysType: '',
        termId: this.termId,
        termName: ''
      }
      this.$axios.post(this.$urls.sensor.list, params)
        .then(({data: {status, data, ret_code: code, ret_msg: message}}) => {
          if (status === 500) {
            this.$router.push('/login')
            throw new Error('登录状态失效，请重新登录')
          }
          if (code !== '00') {
            throw new Error(message)
          }
          this.dataList = this.dataList.concat(data)
          $state.loaded()
          this.page++
          if (data.length < this.limit) {
            $state.complete()
          }
        })
        .catch(e => {
          this.$emit('toast', {message: e.message})
        })
    }
  },
  created () {
    this.termId = this.$route.query.termId
    this.termName = this.$route.query.termName
    this.lastUploadDate = this.$route.query.lastUploadDate
    this.loadNum()
  }
}
</script>

<style scoped lang="scss">
  .page-sensor {
    padding-top: 44px;
    padding-bottom: .2rem;
    .overview {
      padding: .4rem .2rem;
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
    .list {
      .item {
        position: relative;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem .4rem;
        background: #fff;
        border-bottom: 1px solid #ddd;
        &:nth-last-child(1) {
          border: none;
        }
        .color {
          position: absolute;
          left: 0;
          width: 10px;
          height: 100%;
          &.red {
            background: #FB0006;
          }
          &.blue {
            background: #0F84FE;
          }
          &.yellow {
            background: yellow;
          }
          &.gray {
            background: #C1C1C1;
          }
        }
        .line {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .status {
            margin-left: .8rem;
          }
        }
        i.arrow {
          width: .16rem;
          height: .3rem;
          background: url("../assets/img/arrow-right.png") center center /100% 100% no-repeat;
        }
      }
    }

    .popup-window {
      width: 90%;
      .popup-content {
        padding: .4rem;
        position: relative;
        .close {
          width: .5rem;
          height: .5rem;
          background: url("../assets/img/close.png") center center / 100% 100% no-repeat;
          display: block;
          position: absolute;
          right: .2rem;
          top: .2rem;
        }
        .title {
          text-align: center;
          font-size: 20px;
        }
        .line {
          display: flex;
          justify-content: flex-start;
          span:nth-child(1) {
            flex-shrink: 0;
            width: 78px;
            text-align: right;
            margin-right: .2rem;
          }
          span:nth-child(2) {
            flex-grow: 1;
          }
        }
      }
    }
  }
</style>
