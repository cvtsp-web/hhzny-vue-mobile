<template>
    <div class="realTimeWrap">
        <div class="tabTitle">
            <div :class="['tabTitleWrap', titleCheck === 'summary' && 'checked']" @click="changeTab('summary')">
                <h4>概括总览</h4>
            </div>
            <div :class="['tabTitleWrap', titleCheck === 'map' && 'checked']" @click="changeTab('map')">
                <h4>监控地图</h4>
            </div>
        </div>
        <div v-if="showSummary" class="tabSummary">
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
        <div class="mapWrap">
            <div id="container"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            titleCheck: 'summary',
            showSummary: true,
            showMap: false,
            summaryMsg: {},
            mapStyle: {
                width: null,
                height: null
            }
        }
    },
    methods: {
        //获取概括总览信息
        getSummary(){
            this.$axios.get(this.$urls.realTime.summary)
            .then(({data: res}) => {
                if(res.rspCode === '0000'){
                    this.summaryMsg = res;
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
                    this.getMap();
                }
            }
        },
        //显示地图
        getMap(){
            // let screenHeight = window.screen.height;
            // let scal = screenHeight/(5.63*14);
            // console.log(scal)
            // this.mapStyle = {
            //     width: window.screen.width/14 + 'em',
            //     height: screenHeight*(100-scal) + 'em'
            // }

             var map = new AMap.Map('container', {
                center:[117.000923,36.675807],
                zoom:11
            });
        }
    },
    created(){
        //默认获取概括总览信息
        this.getSummary()
    }
}
</script>

<style lang="scss" scoped>
    .realTimeWrap {
        position: relative;
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
            margin: 0 auto;
            margin-top: .5em;
            .tabTitleWrap {
            width: 5.5em;
            height: 1.8em;
            text-align: center;
                h4 {
                    display: inline-block;
                    vertical-align: sub;
                }
            }
            .checked {
                color: #fff;
                background: rgb(38, 162, 255);
                border: .06em solid rgb(38, 162, 255);
                border-radius: .13em;
            }
        }
        .tabSummary {
            .tabContent {
                display: flex;
                justify-content: space-around;
                margin-top: 1em;
                h2 {
                    text-align: center;
                    padding: 1em 0;
                }
            }
            .tabList {
                margin-top: 1em;
                .tabListItem {
                    display: flex;
                    justify-content: space-between;
                    background: #fff;
                    padding: 1em 0;
                    margin-top: .5em;
                    .itemTitle {
                        padding-left: 1em;
                        .itemBox {
                            display: inline-block;
                            width: 1.5em;
                            height: 1.5em;
                            margin-right: 1em;
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
                        padding-right: 1em;
                    }
                }
            }
        }
        .mapWrap {
            position: absolute;
            top: 1em;
            bottom: 2em;
            left: 0;
            right: 0;
        }
    }
</style>
