<template>
    <div class="equipmentWrap">
        <div class="header">
            <div :class="['title', titleCheck === 'listMsg' && 'active']" @click="changeTab('listMsg')">列表信息</div>
            <div :class="['title', titleCheck === 'detailMsg' && 'active']" @click="changeTab('detailMsg')">详细信息</div>
        </div>
        <div class="content">
            <div v-if="showList">
                <ul>
                    <li>
                        
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
                titleCheck: 'listMsg',
                showList: true
            }
        },
        methods: {
            changeTab(type){
                if(type !== this.titleCheck){
                    this.titleCheck = type;
                    
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .equipmentWrap {
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
            background: skyblue;
            margin-top: 2em;
            padding-bottom: 2em;
        }
    }
</style>
