import AlarmCurrenttwelve from './alarm-currenttwelve.vue'

export default {
    mixins: [AlarmCurrenttwelve],
    data() {
        return {
            title: '最近12小时用电量汇总',
            api: this.$urls.report.hourlyEMSummary
        }
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
        detailReturnData(mess) {
            this.chartData = {
                legend: {
                    data:['小时用电量']
                },
                xAxis : [
                    {
                        type : 'category',
                        data: this.getCurrent(),
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
                        name: '小时用电量',
                        type: 'bar',
                        data: mess.totalActPList,
                        itemStyle:{
                            normal:{
                                color:'#3a9ff1'
                            }
                        }
                    }
                ]
            }
        }
    }
}