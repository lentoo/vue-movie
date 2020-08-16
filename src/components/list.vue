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
                    <li :class="{disabled:parseInt(currentPage) + 1 >= countPage}">
                        <router-link :to="{path:'/'+server+'/'+(parseInt(currentPage) >= currentPage ? countPage - 1 : parseInt(currentPage) + 1)}">下一页</router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <Spinner :show="show"></Spinner>
    </div>
</template>
<script>
    import Vue from 'vue'
    import jsonp from '../js/jsonp.js'
    import config from '../js/config.js'
    import Spinner from './Spinner.vue'
    import { getInTheaters, geComingSoon, getTop250, getSearch } from '../api'
    export default {
        components: {
            Spinner
        },
        created() {
            this.request();         
        },
        data() {
            return {
                currentPage: 0,
                jsondata: {},
                countPage: 0,
                server: '',
                show: true
            }
        },
        methods: {
            request() {
                this.show = true;
                var server = this.$route.params.server;
                this.server = server;
                this.currentPage = this.$route.params.page;
                var count = 10;
                console.log('server', server);
                let task = getInTheaters
                switch (server) {
                    case 'in_theaters':
                        task = getInTheaters
                        break;
                    case 'coming_soon': 
                        task = geComingSoon
                        break
                    case 'top250':
                        task = getTop250
                        break
                    case 'search':
                        task = getSearch
                        break
                    default:
                        break;
                }
                task(this.currentPage * count).then(res => {
                    console.log(res);
                    this.jsondata = res
                    this.countPage = Math.ceil(this.jsondata.total / this.jsondata.count);
                    console.log(this.countPage);
                    this.show = false;
                })
                // jsonp(config.apiServer + server, { count: count, start: this.currentPage * count, q: this.$route.query.t || '' }, function (data) {
                //     this.jsondata = data;
                //     this.countPage = Math.ceil(this.jsondata.total / this.jsondata.count);
                //     this.show = false;
                // }.bind(this))
            }
        },
        watch: {
            '$route.path': 'request',
            '$route.params':'request'
        }
    }

</script>
<style scoped>
   
    .media-left a {
        display: inline-block;
        min-width: 100px;
        min-height: 100px;
    }
</style>