<template>
    <div class="equipmentDetailWrap">
        <div class="item">
            <span>传感器编号：</span>
            <span>{{detailData.sensorId}}</span>
        </div>
        <div class="item">
            <span>所属子系统：</span>
            <span>{{detailData.systemType}}</span>
        </div>
        <div class="item">
            <span>上送时间：</span>
            <span>{{detailData.lastUpdateDate}}</span>
        </div>
        <div v-if="detailData.systemType === '电气火灾监控系统'">
            <div class="item">
                <span>规格：</span>
                <span>{{detailData.specification}}</span>
            </div>
            <div v-for="(i, index) in 12" :key="index" class="item">
                <span>通道{{index+1}}检测值：</span>
                <span>{{detailData['tunnel' + (index+1)]}}</span>
            </div>
        </div>
        <div v-if="detailData.systemType === '电力分项计量监控系统'">
            <div class="item">
                <span>A相对温度：</span>
                <span>{{detailData.tA}}</span>
            </div>
            <div class="item">
                <span>B相对温度：</span>
                <span>{{detailData.tB}}</span>
            </div>
            <div class="item">
                <span>C相对温度：</span>
                <span>{{detailData.tC}}</span>
            </div>
            <div class="item">
                <span>环境温度：</span>
                <span>{{detailData.eT}}</span>
            </div>
            <div class="item">
                <span>总有功功率：</span>
                <span>{{detailData.totalActP}}</span>
            </div>
            <div class="item">
                <span>功率因素：</span>
                <span>{{detailData.pf}}</span>
            </div>
            <div class="item">
                <span>电网频率：</span>
                <span>{{detailData.frequency}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                detailData: {}
            }
        },
        methods: {

        },
        created() {
            this.detailData = this.$route.params.data;
        }
    }
</script>

<style lang="scss" scoped>
    .equipmentDetailWrap {
        background: #fff;
        // margin-top: .5rem;
        .item {
            padding: .3rem .5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span:nth-child(1) {
                min-width: 95px;
                text-align: right;
                margin-right: .2rem;
            }
        }
    }
</style>
