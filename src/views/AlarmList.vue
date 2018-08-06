<template>
  <div class="page page-alarm">
    <page-header></page-header>
    <div class="filter-container">
      <div class="form-group">
        <p class="form-label">所属机构</p>
        <select class="form-control" v-model="orgId">
          <option value="">请选择所属机构</option>
          <option :value="item.id" v-for="(item,index) in calOrgList" :key="index">{{item.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <p class="form-label">报警类型</p>
        <div class="check-list">
          <span :class="{active:alarmType==='1'}" @click="alarmType='1'" class="item">报警</span>
          <span :class="{active:alarmType==='2'}" @click="alarmType='2'" class="item">故障</span>
        </div>
      </div>
      <mt-button class="query-button" type="primary" @click="loadData" size="large">查询</mt-button>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in dataList" :key="index">
        <div style="flex-grow: 1;">
          <p class="line">
            <span>设备ID：{{item.sensorId}}</span>
            <span class="status">{{item.alarmCodeDesc}}</span>
          </p>
          <p class="address" style="color:#999;">{{item.installAddress}}&nbsp;&nbsp;{{item.alarmDate}}</p>
        </div>
      </div>
    </div>
    <p class="no-data" v-if="dataList.length===0&&isLoaded">找不到您要找的数据~</p>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import PageHeader from '../components/Header'

export default {
  data () {
    return {
      page: 1,
      limit: 10,
      orgId: '',
      orgList: [],
      dataList: [],
      alarmType: '1',
      isLoaded: false,
      filterActive: false
    }
  },
  computed: {
    calOrgList () {
      if (this.$parent.$data.orgId === '000001') {
        return this.orgList
      } else {
        let orgItem = this.orgList.find(item => item.id === this.$parent.$data.orgId)
        return [orgItem]
      }
    }
  },
  components: {
    PageHeader,
    InfiniteLoading
  },
  methods: {
    // 加载机构列表
    loadOrganization () {
      this.$axios.get(this.$urls.orgList)
        .then(({data: {status, data, ret_code: code, ret_msg: message}}) => {
          if (status === 500) {
            this.$emit('toast', {message: '登录状态失效，请重新登录'})
            this.$router.push('/login')
            return
          }
          if (code !== '00') {
            throw new Error(message)
          }
          this.orgList = data.orgidlist.map(item => {
            return {id: item.org_id, name: item.org_name}
          })
        })
        .catch(e => {
          this.$emit('toast', {message: e.message})
        })
    },
    loadData () {
      if (!this.orgId) {
        return this.$emit('toast', {message: '请选择所属机构'})
      }
      this.$loading.show()
      this.$axios.get(`/orgnizations/${this.orgId}/alarm?alarmType=${this.alarmType}`)
        .then(({data: res}) => {
          if (res.rspCode !== '0000') {
            throw new Error(res.rspMessage)
          }
          this.dataList = res.alarmDTOList
          this.isLoaded = true
          this.$loading.hide()
        })
        .catch(e => {
          this.$loading.hide()
          this.$emit('toast', {message: e.message})
        })
    }
  },
  created () {
    this.loadOrganization()
  }
}
</script>

<style scoped lang="scss">
  .page-alarm {
    padding-top: 44px;
    padding-bottom: .2rem;
    .filter-container {
      .form-group {
        padding: 0 .4rem;
        display: flex;
        background: #fff;
        margin-top: .2rem;
        .form-label {
          margin: 0 .4rem 0 0;
          line-height: 1rem;
        }
        .form-control {
          -webkit-appearance: none;
          flex-grow: 1;
          background: transparent;
          height: 1rem;
          border: none;
          outline: none;
        }
        .check-list {
          flex-grow: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .item {
            border: 1px solid #ddd;
            padding: .1rem .2rem;
            font-size: 12px;
            margin-right: .4rem;
            &.active {
              border: 1px solid #6CB132;
            }
          }
        }
      }
      .query-button {
        width: 6.4rem;
        margin: .2rem auto 0;
      }
    }
    .list {
      margin-top: .4rem;
      .item {
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

    .no-data {
      text-align: center;
      color: #666;
      margin-top: .2rem;
    }
  }
</style>
