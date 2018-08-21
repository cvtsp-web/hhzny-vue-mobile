<template>
    <div class="equipmentWrap">
        <!-- <div class="header">
            <div :class="['title', titleCheck === 'listMsg' && 'active']" @click="changeTab('listMsg')">列表信息</div>
            <div :class="['title', titleCheck === 'detailMsg' && 'active']" @click="changeTab('detailMsg')">详细信息</div>
        </div> -->
        <div class="content">
            <div>
                <ul class="equipmentList">
                   <li v-for="item in data" :key="item.sensorId" class="listItem" @click="getDetail(item)">
                        <div class="listImg">
                            <img src="../assets/img/terminal.png" alt="">
                        </div>
                        <div>
                            <div>{{item.sensorId}}</div>
                            <div>{{item.systemType}}</div>
                            <div>{{item.sensorAddr}}</div>
                            <div>{{item.lastUpDateDate}}</div>
                        </div>
                        <div class="listStatus">{{item.sensorStatus}}</div>
                   </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            data: [],
            sensorTimer: null
        }
    },
    methods: {
        getSensors(){
            this.$axios.get(this.$urls.equipment.sensors, {
                params: {
                    apiVersion: '1.0', 
                    orgId: localStorage.getItem('orgId')
                }
            })
            .then(({data: res}) => {
                if(res.rspCode === '0000'){
                    res.sensorList.forEach(item => {
                        if(item.sensorStatus === '00'){
                            item.sensorStatus = '正常';
                        }else if(item.sensorStatus === '01'){
                            item.sensorStatus = '故障';
                        }else if(item.sensorStatus === '02'){
                            item.sensorStatus = '报警';
                        }else if(item.sensorStatus === '03'){
                            item.sensorStatus = '断网';
                        }

                        if(item.systemType === 'EF'){
                            item.systemType = '电气火灾监控系统';
                        }else if(item.systemType === 'FP'){
                            item.systemType = '消防电源监控系统';
                        }else if(item.systemType === 'FD'){
                            item.systemType = '防火门监控系统';
                        }else if(item.systemType === 'EM'){
                            item.systemType = '电力分项计量监控系统';
                        }
                    })
                    this.data = res.sensorList;
                    this.sensorTimer = setTimeout(() => {
                        this.getSensors()
                    },30000)
                }   
            })
            .catch(e => {
                this.$emit('toast', {message: e.rspMessage})
            })
        },
        getDetail(item){
            this.$router.push({
                path: '/equipmentDetail', 
                name: 'equipmentDetail',
                params: {data: item}
            })
        }
    },
    created() {
        this.getSensors();
    },
    beforeDestroy() {
        clearTimeout(this.getSensors);
    }
}
</script>

<style lang="scss" scoped>
    .equipmentWrap {
        margin-bottom: 55px;
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
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
            .equipmentList {
                .listItem {
                    display: flex;
                    justify-content: space-around;
                    background: #fff;
                    padding: .2rem 0;
                    margin-top: .3rem;
                    div {
                        padding: .1rem 0;
                    }
                    .listImg {
                        width: 1rem;
                        height: 1rem;
                        margin: auto 0;
                        img {
                            widows: 100%;
                            height: 100%;
                        }
                    }
                    .listStatus {
                        width: .6rem;
                        height: .6rem;
                        margin: auto 0;
                    }
                }
            }
        }
    }
</style>
