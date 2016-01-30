<template>
  <nav>
    <ul class="row center-align">
      <li class="col s5" v-link-active><a v-link="{path: '/', exact:true, activeClass: 'active'}"><i class="small mdi-action-home"></i>{{$t("menu.home")}}</a></li>
      <!--<li class="col s4"><i class="small mdi-action-book"></i>{{$t("menu.newspaper")}}</li>-->
      <li class="col s5" v-link-active><a v-link="{path: '/timetable', activeClass: 'active'}"><i class="small mdi-action-today"></i>{{$t("menu.timetable")}}</a></li>
      <li class="col s2" v-link-active><a v-link="{path: '/settings', activeClass: 'active'}"><i class="small mdi-action-settings"></i></a></li>
    </ul>
  </nav>
  <router-view></router-view>
</template>
