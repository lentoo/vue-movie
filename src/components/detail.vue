<template>
    <div>
        <div class="jumbotron" v-if="jsondata.title">
            <h1>{{jsondata.title}}</h1>
            <p><img :src="jsondata.images.large" alt=""></p>
            <p>{{jsondata.summary}}</p>
        </div>
        <Spinner :show="show" />
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import Spinner from './Spinner.vue'
    // import jsonp from '../js/jsonp.js'
    import { getSubject } from '../api/index'
    export default {
        components: {
            Spinner
        },
        created() {
            this.request();
        },
        data() {
            return {
                jsondata: {},
                show: true
            }
        },
        methods: {
            request() {
                getSubject(this.$route.params.id, { count: 10 }).then(res => {
                    this.jsondata = res;
                    this.show = false
                })
            }
        }
    }

</script>
<style>
.jumbotron img {
    min-width: 200px;
    min-height: 200px;
}
</style>