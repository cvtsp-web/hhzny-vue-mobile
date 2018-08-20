<template>
    <alarm-currenttwelve ref="alarm_chart" 
        :ctitle="title" 
        :capi="api"
        :cparams="params"
        :cdetailReturnData="detailReturnData">
            <span>月份：</span>
            <select @change="handlerChange" style="fontWeight: normal;fontSize: 15px;marginRight: 10px;">
                <option 
                v-for="(list, index) in selectLists" 
                :key="index" 
                >{{list.start}}</option>
            </select>
            <!-- <div class="monthWrap">
                <span class="selectMonth">2018年7月</span>
                <ul>
                    <li 
                        v-for="(list, index) in selectLists" 
                        :key="index"
                        @click="handlerChange(list.value)" 
                    >
                    {{list.label}}
                    </li>
                </ul>
            </div> -->
    </alarm-currenttwelve>
</template>

<script>
    import AlarmCurrenttwelve from './alarm-currenttwelve.vue'

    export default {
        components: {AlarmCurrenttwelve},
        data() {
            return {
                title: '月度报警汇总',
                api: this.$urls.report.monthlyDanger,
                params: {
                    apiVersion: '1.0', 
                    orgId: localStorage.getItem('orgId'),
                    month: moment().format('YYYYMM')
                },
                currentVal: '',
                selectLists: []
            }
        },
        methods: {
            //获取最近4个月
            //获取当前时间
            getCurrentMonth(){
                const nowYear = moment().year();
                const nowMonth = moment().month(); 
                let now = moment();
                let arr = [{start: now.format('YYYY年M月'), last: now.format('YYYYMM')}];
                for(let i = 0; i < 3; i++){
                    now = now.subtract(1, 'months');
                    // console.log(now.format('YYYYMM'))
                    arr.push({
                        start: now.format('YYYY年M月'),
                        last: now.format('YYYYMM')
                    });
                }
                console.log(arr)
                // arr = arr.map(item => item.format('YYYY年M月'));
                // console.log(arr)
                this.selectLists = arr;
            },
            handlerChange(e) {
                const one = this.selectLists.find(val => val.start === e.target.value);
                if(one) {
                    Object.assign(this.params, {month: one.last});
                    this.$refs['alarm_chart'].getChartReturnData();
                }
            },

            detailReturnData(mess) {
                mess = mess.data.map(item => {
                    return{
                        name: item.key,
                        value: item.value
                    }
                });
                return  {
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: "{a} <br/>{b} : {c} ({d}%)"
                    // },
                    legend: {
                        data: mess.map(item => item.name)
                    },
                    yAxis: null,
                    series: [{
                        name: '--',
                        type: 'pie',
                        center: ['50%', '60%'],
                        radius: ['0', '60%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: '{c} ({d}%)'
                                }
                            }
                        },
                        // label:{            //饼图图形上的文本标签
                        //     normal:{
                        //         show:true,
                        //         position:'inner', //标签的位置
                        //         textStyle : {
                        //             fontWeight : 300 ,
                        //             fontSize : 16    //文字的字体大小
                        //         },
                        //         formatter:'{d}%'

                                
                        //     }
                        // },
                        data: mess
                    }],
                    color: ['#00a5d6', '#00e4e2', '#ffd970', '#ff6693', '#8078e4', '#edb9f0']
                }
            }
        },
        created() {
            this.getCurrentMonth();
        }
    }
</script>

<style lang="scss" scoped>
    select {
        padding: 4px;
        border-radius: 2px;
        outline: none;
        width: 2.1rem;
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
    .monthText {
        display: inline-block;
        font-weight: normal;
        font-size: 15px;
        position: relative;
        top: -73px;
    }
    .monthWrap {
        display: inline-block;
        height: 150px;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        font-weight: normal;
        font-size: 15px;
        width: 1.7rem;
    }
    span {
        font-weight: normal;
        font-size: 15px;
    }
    .selectMonth {
        display: inline-block;
        width: 1.7rem;
        border: 1px solid #c0c0c0;
        border-radius: 3px;
        padding: 3px 0;
        text-align: center;
        margin-right: .3rem;
    }
</style>
