<template>
    <div class="content">
        <h3 style="marginLeft: .3rem">{{ctitle || title}} <div style="float:right"><slot></slot></div></h3>
        <div ref="chartScope" style="height: 6rem"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    /**
     * 报警的最近12小时隐患汇总
     */
    export default {
        props: {
            ctitle: {},
            capi: {},
            cparams: {},
            cdetailReturnData: Function
        },
        data() {
            return {
                title: '最近12小时隐患汇总',
                chart: null,
                chartData: {},
                // 基础参数
                baseParams: {
                    apiVersion: '1.0', 
                    orgId: localStorage.getItem('orgId')
                },
                api: this.$urls.report.hourlyDanger,
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
                }
            }
        },
        computed: {
            params() {
                return this.baseParams;
            }
        },
        watch: {
            chartData(newVal) {
                this.chart.setOption(Object.assign(this.defaultOptions, newVal));
            }
        },
        mounted() {
            this.chart = echarts.init(this.$refs['chartScope']);
            this.getChartReturnData();
        },
        methods: {
            //获取当前时间
            getCurrent(){
                const nowYear = moment().year();
                const nowMonth = moment().month(); 
                const nowDate = moment().date();
                const nowHour = moment().hour();
                let arr = [nowHour];
                let now = moment();
                for(let i = 0; i < 11; i++){
                    now = now.subtract(1, 'hours');
                    arr.push(now.hour());
                }
                // const position = arr.indexOf(0);
                // arr = arr.map((item, index) => {
                //     if(nowHour != 0 && position != -1){
                //         if(index > position){
                //             item = moment().format('YYYY-MM-DD') + ' ' + item + '时';
                //         }
                //     }
                //     item = moment().subtract(1, 'months').format('YYYY-MM-DD') + ' ' + item + '时';
                //     return item;
                // })
                arr = arr.map(item => item + '时');
                return arr.reverse();
            },

            //获取图表返回的数据
            getChartReturnData(){
                this.$axios.get(this.capi || this.api, {
                    params: this.cparams || this.params
                })
                .then(({data: res}) => {
                    if(res.rspCode === '0000'){
                        // this.hourlyDangerData = res;
                        this.detailReturnData(res);
                    }
                })
                .catch(e => {
                    this.$emit('toast', {message: e.rspMessage})
                })
            },

            //对返回数据进行处理
            detailReturnData(mess) {
                this.chartData = this.cdetailReturnData ? this.cdetailReturnData(mess) : {
                    legend: {
                        data:['隐患','维护']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.getCurrent(),
                            //设置字体倾斜  
                            axisLabel: {
                                interval: 0,
                                rotate: 45,
                                //倾斜度 -90 至 90 默认为0  
                            }
                        }
                    ],
                    series : [
                        {
                            name: '隐患',
                            type: 'bar',
                            data: mess.dangerValueList,
                            itemStyle:{
                                normal:{
                                    color:'#3a9ff1'
                                }
                            }
                        },
                        {
                            name: '维护',
                            type: 'line',
                            symbol: "none",
                            data: mess.maintValueList,
                            itemStyle:{
                                normal:{
                                    color:'#fadd69'
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
</script>
