<template>
  <q-layout view="HHh LpR Lff">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn class="drawer-btn" icon="menu" round flat @click="()=>left=!left"/>
        <q-toolbar-title>
          <router-link class="no-color" to="/">
          {{ $route.meta.title || 'Yoshino-s Blog'}}
          </router-link>
        </q-toolbar-title>
        
        <FuncBtn :func="$route.meta.right || 'theme'"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" elevated>
      <Drawer/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer/>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FuncBtn from '../components/FuncBtn.vue';
import Drawer from '../components/Drawer.vue';
import Footer from '../components/Footer.vue';

@Component({
  components:{FuncBtn, Drawer, Footer}
})
export default class TitleLayout extends Vue {
  left = this.$q.screen.width > 1023;
}
</script>
<style lang="sass" scoped>
@media screen and (min-width: 1023px)
  .drawer-btn
    display: none
</style>
