<template>
    <div>
        <h1 class="page-header">{{jsondata.title}}</h1>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item,index) in jsondata.subjects">
                <span class="badge">{{item.rating.average}}</span>
                <div class="media-left">
                    <router-link :to="{path:'/detail/'+item.id}">
                        <img class="media-object" :src="item.images.small" alt="">
                    </router-link>
                </div>
                <div class="media-body">
                    <h3 class="media-heading">{{item.title}}</h3>
                    <p>
                        <span>类型：</span><span>{{item.genres.join('、')}}</span>
                    </p>
                    <p>
                        <span>导演：</span> <span v-for="(val,index) in item.casts">{{val.name + (index==item.casts.length-1?'':'、')}}</span>
                    </p>
                </div>
            </li>
        </ul>
        <div id="layear" v-show="!show">
            <p>当前第{{parseInt(currentPage) +1}}页、共 {{countPage}}页</p>
            <nav>
                <ul class="pager">
                    <li :class="{disabled:currentPage<=0}">
                        <router-link :to="{path:'/'+server+'/'+ (currentPage<=0?0:(parseInt(currentPage)-1))}">上一页</router-link>
                    </li>
                    <li :class="{disabled:currentPage>=countPage}">
                        <router-link :to="{path:'/'+server+'/'+(parseInt(currentPage) + parseInt(1))}">下一页</router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="spinner" v-show="show">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>

    </div>
</template>
<script>
    import Vue from 'vue'
    import jsonp from '../js/jsonp.js'
    import config from '../js/config.js'
    export default {
        created() {
            this.request();         
        },
        data() {
            return {
                currentPage: 0,
                jsondata: {},
                countPage: 0,
                server: '',
                show: 'true'
            }
        },
        methods: {
            request() {
                console.log('执行了');
                this.show = true;
                var server = this.$route.params.server;
                this.server = server;
                this.currentPage = this.$route.params.page;
                var count = 10;
                jsonp(config.apiServer + server, { count: count, start: this.currentPage * count, q: this.$route.query.t }, function (data) {
                    this.jsondata = data;
                    this.countPage = Math.ceil(this.jsondata.total / this.jsondata.count);
                    this.show = false;
                }.bind(this))
            }
        },
        watch: {
            '$route.path': 'request',
            '$route.params':'request'
        }
    }

</script>
<style scoped>
    .spinner {
        width: 60px;
        height: 60px;
        margin: 100px auto;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .double-bounce1,
    .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #67CF22;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: bounce 2.0s infinite ease-in-out;
        animation: bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes bounce {
        0%,
        100% {
            -webkit-transform: scale(0.0)
        }
        50% {
            -webkit-transform: scale(1.0)
        }
    }

    @keyframes bounce {
        0%,
        100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        }
        50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }
</style>