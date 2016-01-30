<template>
  <main transition="topacity">
    <form class="input-field row settings">
      <div class="input-field col s10 offset-s1">
        <select class="browser-default" name="group" id="group" v-model="group">
          <option v-for="grp in groups" v-bind:value="grp">{{ grp }}</option>
        </select>
        <label for="group" class="active">{{ $t("settings.group") }}</label>
      </div>
      <div class="input-field col s10 offset-s1">
        <input id="number" type="number" v-model="number" min="1" max="35" lazy>
        <label for="number" class="active">{{ $t("settings.number")}}</label>
      </div>
      <!--<div class="input-field col s10 offset-s1">
      <input type="checkbox" class="filled-in" id="notifications" checked="checked" name="notification">
      <label for="notifications" class="active">{{ $t("settings.notifications") }}</label>
    </div>-->
    </form>
  </main>
</template>

<script>
  import {
    store
  }
  from '../../stores/store';

  const GROUPS = [
    "IA", "IB", "IC", "ID", "IF",
    "IIA", "IIB", "IIC", "IID", "IIF",
    "IIIA", "IIIB", "IIIC", "IIID", "IIIF"
  ];

  export default {
    name: "SettingsView",

    data: function() {
      return {
        groups: GROUPS
      };
    },

    watch: {
      number: function(newV, oldV) {
        let opts = store.getOptions();
        opts.number = newV;
        store.setOptions(opts);
      },
      group: function(newV, oldV) {
        let opts = store.getOptions();
        opts.group = newV;
        store.setOptions(opts);
      }
    },

    props: {
      number: {
        type: Number
      },
      group: {
        validator: function(value) {
          return GROUPS.indexOf(value) >= 0;
        }
      },
      notifications: {
        type: Boolean
      }
    },

    created() {
      let opts = store.getOptions();
      this.number = opts.number;
      this.group = opts.group;
      this.selected = opts.group;
    }
  }
</script>
