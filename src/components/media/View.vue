<template>
  <categories></categories>
  <preloader v-if="!articles"></preloader>
  <div class="news-feed collection">
	<article class="collection-item avatar" v-on:click="goto(art.link)" v-for="art in articles">
		<img src="{{art.thumbnail}}
" class="responsive-img circle">
		<span class="title">{{art.title}}</span>
		<p class="">{{art.description}}</p>
	</article>
  </div>
</template>

<script>
  import {
    store
  }
  from '../../stores/store';
  import Preloader from '../Preloader.vue';

  export default {
    name: "mediaView",
    props: ["articles"],
    components: [Preloader],
    created() {
      store.getMedia().then((res) => {
        this.articles = res.data.media;
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
