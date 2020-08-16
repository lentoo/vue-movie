<template>
  <div>
    <h1 class="page-header">{{ jsondata.title }}</h1>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="item in jsondata.subjects"
        :key="item.id"
      >
        <span class="badge">{{ item.rating.average }}</span>
        <div class="media-left">
          <router-link :to="{ path: '/detail/' + item.id }">
            <img class="media-object" :src="item.images.small" alt />
          </router-link>
        </div>
        <div class="media-body">
          <h3 class="media-heading">{{ item.title }}</h3>
          <p>
            <span>类型：</span>
            <span>{{ item.genres.join("、") }}</span>
          </p>
          <p>
            <span>导演：</span>
            <span v-for="(val, index) in item.casts" :key="index">{{
              val.name + (index == item.casts.length - 1 ? "" : "、")
            }}</span>
          </p>
        </div>
      </li>
    </ul>
    <div id="layear" v-show="!show">
      <p>当前第{{ parseInt(currentPage) + 1 }}页、共 {{ countPage }}页</p>
      <nav>
        <ul class="pager">
          <li :class="{ disabled: currentPage <= 0 }">
            <router-link
              :to="
                '/movie?type=' +
                  server +
                  '&page=' +
                  (currentPage <= 0 ? 0 : parseInt(currentPage) - 1)
              "
              >上一页</router-link
            >
          </li>
          <li :class="{ disabled: parseInt(currentPage) + 1 >= countPage }">
            <router-link
              :to="
                '/movie?type=' +
                  server +
                  '&page=' +
                  (parseInt(currentPage) >= currentPage
                    ? countPage - 1
                    : parseInt(currentPage) + 1)
              "
              >下一页</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
    <Spinner :show="show"></Spinner>
  </div>
</template>
<script lang="ts">
import { reactive, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Spinner from "./Spinner.vue";
import { getInTheaters, geComingSoon, getTop250, getSearch } from "../api";

export default {
  components: {
    Spinner
  },

  setup() {
    const state = reactive({
      currentPage: 0,
      jsondata: {},
      countPage: 0,
      server: "",
      show: true
    });
    const route = useRoute();

    const request = () => {
      state.show = true;
      const server = (route.query.type as string) || "in_theaters";
      state.server = server;
      state.currentPage = Number(route.query.page || 0);
      const count = 10;
      console.log("server", server);
      let task = getInTheaters;
      switch (server) {
        case "in_theaters":
          task = getInTheaters;
          break;
        case "coming_soon":
          task = geComingSoon;
          break;
        case "top250":
          task = getTop250;
          break;
        case "search":
          task = getSearch;
          break;
        default:
          break;
      }
      task(state.currentPage * count).then((res: any) => {
        console.log(res);
        state.jsondata = res;
        state.countPage = Math.ceil(
          ((res.total as number) / res.count) as number
        );
        console.log(state.countPage);
        state.show = false;
      });
    };

    watchEffect(() => {
      console.log(route.query);
      request();
    });

    return state;
  }
};
</script>
<style scoped>
.media-left a {
  display: inline-block;
  min-width: 100px;
  min-height: 100px;
}
</style>
