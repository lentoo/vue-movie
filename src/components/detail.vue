<template>
    <div>
        <div class="jumbotron">
            <h1>{{jsondata.title}}</h1>
            <p><img :src="jsondata.images.large" alt=""></p>
            <p>{{jsondata.summary}}</p>

        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import jsonp from '../js/jsonp.js'
    export default {
        created() {
            this.request();
        },
        data() {
            return {
                jsondata: {}
            }
        },
        methods: {
            request() {
                jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id, { count: 10 }, function (data) {
                    this.jsondata = data;
                }.bind(this))
            }
        }
    }

</script>