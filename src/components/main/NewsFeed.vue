<template>
  <preloader v-if="!articles"></preloader>
  <article v-on:click="goto(art.link)" v-for="art in articles">
    <h1>{{art.title}}</h1>
    <p class="flow-text">{{art.excerpt}}</p>
    <p class="author">{{art.author}}</p>
  </article>
</template>

<script>
  import {
    store
  }
  from '../../stores/store';
  import Preloader from '../Preloader.vue';

  export default {
    name: "newsFeed",
    props: ["articles"],
    components: [Preloader],
    created() {
      store.getNews().then((res) => {
        this.articles = res.data.news;
      }).catch((e) => {
        console.log(e);
      });
    },
    methods: {
      goto: function(link) {
        window.open(link, '_blank');
      }
    }
  }
</script>
