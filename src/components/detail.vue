<template>
  <div>
    <div class="jumbotron" v-if="jsondata.title">
      <h1>{{ jsondata.title }}</h1>
      <p><img :src="jsondata.images.large" alt="" /></p>
      <p>{{ jsondata.summary }}</p>
    </div>
    <Spinner :show="show" />
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import Spinner from "./Spinner.vue";
// import jsonp from '../js/jsonp.js'
import { getSubject } from "../api/index";
export default {
  components: {
    Spinner
  },
  setup() {
    const state = reactive({
      jsondata: {},
      show: true
    });
    const request = () => {
      const route = useRoute();
      getSubject(route.params.id, { count: 10 }).then(res => {
        state.jsondata = res;
        state.show = false;
      });
    };

    onMounted(request);

    return {
      ...toRefs(state)
    };
  }
};
</script>
<style>
.jumbotron img {
  min-width: 200px;
  min-height: 200px;
}
</style>
