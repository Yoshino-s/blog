<template>
  <div>
    <q-btn flat round :icon="icon" v-if="icon" @click="click"/>
    <q-btn flat round  icon="home" v-if="icon" @click="backHome"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FuncBtn extends Vue {
  @Prop()
  func!: 'back' | 'home' | 'menu' | 'theme';

  get icon(): string {
    const map = {
      back: 'arrow_back',
      home: 'home',
      menu: 'apps',
      theme: this.$q.dark.isActive ? 'brightness_5' : 'brightness_3'
    }
    return map[this.func];
  }

  backHome() {
    this.$router.push('/')
  }

  click() {
    const actions = {
      theme: () => this.$q.dark.toggle(),
      back: () => this.$router.back(),
      home: this.backHome,
      menu: () => 0
    };
    actions[this.func]();
  }
}
</script>
