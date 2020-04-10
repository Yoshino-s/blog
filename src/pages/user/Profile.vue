<template>
  <q-page class="flex flex-center">
    <q-card class="profile">
      <span class="avatar shadow-3">
        <img :src="avatar" />
      </span>
      <q-card-section class="info">
        <q-list separator>
          <q-item>
            <q-item-section>Name</q-item-section>
            <q-item-section side>{{name}}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Email</q-item-section>
            <q-item-section side>{{email}}</q-item-section>
          </q-item>
          <q-item>
          <q-item-section>
            <q-item-label>Introduction</q-item-label>
            <q-item-label caption>{{introduction}}</q-item-label>
          </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import { profile } from '../../query/user.query';

@Component
export default class Index extends Vue {
  name = '';
  email = '';
  introduction = '';
  avatar = '';
  async created() {
    const pf = await profile();
    if(pf.name === undefined || pf.email === undefined) {
      localStorage.removeItem('jwt');
      this.$router.replace('/user/login');
    } else {
      this.name = pf.name;
      this.email = pf.email;
      this.introduction = pf.introduction || 'No introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introductionNo introduction';
      this.avatar = pf.avatar || '';
    }
  }
}
</script>
<style lang="sass" scoped>
.profile
  position: relative
  width: calc(100vw - 40px)
  max-width: 400px
  .avatar
    position: absolute
    top: 0
    left: 35%
    right: 35%
    width: 30%
    border-radius: 50%
    overflow: hidden
    background-color: #ddd
    transform: translateY(-60%)
    img
      width: 100%
      position: absolute
    &::after
      content: ''
      display: block
      margin-top: 100%
  .info
    margin-top: 10%
</style>