<template>
  <main transition="topacity">
    <p class="flow-text center-align">{{$t("timetable.warning")}}</p>
    <table class="flow-text centered striped" v-for="tt in timetable">
      <thead>
        <tr>
          <th colspan="3">{{$t("timetable.days["+tt.day+"]")}}</th>
        </tr>
        <tr>
          <th data-field="time" width="30%">{{$t("timetable.hour")}}</th>
          <th data-field="id" width="50%">{{$t("timetable.class")}}</th>
          <th data-field="price" width="20%">{{$t("timetable.room")}}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="hour in hours" v-if="tt[$index]">
          <td width="30%">{{convertToReadable(hour.from)}} - {{convertToReadable(hour.to)}}</td>
          <td width="50%">{{tt[$index].name}}</td>
          <td width="20%">{{tt[$index].room}}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
  import {
    store
  }
  from '../../stores/store';

  export default {
    name: "TimetableView",

    props: ["timetable", "hours"],

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
          window.location = "/#!/settings";
          return;
        }
        store.getHours(false).then(hours => {
          this.hours = hours.data.hours;
          store.getTimetable(opts.group, force).then(timetable => {
            this.timetable = timetable.data.classes;

            for (let clazz in this.timetable) {
              this.timetable[clazz].day = clazz;
            }

            let current = new Date().getDay() - 1;
            if (!this.timetable[current]) {
              return;
            }
            this.timetable = this.timetable.concat(this.timetable.splice(0, current));
          });
        });
      },
      convertToReadable(minutes) {
        let mins = minutes % 60;
        return Math.floor(minutes / 60) + ":" + ((mins < 10) ? "0" + mins : mins);
      },
      strip(input) {
        return input.substr(input, 10);
      }
    }
  }
</script>
