<template>
  <section class="col s12 quote" transition="topacity">
    <span class="hint">{{$t("main.quote")}} <i class="mdi-action-autorenew" v-on:click="update"></i></span>
    <preloader v-if="!quote"></preloader>
    <p class="flow-text">{{ quote.message }}</p>
  </section>
</template>

<script>
  import {
    store
  }
  from '../../stores/store';
  import Preloader from '../Preloader.vue';
  export default {
    name: "Quote",
    components: {
      preloader: Preloader
    },
    props: ["quote"],

    created() {
      this.update();
    },

    methods: {
      update() {
        store.getQuote().then((e) => {
          //if (this.timeout) {
          //  window.clearTimeout(this.timeout);
          //}
          this.quote = e.data.quote;
          //this.timeout = setTimeout(this.update, 1000 * 60 * 5);
        });
      }
    }
  }
</script>
