<template>
  <div class="page page-terminal">
    <page-header></page-header>
    <div class="filter-container">
      <div class="form-group">
        <p class="form-label">所属机构</p>
        <select class="form-control" v-model="orgName">
          <option value="">请选择所属机构</option>
          <option :value="item.name" v-for="item in calOrgList" :key="item.name">{{item.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <p class="form-label">终端状态</p>
        <div class="check-list">
          <span :class="{active:termStatus==''}" @click="termStatus=''" class="item">全部</span>
          <span :class="{active:termStatus=='00'}" @click="termStatus='00'" class="item">正常</span>
          <span :class="{active:termStatus=='01'}" @click="termStatus='01'" class="item">异常</span>
          <span :class="{active:termStatus=='03'}" @click="termStatus='03'" class="item">断网</span>
        </div>
      </div>
      <mt-button class="query-button" type="primary" size="large" @click="resetLoadData">查询</mt-button>
    </div>
    <div class="list">
      <div class="item" v-for="item in dataList" :key="item.termId">
        <router-link class="mask"
                     :to="'/sensor/list?termId='+item.termId+'&termName='+item.termName+'&lastUploadDate='+item.lastUploadDate"></router-link>
        <div class="color blue" v-if="item.termStatus=='00'"></div>
        <div class="color red" v-if="item.termStatus=='01'"></div>
        <div class="color gray" v-if="item.termStatus=='03'"></div>
        <div style="flex-grow: 1;">
          <p class="line">
            <span>编号：{{item.termId}}</span>
            <span class="status" v-if="item.termStatus=='00'">正常</span>
            <span class="status" v-if="item.termStatus=='01'">异常</span>
            <span class="status" v-if="item.termStatus=='03'">断网</span>
          </p>
          <p class="address">{{item.systemType}} &nbsp;&nbsp; </p>
          <p class="address">安装地址：{{item.installAddress||'暂无'}}</p>
        </div>
        <i class="arrow"></i>
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
      limit: 20,
      termStatus: '',
      orgName: '',
      orgNameList: [],
      dataList: [],
      orgList: [],
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
    resetLoadData () {
      if (!this.orgName) {
        return this.$emit('toast', {message: '请选择所属机构'})
      }
      this.page = 1
      this.dataList = []
      this.filterActive = true
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },
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
    loadData ($state) {
      if (!this.filterActive) {
        return
      }
      let params = {
        page: this.page,
        limit: this.limit,
        termStatus: this.termStatus,
        orgName: this.orgName
      }
      this.$axios.get(this.$urls.terminal.list, {params: params})
        .then(({data: {status, data, orgname: orgNameList, ret_code: code, ret_msg: message}}) => {
          if (status === 500) {
            this.$emit('toast', {message: '登录状态失效，请重新登录'})
            this.$router.push('/login')
            return
          }
          if (code !== '00') {
            throw new Error(message)
          }
          this.page++
          this.orgNameList = orgNameList
          this.dataList = this.dataList.concat(data.list)
          $state.loaded()
          if (data.list.length < this.limit) {
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

<style lang="scss" scoped>
  .page-terminal {
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
        position: relative;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem .4rem .2rem .6rem;
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
  }
</style>
