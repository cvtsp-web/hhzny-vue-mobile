<template>
    <div class="realTimeWrap">
        <div class="banner"></div>
        <div class="tabTitle" ref="tabTitle">
            <div :class="['tabTitleWrap', titleCheck === 'summary' && 'checked']" @click="changeTab('summary')">
                <h4>概括总览</h4>
            </div>
            <div :class="['tabTitleWrap', titleCheck === 'map' && 'checked']" @click="changeTab('map')">
                <h4>监控地图</h4>
            </div>
        </div>
        <!-- 概况纵览 -->
        <div v-show="showSummary" class="tabSummary" ref="">
            <div class="tabContent">
                <div>
                    <h2>{{summaryMsg.currAlarmCount}}</h2>
                    <div>当日报警总数</div>
                </div>
                <div>
                    <h2>{{summaryMsg.currFaultCount}}</h2>
                    <div>当日故障总数</div>
                </div>
                <div>
                    <h2>{{summaryMsg.currMainCount}}</h2>
                    <div>当日维保总数</div>
                </div>
            </div>
            <div class="tabList">
                <ul>
                    <li class="tabListItem">
                        <div class="itemTitle">
                            <span class="itemBox itemColor"></span>
                            <span>传感器总数</span>
                        </div>
                        <div class="itemNum">{{summaryMsg.currSensorCount}}个</div>
                    </li>
                    <li class="tabListItem">
                        <div class="itemTitle">
                            <span class="itemBox itemNormalColor"></span>
                            <span>传感器正常总数</span>
                        </div>
                        <div class="itemNum">{{summaryMsg.sensorNorCount}}个</div>
                    </li>
                    <li class="tabListItem">
                        <div class="itemTitle">
                            <span class="itemBox itemAlarmColor"></span>
                            <span>传感器报警总数</span>
                        </div>
                        <div class="itemNum">{{summaryMsg.sensorAlarmCount}}个</div>
                    </li>
                    <li class="tabListItem">
                        <div class="itemTitle">
                            <span class="itemBox itemTroubleColor"></span>
                            <span>传感器故障总数</span>
                        </div>
                        <div class="itemNum">{{summaryMsg.sensorFaultCount}}个</div>
                    </li>
                    <li class="tabListItem">
                        <div class="itemTitle">
                            <span class="itemBox itemOfflineColor"></span>
                            <span>传感器离线总数</span>
                        </div>
                        <div class="itemNum">{{summaryMsg.sensorDisconnCount}}个</div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-show="showMap" class="mapWrap" id="container" :style="mapStyle"></div>
    </div>
</template>

<script>
import { setRem } from '../utils'

export default {
    data(){
        return{
            titleCheck: 'summary',
            showSummary: true,
            showMap: false,
            summaryMsg: {},
            mapStyle: {
                width: null,
                height: null
            },
            terminalsData: [],
            summaryTimer: null,
            mapTimer: null
        }
    },
    methods: {
        //获取概括总览信息
        getSummary(){
            this.$axios.get(this.$urls.realTime.summary, {
                params: {
                    apiVersion: '1.0', 
                    orgId: localStorage.getItem('orgId')
                }
            })
            .then(({data: res}) => {
                if(res.rspCode === '0000'){
                    this.summaryMsg = res;
                    this.summaryTimer = setTimeout(() => {
                        this.getSummary()
                    },60000)
                }   
            })
            .catch(e => {
                this.$emit('toast', {message: e.rspMessage})
            })
        },
        //切换tab
        changeTab(type){
            if(type !== this.titleCheck){
                this.titleCheck = type;
                if(type === 'summary'){
                    this.showMap = false;
                    this.showSummary = true;
                    this.getSummary();
                }else if(type === 'map'){
                    this.showSummary = false;
                    this.showMap = true;
                    // this.mapHeight = this.winHeight - this.$refs['tabTitle'].getBoundingClientRect().bottom - 55;
                    this.getMap();
                }
            }
        },
        //初始化地图
        getMap(){
            let screenHeight = window.screen.height;
            let scal = (4.84 * setRem() + 60)/screenHeight;
            this.mapStyle = {
                width: window.screen.width/setRem() + 'rem',
                height: screenHeight*(1-scal)/setRem() + 'rem'
            }
            this.map = new AMap.Map('container', {
                resizeEnable: true,
                // center: [116.397428, 39.90923],
                // zoom: 13
            });

            //获取终端列表
            this.getTerminals();
        },
        //获取终端列表在地图上展示
        getTerminals(){
            this.$axios.get(this.$urls.realTime.terminals,{
                params: {
                    apiVersion: '1.0', 
                    orgId: localStorage.getItem('orgId')
                }
            })
            .then(({data: res}) => {
                if(res.rspCode === '0000'){
                    this.terminalsData = res.terminalList;
                    this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                    this.terminalsData.forEach(item => {
                        let marker = new AMap.Marker({
                            position: [item.termX, item.termY]
                        });

                        if(item.termStatus === '00'){
                            item.termStatus = '正常';
                        }else if(item.termStatus === '01'){
                            item.termStatus = '异常';
                        }else if(item.termStatus === '03'){
                            item.termStatus = '断网';
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

                        marker.content = `
                             <div>
                                <div>
                                    <span>终端编号：</span>
                                    <span>${item.termId}</span>
                                </div>
                                <div>
                                    <span>终端地址：</span>
                                    <span>${item.termAddr}</span>
                                </div>
                                <div>
                                    <span>终端状态：</span>
                                    <span>${item.termStatus}</span>
                                </div>
                                <div>
                                    <span>传感器总数：</span>
                                    <span>${item.sensorCount}</span>
                                </div>
                                <div>
                                    <span>所属子系统：</span>
                                    <span>${item.systemType}</span>
                                </div>
                                <div>
                                    <span>启用日期：</span>
                                    <span>${item.openDate}</span>
                                </div>
                                <div>
                                    <span>x坐标：</span>
                                    <span>${item.termX}</span>
                                </div>
                                <div>
                                    <span>y坐标：</span>
                                    <span>${item.termY}</span>
                                </div>
                            </div>
                        `;
                        marker.on('click', this.markerClick);
                        // marker.emit('click', {target: marker});
                        marker.setMap(this.map);
                    })
                    // this.map.setFitView(); //所有点放在同一个平面
                    this.mapTimer = setTimeout(() => {
                        this.getTerminals()
                    },30000)
                }   
            })
            .catch(e => {
                this.$emit('toast', {message: e.rspMessage})
            })
        },
        markerClick(e) {
            this.infoWindow.setContent(e.target.content);
            this.infoWindow.open(this.map, e.target.getPosition());
        }
    },
    created(){
        //默认获取概括总览信息
        this.getSummary();
    },
    beforeDestroy() {
        clearTimeout(this.summaryTimer);
        clearTimeout(this.mapTimer);
    }
}
</script>

<style lang="scss" scoped>
    .realTimeWrap {
        // height: calc(100% - 4.2rem);
        margin-bottom: 60px;
        .banner {
            width: 100%;
            height: 3.84rem;
            background: url("../assets/img/banner.png") center center / 100% 100% no-repeat;
        }
        h2, h4, ul {
            margin: 0;
            padding: 0;
        }
        ul {
            list-style: none;
        }
        .tabTitle {
            display: flex;
            justify-content: space-between;
            width: 90%;
            height: .5rem;
            margin: 0 auto;
            margin-top: .3rem;
            .tabTitleWrap {
            width: 2rem;
            text-align: center;
                h4 {
                    display: inline-block;
                    vertical-align: sub;
                }
            }
            .checked {
                color: #fff;
                background: rgb(38, 162, 255);
                border: 1px solid rgb(38, 162, 255);
                border-radius: 5px;
            }
        }
        .tabSummary {
            // height: calc(100% - 0.9rem);
            .tabContent {
                display: flex;
                justify-content: space-around;
                margin-top: .2rem;
                h2 {
                    text-align: center;
                    padding: .4rem 0;
                }
            }
            .tabList {
                margin-top: .6rem;
                .tabListItem {
                    display: flex;
                    justify-content: space-between;
                    background: #fff;
                    padding: .2rem 0;
                    margin-top: .5rem;
                    .itemTitle {
                        padding-left: .7rem;
                        .itemBox {
                            display: inline-block;
                            width: .5rem;
                            height: .5rem;
                            margin-right: .7rem;
                            vertical-align: middle;
                        }
                        .itemColor {
                            background: #0000ff;
                        }
                        .itemNormalColor {
                            background: #69d389;
                        }
                        .itemAlarmColor {
                            background: #ff0000;
                        }
                        .itemTroubleColor {
                            background: #fdb438;
                        }
                        .itemOfflineColor {
                            background: #d7d7d7;
                        }
                    }
                    .itemNum {
                        padding-right: .5rem;
                    }
                }
            }
        }
        .mapWrap {
            margin-top: .2rem;
            z-index: 0;
            // height: calc(100% - 0.7rem);
        }
    }
</style>
