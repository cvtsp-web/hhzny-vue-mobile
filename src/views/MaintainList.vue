<template>
  <div class="page page-maintain">
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
        <p class="form-label">操作类型</p>
        <select class="form-control" v-model="opType">
          <option value="">全部</option>
          <option :value="item.value" v-for="(item,index) in opList" :key="index">{{item.name}}</option>
        </select>
      </div>
      <mt-button class="query-button" type="primary" size="large" @click="resetLoadData">查询</mt-button>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in dataList" :key="index">
        <div style="flex-grow: 1;">
          <p class="line">
            <span>设备ID：{{item.termId}}</span>
            <span class="status" v-if="item.operateType=='01'">设备挂起</span>
            <span class="status" v-if="item.operateType=='02'">设备启用</span>
            <span class="status" v-if="item.operateType=='03'">设备编辑</span>
            <span class="status" v-if="item.operateType=='04'">设备删除</span>
            <span class="status" v-if="item.operateType=='05'">设备新增</span>
            <span class="status" v-if="item.operateType=='06'">开门</span>
            <span class="status" v-if="item.operateType=='07'">关门</span>
            <span class="status" v-if="item.operateType=='08'">复位</span>
            <span class="status" v-if="item.operateType=='09'">消音</span>
            <span class="status" v-if="item.operateType=='10'">自检</span>
          </p>
          <p class="address" style="color:#999;">操作日期：{{item.operateDate}}</p>
        </div>
      </div>
    </div>
    <infinite-loading v-if="filterActive" spinner="circles" @infinite="loadData" :distance="500" ref="infiniteLoading">
      <span slot="no-more" class="no-more">没有更多数据了~</span>
      <span slot="no-results" class="no-more">没有更多数据了~</span>
    </infinite-loading>
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
      operator: '',
      termId: '',
      orgId: '',
      orgList: [],
      opType: '',
      opList: [
        {name: '设备挂起', value: '01'},
        {name: '设备启用', value: '02'},
        {name: '设备编辑', value: '03'},
        {name: '设备删除', value: '04'},
        {name: '设备新增', value: '05'},
        {name: '开门', value: '06'},
        {name: '关门', value: '07'},
        {name: '复位', value: '08'},
        {name: '消音', value: '09'},
        {name: '自检', value: '10'}
      ],
      dataList: [],
      filterActive: false
    }
  },
  components: {
    PageHeader,
    InfiniteLoading
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
    resetLoadData () {
      if (!this.orgId) return this.$emit('toast', {message: '请选择所属机构'})
      this.page = 1
      this.dataList = []
      this.filterActive = true
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },
    loadData ($state) {
      let params = null
      if (this.filterActive) {
        params = {
          page: this.page,
          limit: this.limit,
          orgId: this.orgId,
          termId: this.termId,
          operator: this.operator,
          operateType: this.opType
        }
      } else {
        params = {
          page: this.page,
          limit: this.limit,
          orgId: '',
          operator: '',
          termId: ''
        }
      }
      this.$axios.post(this.$urls.maintain.list, params)
        .then(({data: {status, data, ret_code: code, ret_msg: message}}) => {
          if (status === 500) {
            this.$emit('toast', {message: '登录状态失效，请重新登录'})
            this.$router.push('/login')
            return
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
    this.loadOrganization()
  }
}
</script>

<style scoped lang="scss">
  .page-maintain {
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
          justify-content: space-between;
          align-items: center;
          .item {
            border: 1px solid #ddd;
            padding: .1rem .2rem;
            font-size: 12px;
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
  }
</style>
