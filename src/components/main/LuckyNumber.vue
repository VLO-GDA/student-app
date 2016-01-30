<template>
  <section class="col s4 lucky-number {{class}}">
    <span class="hint">
      {{  $t("main.luckyNumber") }} <i class="mdi-action-autorenew" v-on:click="update(true)"></i>
    </span>
    {{{ number }}}
  </section>
</template>

<script>
  import {store} from '../../stores/store';

  export default {
    name: 'LuckyNumber',

    props: {
      number: {
        type: Number,
        default: '?'
      },
      class: {
        type: String
      }
    },

    methods: {
      update(force = false) {
        store.getLuckyNumber(force).then(number => {
          if(!number.valid) {
            throw "Invalid";
            return;
          }

          this.number = number.data.number;
          let opts = store.getOptions();
          this.class = opts.number == this.number ? 'active' : '';
        }).catch((e) => {
          this.class = '';
          this.number = '?';
          this.timeout = setTimeout(() => {
            this.update();
          },100000)
        });
      }
    },

    created() {
      this.update(false);
      store.on("options-update", this.update)
    },

    beforeDestroy() {
      store.removeListener("options-update", this.update);
      window.clearTimeout(this.timeout);
    }
  }
</script>
