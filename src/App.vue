<template>
  <div id="app">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">基于Vue3.0的一个豆瓣电影App</a>
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
            <li
              :class="{
                active: currentRoute === 'in_theaters'
              }"
            >
              <router-link to="/movie?type=in_theaters&page=0"
                >正在热映</router-link
              >
            </li>
            <li
              :class="{
                active: currentRoute === 'coming_soon'
              }"
            >
              <router-link to="/movie?type=coming_soon&page=0"
                >即将上映</router-link
              >
            </li>
            <li
              :class="{
                active: currentRoute === 'top250'
              }"
            >
              <router-link to="/movie?type=top250&page=0">Top</router-link>
            </li>
            <li>
              <input
                type="text"
                class="form-control"
                v-model="search"
                placeholder="Search..."
                @keyup.enter="Search"
              />
            </li>
          </ul>
        </div>
        <div class="col-sm-8 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "app",
  setup() {
    const state = reactive({
      search: "",
      currentRoute: "",
      jsondata: {}
    });
    const route = useRoute();

    const request = () => {
      const server = route.query.type as string;
      state.currentRoute = server;
    };

    const Search = () => {
      useRouter().push({
        path: "/search/0?t=" + state.search,
        params: { t: state.search }
      });
    };

    watchEffect(request);

    return {
      ...toRefs(state),
      request,
      Search
    };
  }
};
</script>
