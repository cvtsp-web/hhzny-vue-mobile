<template>
    <div class="reportWrap">
        <div class="header">
            <div :class="['title', titleCheck === 'alarm' && 'active']" @click="changeTab('alarm')">报警</div>
            <div :class="['title', titleCheck === 'report' && 'active']" @click="changeTab('report')">数据统计</div>
        </div>
        <div class="content">
            <div id="main" style="height: 500px;"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        data(){
            return {
                apiVersion: '1.0', 
                orgId: localStorage.getItem('orgId'),
                titleCheck: 'alarm',
                yData: null,
                hourlyDangerData: null
            }
        },
        methods: {
            //切换tab
            changeTab(type){
                this.titleCheck = type;
            },
            //获取最近12小时隐患汇总
            getHourlyDanger(){
                this.$axios.get(this.$urls.report.hourlyDanger, {
                    params: {
                        apiVersion: this.apiVersion, 
                        orgId: this.orgId
                    }
                })
                .then(({data: res}) => {
                    if(res.rspCode === '0000'){
                        res.dangerList.forEach(item => {

                        })
                    }
                })
                .catch(e => {
                    this.$emit('toast', {message: e.rspMessage})
                })
                const hourlyDangerChart = echarts.init(document.getElementById('main'));
                hourlyDangerChart.setOption({
                    
                })
            }
        },
        created() {
            this.getHourlyDanger();
        }
    }
</script>

<style lang="scss" scoped>
    .reportWrap {
        margin-bottom: 55px;
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
    }
</style>
