<template>
     <!-- <alarm-currenttwelve ref="alarm_chart" 
        :ctitle="title" 
        :capi="api"
        :cparams="params"
        :cdetailReturnData="detailReturnData">
            <span>设备：</span>
            <select @change="handlerChange" style="fontWeight: normal;fontSize: 15px;marginRight: 10px;">
                <option 
                v-for="(list, index) in selectLists" 
                :key="index" 
                >{{list.sensorId}}</option>
            </select>
    </alarm-currenttwelve> -->
     <div class="content">
        <h3 style="marginLeft: .3rem">{{title}} 
            <div style="float:right">
                <span>设备：</span>
                <select @change="handlerChange" style="fontWeight: normal;fontSize: 15px;marginRight: 10px;">
                    <option 
                    v-for="(list, index) in selectLists" 
                    :key="index" 
                    >{{list.sensorId}}</option>
                </select>
            </div>
        </h3>
        <div ref="chartScopeMonth" style="height: 6rem"></div>
    </div>
</template>

<script>
    // import AlarmCurrenttwelve from './alarm-currenttwelve.vue'
    import echarts from 'echarts'

    export default {
        // components: {AlarmCurrenttwelve},
        data() {
            return {
                title: '最近一周电气火灾通道值汇总',
                api: this.$urls.report.weeklyEFSummary,
                params: {
                    apiVersion: '1.0', 
                    orgId: localStorage.getItem('orgId'),
                    sensorId: null 
                },
                selectLists: [],
                chartData: {},
                chart: null,
                defaultOptions: {
                    grid: {
                        // top: '70px',
                        // left: '10%',
                        // right: '40px',
                        bottom: '10%',
                        containLabel: true
                    },
                    yAxis : [
                        {
                            type : 'value',
                            name : '数量',
                            axisLabel : {
                                formatter: '{value}'
                            }
                        }
                    ]
                },
                weekTimer: null
            }
        },
        methods: {
            //获取设备列表
            getSensors(){
                this.$axios.get(this.$urls.report.efSensors, {
                    params: this.params
                })
                .then(({data: res}) => {
                    if(res.rspCode === '0000'){
                        this.selectLists = res.sensorList;
                        this.params = {
                            ...this.params,
                            sensorId: res.sensorList[0].sensorId
                        }
                        this.chart = echarts.init(this.$refs['chartScopeMonth']);
                        this.getChartReturnData();
                    }
                })
                .catch(e => {
                    this.$emit('toast', {message: e.rspMessage})
                })
            },
            handlerChange(e) {
                this.params = {
                    ...this.params,
                    sensorId: e.target.value
                }
                this.getChartReturnData();
            },
            //获取当前时间
            getCurrent(){
                const nowYear = moment().year();
                const nowMonth = moment().month(); 
                const nowDate = moment().date();
                const nowDay = moment().day();
                let arr = [nowDay];
                let now = moment();
                for(let i = 0; i < 6; i++){
                    now = now.subtract(1, 'days');
                    arr.push(now.day());
                }
                arr = arr.reverse().map(item => {
                    if(item === 0){
                        item = '周日'
                    }else if(item === 1){
                        item = '周一'
                    }else if(item === 2){
                        item = '周二'
                    }else if(item === 3){
                        item = '周三'
                    }else if(item === 4){
                        item = '周四'
                    }else if(item === 5){
                        item = '周五'
                    }else if(item === 6){
                        item = '周六'
                    }
                    return item;
                })
                return arr;
            },
            getChartReturnData(){
                 this.$axios.get(this.api, {
                    params: this.params
                })
                .then(({data: res}) => {
                    if(res.rspCode === '0000'){
                        this.detailReturnData(res);
                        this.weekTimer = setTimeout(() => {
                            this.getChartReturnData()
                        },3000)
                    }
                })
                .catch(e => {
                    this.$emit('toast', {message: e.rspMessage})
                })
            },
            detailReturnData(mess) {
                let data = [];
                Object.keys(mess).forEach(item => {
                    if(item.indexOf('tunnel') !== -1 && mess[item]){
                        let num = item.replace(/([^\d]+)(\d+)([^\d]+)/, '$2');
                        data.push({title: '通道'+ num + '值', value: mess[item]})
                    }
                })

                this.chartData =  {
                    legend: {
                        data: data.map(item => item.title)
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data: this.getCurrent() 
                        }
                    ],
                    grid: {
                        left: '10%'
                    },
                    series: data.map(item => {
                        return {
                            name: item.title,
                            type: 'line',
                            // symbol: "none",
                            data: item.value
                        }
                    })
                }
            }
        },
        mounted() {
            this.getSensors();
        },
        watch: {
            chartData(newVal) {
                this.chart.setOption(Object.assign(this.defaultOptions, newVal));
            }
        },
        beforeDestroy() {
            clearTimeout(this.weekTimer);
        }
    }
</script>

<style  lang="scss" scoped>
    select {
        padding: 4px;
        border-radius: 2px;
        outline: none;
        width: 3rem;
        margin-top: .2rem;
    }
    option { 
        // width: 2rem;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: none;
        margin: 0 -4px;
        outline: none;
        
    }
    span {
        font-weight: normal;
        font-size: 15px;
    }
</style>
