export default {
  token: '/jwt/token',
  index: '/orgnizations/000001/summary',
  orgList: '/api/orgnization/getOrgIdList',
  terminal: {
    list: '/api/terminastatus/terstalist2'
  },
  sensor: {
    list: '/api/sensorStstusManager/queryList',
    detail: '/api/sensorAndTerm/querySensor'
  },
  maintain: {
    list: '/api/maintenanceInfo/queryList2'
  },
  alarm: {
    list: '/api/powerMonitoring/query'
  },


  realTime: {
    summary: '/wechat/summary',
    terminals: '/wechat/terminals'
  },
  equipment: {
    sensors: '/wechat/sensors'
  },
  alarmList: '/wechat/alarms',
  report: {
    hourlyDanger: '/wechat/hourlyDanger',
    weeklyDanger: '/wechat/weeklyDanger',
    monthlyDanger :'/wechat/monthlyDanger',
    weeklyEFSummary: '/wechat/weeklyEFSummary',
    hourlyEMSummary: '/wechat/hourlyEMSummary',
    monthlyEMSummary: '/wechat/monthlyEMSummary'
  }
}
