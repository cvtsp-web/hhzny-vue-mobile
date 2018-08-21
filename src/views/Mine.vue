<template>
    <div class="mineWrap">
        <div class="banner"></div>
        <div class="mineContent">
            <ul class="list">
                <li class="listItem" @click="getIntroduction">
                    <span>平台介绍</span>
                    <span class="itemIcon">〉</span>
                </li>
                <li class="listItem">
                    <span>程序版本号</span>
                    <span>1.0.0</span>
                </li>
            </ul>
            <div class="btnWrap">
                <mt-button type="danger" size="small" class="btn" @click="handelOut">注销用户</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods: {
            getIntroduction(){
                // this.$router.push('/introduction')
                this.$router.push({
                    path: '/introduction', 
                    name: 'introduction'
                })
            },
            handelOut(){
                this.$router.push({
                    path: '/login', 
                    name: 'Login'
                });
                sessionStorage.setItem('token', null);
            }
        }
    }
</script>

<style  lang="scss" scoped>
    .mineWrap {
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .banner {
            width: 100%;
            height: 3.84rem;
            background: url("../assets/img/banner.png") center center / 100% 100% no-repeat;
        }
        .mineContent {
            margin-bottom: 55px;
            .list {
                .listItem {
                    display: flex;
                    justify-content: space-between;
                    padding: .3rem 0;
                    background: #fff;
                    margin-top: .5rem;
                    font-size: 16px;
                    span:nth-child(1) {
                        padding-left: .5rem;
                    }
                    span:nth-child(2) {
                        padding-right: .5rem;
                    }
                    // .itemIcon {
                    //     font-size: 18px;
                    // }
                }
            }
            .btnWrap {
                text-align: center;
                margin-top: 1rem;
                button {
                    width: 90%;
                }
            }
        }
    }
</style>
