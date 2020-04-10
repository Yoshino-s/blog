<template>
  <q-page class="flex flex-center">
    <q-card class="reg-card">
      <q-card-section class="peach">
        你在想Peach<br/>
        <span class="hid">你真的在想Peach</span>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Index extends Vue {
}
</script>
<style lang="sass" scoped>
.reg-card
  position: relative
  width: calc(100vw - 40px)
  max-width: 400px
  .peach
    font-size: 2em
    font-weight: 600
    text-align: center
    margin: 0 30px
    .hid
      opacity: 0
</style>