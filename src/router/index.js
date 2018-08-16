import Vue from 'vue'
import Router from 'vue-router'
// 开发环境使用同步加载，生产环境使用懒加载，减小打包体积
const _import = require(process.env.NODE_ENV === 'production' ? './asyncImport.js' : './syncImport.js')

const Login = _import('Login')
const Index = _import('Index')

const Overview = _import('Overview')
const TerminalList = _import('TerminalList')
const SensorList = _import('SensorList')
const MaintainList = _import('MaintainList')
const AlarmList = _import('AlarmList')

const RealTime = _import('RealTime')
const EquipmentList = _import('EquipmentList')
const EquipmentDetail = _import('EquipmentDetail')
const Alarm = _import('Alarm')
const Report = _import('Report')
const Mine = _import('Mine')
const Introduction = _import('Introduction')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      redirect: '/realTime',
      component: Index,
      children: [
        {
          path: '/realTime',
          name: 'realTime',
          component: RealTime
        },
        {
          path: '/equipmentList',
          name: 'equipmentList',
          component: EquipmentList
        },
        {
          path: '/alarm',
          name: 'alarm',
          component: Alarm
        },
        {
          path: '/report',
          name: 'report',
          component: Report
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine
        }
      ]
    },
    {
      path: '/equipmentDetail',
      name: 'equipmentDetail',
      component: EquipmentDetail
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: Introduction
    },





    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/terminal/list',
      name: 'TerminalList',
      component: TerminalList,
      meta: {keepAlive: true}
    },
    {
      path: '/sensor/list',
      name: 'SensorList',
      component: SensorList
    },
    {
      path: '/maintain/list',
      name: 'MaintainList',
      component: MaintainList,
      meta: {keepAlive: true}
    },
    {
      path: '/alarm/list',
      name: 'AlarmList',
      component: AlarmList,
      meta: {keepAlive: true}
    },
    
    
  ]
})
