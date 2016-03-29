<template>
  <main transition="topacity" class="">
    <div class="row info-panel z-depth-1">
      <lucky-number></lucky-number>
      <next-class keep-alive></next-class>
      <quote></quote>
    </div>
    <section class="news-feed">
      <news-feed keep-alive></news-feed>
    </section>
  </main>
</template>

<script>
  import LuckyNumber from './LuckyNumber.vue';
  import NextClass from './NextClass.vue';
  import NewsFeed from './NewsFeed.vue';
  import Quote from './Quote.vue';

  export default {
    name: "MainView",
    components: {
      luckyNumber: LuckyNumber,
      nextClass: NextClass,
      newsFeed: NewsFeed,
      quote: Quote
    }
  }
</script>
