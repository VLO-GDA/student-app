import Vue from 'vue';
import Router from 'vue-router';
import App from './components/App.vue';
import MainView from './components/main/View.vue';
import SettingsView from './components/settings/View.vue';
import TimetableView from './components/timetable/View.vue';
const i18n = require('vue-i18n');

if(navigator.serviceWorker) {
  navigator.serviceWorker.register('./service-worker.js').then((registration) => {
    // registration.pushManager.subscribe({
    //   userVisibleOnly: true
    // }).then((subscription) => {
    //
    // }).catch((err) => {
    //   console.log("Error occured while registering to push-notifications.", err);
    // });
    console.log('Registered service-worker successfully ', registration.scope);
  }).catch((err)=> {
    console.log('Error occured while registering service-worker: ', err);
  });
}

require("../scss/style.scss");

//Vue
Vue.use(Router);
Vue.use(i18n, {
  lang: 'pl',
  locales: {
    pl: require("./locales/pl.json")
  }
});

var router = new Router();

router.map({
  '/': {
    component: MainView
  },
  '/settings': {
    component: SettingsView
  },
  '/timetable': {
    component: TimetableView
  }
});

router.beforeEach(()=>{
  window.scrollTo(0,0);
});

router.start(App, '#app');
