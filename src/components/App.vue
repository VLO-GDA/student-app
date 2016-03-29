<template>
  <nav>
    <ul class="row center-align">
      <li class="col s3" v-link-active><a v-link="{path: '/', exact:true, activeClass: 'active'}"><i class="small mdi-action-home"></i></a></li>
      <li class="col s3" v-link-active><a v-link="{path: '/timetable', activeClass: 'active'}"><i class="small mdi-action-today"></i></a></li>
      <li class="col s3" v-link-active><a v-link="{path: '/media', exact:true, activeClass: 'active'}"><i class="small mdi-action-perm-media"></i></a></li>
      <li class="col s3" v-link-active><a v-link="{path: '/settings', activeClass: 'active'}"><i class="small mdi-action-settings"></i></a></li>
    </ul>
  </nav>
  <router-view></router-view>
</template>
