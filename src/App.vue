<template>
  <div id="app">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
            aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">基于Vue2.0的一个豆瓣电影App</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <form class="navbar-form navbar-right">

            <!--<input type="text" class="form-control" v-model="search" placeholder="Search..." @keyup.13="Search" />-->

          </form>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li class="active" v-focus="{server:currentRoute}">
              <router-link to="/in_theaters/0">正在热映</router-link>
            </li>
            <li v-focus="{server:currentRoute}">
              <router-link to="/coming_soon/0">即将上映</router-link>
            </li>
            <li v-focus="{server:currentRoute}">
              <router-link to="/top250/0">Top</router-link>
            </li>
            <li>
              <input type="text" class="form-control" v-model="search" placeholder="Search..." @keyup.13="Search" />
            </li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import jsonp from './js/jsonp.js'
  import config from './js/config.js'
  export default {
    name: 'app',
    data() {
      return {
        currentRoute: '',
        search: ''
      }
    },
    created() {
      this.request();
    },
    methods: {
      request() {
        var server = this.$route.params.server;
        this.currentRoute = server;

      },
      data: {
        jsondata: {}
      },
      Search() {
        this.$router.push({ path: '/search/0?t=' + this.search, params: { t: this.search } });
        // jsonp(config.apiServer + 'search', { q: this.search }, function (data) {
        //   this.jsondata = data;
        //   this.$emit('jsondata', this.jsondata);
        //   this.$route.params.tag = 1;
        // }.bind(this))
        // console.log(1);
        // this.$route.params= 'search';
        // this.$route.params.text = this.search;

      }
    },
    watch: {
      '$route': 'request'
    }
  }
</script>