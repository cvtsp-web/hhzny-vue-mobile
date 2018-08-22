<template>
    <div class="alarmWrap">
        <mt-search v-model="addressValue" placeholder="请输入安装地址" :show="false"></mt-search>
        <div class="form-group">
            <p class="form-label">报警类型</p>
            <div class="check-list">
                <span :class="{active: alarmType === '0'}" @click="changeType('0')" class="item">全部</span>
                <span :class="{active: alarmType === '1'}" @click="changeType('1')" class="item">报警</span>
                <span :class="{active: alarmType === '2'}" @click="changeType('2')" class="item">故障</span>
            </div>
        </div>
        <div class="alarmContent">
            <div v-if="showNoMoreData" class="showNoData">没有更多数据啦~</div>
            <ul class="alarmList">
                <li v-for="(item, index) in alarmData" :key="index" class="listItem">
                    <div class="listImg">
                        <img src="../assets/img/alarm.png" alt="">
                    </div>
                    <div>
                        <h3>{{item.alarmTypeDesc}}</h3>
                        <div>{{item.alarmCodeDesc}}</div>
                        <div>{{item.sensorId}}</div>
                        <div>{{item.sensorAddr}}</div>
                        <div>{{item.alarmDate}}</div>
                    </div>
                    <div class="itemStatus">{{item.alarmStatus}}</div>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script>
    export default {
        data(){
            return {
                addressValue: null,
                alarmData: [],
                allData: [],
                apiVersion: '1.0',
                orgId: localStorage.getItem('orgId'),
                key: '',
                alarmType: '0',
                showNoMoreData: false,
                alarmTimer: null
            }
        },
        methods: {
            //默认获取所有数据
            getAlarmData(apiVersion, orgId, alarmType){
                this.$axios.get(this.$urls.alarmList, {
                    params: {
                        apiVersion, 
                        orgId
                    }
                })
                .then(({data: res}) => {
                    if(res.rspCode === '0000'){
                        // res.alarmList.forEach(item => {
                        //     if(item.alarmType === '1'){
                        //         item.alarmType = '故障报警';
                        //     }else if(item.alarmType === '2'){
                        //         item.alarmType = '监控报警';
                        //     }
                        // })
                        this.allData = res.alarmList;
                        this.alarmData = this.allData;
                        this.changeType(this.alarmType);
                        this.changeAlarmData(this.addressValue);
                        this.alarmTimer = setTimeout(() => {
                            this.getAlarmData(this.apiVersion, this.orgId)
                        },60000)
                    }
                })
                .catch(e => {
                    this.$emit('toast', {message: e.rspMessage})
                })
            },
            //报警类型改变数据改变
            changeType(type){
                this.alarmType = type;

                if(this.addressValue){
                    if(type === '0'){
                        this.alarmData = this.allData.filter(item => item.sensorAddr.indexOf(this.addressValue) !== -1);
                    }else{
                        this.alarmData = this.allData.filter(item => (item.sensorAddr.indexOf(this.addressValue) !== -1 && item.alarmType === type));
                    } 
                }else{
                    if(type === '0'){
                        this.alarmData = this.allData;
                    }else{
                        this.alarmData = this.allData.filter(item => item.alarmType === type);
                    }
                }
            },
            //地址改变数据改变
            changeAlarmData(value){
                if(this.alarmType === '0'){
                    if(!value){
                        this.alarmData = this.allData;
                    }else{
                        this.alarmData = this.allData.filter((item, index) => {
                            if(item.sensorAddr){
                               return (item.sensorAddr).indexOf(value) !== -1;
                            }
                        })
                        // this.alarmData = this.allData.filter(item => (item.sensorAddr).indexOf(value) !== -1);
                    }
                }else{
                    if(!value){
                        this.alarmData = this.allData.filter(item => item.alarmType === this.alarmType);
                    }else{
                        this.alarmData = this.allData.filter(item => {
                            if(item.sensorAddr){
                                return (item.sensorAddr.indexOf(value) !== -1 && item.alarmType === this.alarmType)
                            }
                        });
                    }
                }
            }
        },
        created() {
            //默认获取全部
            this.getAlarmData(this.apiVersion, this.orgId, this.alarmType);
        },
        watch: {
            addressValue(curVal, oldVal){
                this.changeAlarmData(curVal);
            },
            alarmData(curVal){
                if(!curVal.length){
                    this.showNoMoreData = true;
                }else{
                    this.showNoMoreData = false;
                }
            }
        },
        beforeDestroy() {
            clearTimeout(this.alarmTimer);
        }
    }
</script>

<style lang="scss">
    .alarmWrap {
        h3, ul {
            margin: 0;
            padding: 0;
        }
        .mint-search-list {
            z-index: -1;
        }
        .mint-search {
            height: 1rem;
            .mint-searchbar {
                background-color: #F5F5F5;
                .mint-searchbar-inner {
                    border-radius: 5px;
                }
            }
        }
        .form-group {
            height: 1rem;
            padding: 0 .4rem;
            display: flex;
            background: #fff;
            margin-top: .2rem;
            .form-label {
                margin: 0 .4rem 0 0;
                line-height: 1rem;
            }
            .check-list {
                flex-grow: 1;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .item {
                    border: 1px solid #ddd;
                    padding: .1rem .2rem;
                    font-size: 12px;
                    margin-right: .4rem;
                    &.active {
                        border: 1px solid rgb(38, 162, 255);
                    }
                }
            }
        }
        .alarmContent {
            margin-top: .5rem;
            margin-bottom: 60px;
            .showNoData {
                text-align: center;
            }
            .alarmList {
                .listItem {
                    display: flex;
                    justify-content: space-around;
                    background: #fff;
                    padding: .2rem 0;
                    border-bottom: 1px solid #ccc;
                    div {
                        padding: .1rem 0;
                    }
                    h3 {
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
                    .itemStatus {
                        display: flex;
                        align-items: center; 
                    }
                }
            }
        }
    }
</style>
