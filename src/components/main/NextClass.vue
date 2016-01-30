<template>
  <section class="col s8 next-class">
    <span class="hint">
      {{ $t("main.nextClass") }} <i class="mdi-action-autorenew" v-on:click="update(true)"></i>
    </span>
    <a v-if="!nextClass" v-link="{path: '/settings'}"><i class="mdi-action-settings"></i></a> {{ nextClass.name }} {{ nextClass.room }}
  </section>
</template>

<script>
  import {
    store
  }
  from '../../stores/store';

  export default {
    name: 'NextClass',

    props: ["nextClass"],

    created() {
      this.update(false);
      store.on("options-update", this.update);
    },

    beforeDestroy() {
      store.removeListener("options-update", this.update);
    },

    methods: {
      update(force = false) {
        let opts = store.getOptions();
        if (!opts.group) {
          return;
        }
        store.getTimetable(opts.group, force).then((timetable) => {
          timetable = timetable.data.classes;
          store.getHours().then((hours) => {
            hours = hours.data.hours;

            let now = new Date();
            for (let i = 0; i < hours.length; i++) {
              if (now.getMinutes() + now.getHours() * 60 < hours[i].from) {
                if (timetable[now.getDay() - 1] && timetable[now.getDay() - 1][i]) {
                  this.nextClass = timetable[now.getDay() - 1][i];
                  setTimeout(() => {
                    this.update();
                  }, (hours[i].from - (now.getMinutes() + now.getHours() * 60)) * 1000 * 60 + 2000);
                  return;
                }
              }
            }
            this.nextClass = {
              name: "Brak :)",
              room: ""
            };
          });
        });

      }
    }
  }
</script>
