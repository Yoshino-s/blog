<template>
  <div>
    <q-list bordered ref="drawer">
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
    <q-list bordered class="bottom">
      <q-item clickable class="no-color" to="/content/create">
        <q-item-section avatar>
          <q-icon name="cloud_upload" />
        </q-item-section>
        <q-item-section>Upload</q-item-section>
      </q-item>
      <q-item clickable class="no-color" to="/user/profile">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>User</q-item-section>
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
</style>