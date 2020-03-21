<template>
  <div>
    <q-list bordered class="top-down-bordered" ref="drawer">
      <q-item>
        <q-item-section>分类们</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable class="no-color" v-for="cate in categories" :key="cate.name" :to="cate.to">
        <q-item-section avatar v-if="cate.icon">
          <q-icon :name="cate.icon" />
        </q-item-section>
        <q-item-section>{{cate.name}}</q-item-section>
      </q-item>
    </q-list>
    <q-list bordered class="top-down-bordered bottom">
      <q-item clickable class="no-color" to="/account/login">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>Login</q-item-section>
      </q-item>
      <q-item clickable class="no-color" to="/about">
        <q-item-section avatar>
          <q-icon name="help" />
        </q-item-section>
        <q-item-section>About</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component({
  components: {}
})
export default class Drawer extends Vue {
  categories = [
    {
      name: 'CTF',
      icon: 'security',
      to: '/categories/ctf'
    }, {
      name: 'Web',
      to: '/categories/web'
    }
  ]
}
</script>
<style lang="sass" scoped>
.bottom
  position: absolute
  bottom: 0
  width: 100%
.top-down-bordered
  border-style: solid none
</style>