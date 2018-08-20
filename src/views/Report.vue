<template>
    <div class="reportWrap">
        <div class="header">
            <div :class="['title', titleCheck === 'alarm' && 'active']" @click="changeTab('alarm')">报警</div>
            <div :class="['title', titleCheck === 'report' && 'active']" @click="changeTab('report')">数据统计</div>
        </div>
        <!-- <div class="content">
            <h3>最近12小时隐患汇总</h3>
            <div id="report_chart" style="height: 6rem"></div>
        </div> -->
        <div v-if="cache.alarm" v-show="titleCheck === 'alarm'">
            <alarm-currenttwelve />
            <alarm-currentweek />
            <alarm-month />
        </div>
        <div v-if="cache.report" v-show="titleCheck !== 'alarm'">
            <data-currentweek />
            <data-currenttwelve />
            <data-month />
        </div>
    </div>
</template>

<script>
    var echarts = require('echarts');
    import moment from 'moment';
    import AlarmCurrenttwelve from './report-charts/alarm-currenttwelve.vue'
    import AlarmCurrentweek from './report-charts/alarm-currentweek.js'
    import AlarmMonth from './report-charts/alarm-month.vue'
    import DataCurrentweek from './report-charts/data-currentweek.vue'
    import DataCurrenttwelve from './report-charts/data-currenttwelve.js'
    import DataMonth from './report-charts/data-month.js'

    export default {
        components: {AlarmCurrenttwelve, AlarmCurrentweek, AlarmMonth, DataCurrentweek, DataCurrenttwelve, DataMonth}, 
        data(){
            return {
                titleCheck: 'alarm',
                cache: {
                    alarm: true,
                    report: false
                }
            }
        },
        methods: {
            //切换tab
            changeTab(type){
                this.titleCheck = type;
                this.cache[type] = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .reportWrap {
        margin-bottom: 60px;
        .header {
            display: flex;
            justify-content: space-around;
            background: #fff;
            .title {
                width: 50%;
                text-align: center;
                padding: 1em 0;
            }
            .active {
                color: rgb(38, 162, 255);
                border-bottom: .08px solid rgb(38, 162, 255);
            }
        }
        .content {
            margin-top: .5rem;
            h3 {
                margin-left: .2rem;
            }
        }
    }
</style>
