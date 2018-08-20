import AlarmMonth from './alarm-month';

export default {
    extends: AlarmMonth,
    data() {
        return {
            title: '月度用电量按功能汇总',
            api: this.$urls.report.monthlyEMSummary
        }
    },
    // methods: {
    //     detailReturnData(mess) {
    //         mess = mess.data.map(item => {
    //             return{
    //                 name: item.funTypeName,
    //                 value: item.funTypeVal
    //             }
    //         });
    //         this.chartData = {
    //             // tooltip: {
    //             //     trigger: 'item',
    //             //     formatter: "{a} <br/>{b} : {c} ({d}%)"
    //             // },
    //             legend: {
    //                 data: mess.map(item => item.name)
    //             },
    //             yAxis: null,
    //             series: [{
    //                 name: '--',
    //                 type: 'pie',
    //                 center: ['50%', '60%'],
    //                 radius: ['0', '60%'],
    //                 itemStyle: {
    //                     normal: {
    //                         label: {
    //                             show: true,
    //                             formatter: '{c} ({d}%)'
    //                         }
    //                     }
    //                 },
    //                 // label:{            //饼图图形上的文本标签
    //                 //     normal:{
    //                 //         show:true,
    //                 //         position:'inner', //标签的位置
    //                 //         textStyle : {
    //                 //             fontWeight : 300 ,
    //                 //             fontSize : 16    //文字的字体大小
    //                 //         },
    //                 //         formatter:'{d}%'

                            
    //                 //     }
    //                 // },
    //                 data: mess
    //             }],
    //             color: ['#00a5d6', '#00e4e2', '#ffd970', '#ff6693', '#8078e4', '#edb9f0']
    //         }
    //     }
    // }
}