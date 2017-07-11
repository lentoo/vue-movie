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
        <p>当前第{{currentPage}}页、共 {{countPage}}页</p>
        <nav>
            <ul class="pager">
                <li :class="{disabled:currentPage==0}">
                    <router-link :to="{path:'/in_theaters/'+(parseInt(currentPage)-1)}">上一页</router-link>
                </li>
                <li :class="{disabled:currentPage==countPage}">
                    <router-link :to="{path:'/in_theaters/'+(parseInt(currentPage) + parseInt(1))}">下一页</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import jsonp from '../js/jsonp.js'
    export default
        {
            created() {
                this.request();
            },
            data() {
                return {
                    currentPage: 0,
                    jsondata: {},
                    countPage: 0
                }
            },
            methods: {
                request() {
                    this.currentPage = this.$route.params.page;
                    jsonp('https://api.douban.com/v2/movie/in_theaters', { count: 10, start: this.currentPage }, function (data) {
                        this.jsondata = data;
                        this.countPage = Math.ceil(this.jsondata.total / this.jsondata.count);
                    }.bind(this));
                    // axios.get('/data.json').then(function (res) {
                    //     this.jsondata = res.data;
                    //     this.jsondata = JSON.parse(this.jsondata);
                    // }.bind(this)).catch(function (err) {
                    //     console.log(err);
                    // })
                }
            },
            watch: {
                //监测$route对象，如果发生改变，就触发request方法
                "$route":'request'
            }
        }

</script>