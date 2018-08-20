import AlarmCurrenttwelve from './alarm-currenttwelve.vue'

export default {
    mixins: [AlarmCurrenttwelve],
    data() {
        return {
            title: '最近一周电气火灾隐患数量汇总',
            api: this.$urls.report.weeklyDanger
        }
    },

    methods: {
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
            arr = (arr.reverse()).map(item => {
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
        detailReturnData(mess) {
            this.chartData = {
                legend: {
                    data:['隐患','维护']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.getCurrent()
                    }
                ],
                grid: {
                    left: '10%'
                },
                series : [
                    {
                        name: '隐患',
                        type: 'line',
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
                        data: mess.maintValueList,
                        itemStyle:{
                            normal:{
                                color:'#fadd69'
                            }
                        }
                    }
                ]
            };
        }
    }
}