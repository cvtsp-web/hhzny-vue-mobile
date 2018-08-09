<template>
    <div class="alarmWrap">
        <mt-search v-model="value"></mt-search>
        <div class="form-group">
            <p class="form-label">报警类型</p>
            <div class="check-list">
                <span :class="{active:alarmType==='1'}" @click="alarmType='1'" class="item">全部</span>
                <span :class="{active:alarmType==='2'}" @click="alarmType='2'" class="item">报警</span>
                <span :class="{active:alarmType==='3'}" @click="alarmType='3'" class="item">故障</span>
            </div>
        </div>
        <div class="alarmContent">

        </div>
    </div>
    
</template>

<script>
    export default {
        data(){
            return {
                value: null,
                alarmType: '1'
            }
        },
        methods: {

        },
        created() {
            
        }
    }
</script>

<style lang="scss">
    .alarmWrap {
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
            padding-bottom: 2.2rem;
        }
    }
</style>
