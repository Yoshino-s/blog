<template>
  <router-link class="no-color" :to="`/paragraph/${paragraph.id}`">
    <q-card :class="cls" :style="theme">
      <q-img :src="paragraph.headPicture" basic class="img" v-if="paragraph.headPicture"></q-img>
      <q-card-section class="title" :style="theme">
        <div>{{paragraph.title}}</div>
        <div class="tags">
          <Tag v-for="tag in paragraph.tags" :key="tag.name" :tag="tag.name"/>
        </div>
        <div class="preview" v-if="paragraph.preview">
          {{paragraph.preview}}
        </div>
        <div class="info">
          <span>{{d}}</span>
        </div>
      </q-card-section>
    </q-card>
  </router-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {getTheme} from '../utils/rgbaster';
import Tag from './Tag.vue';
import { Paragraph} from '../interface/interface';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);
dayjs.extend(utc);

@Component({
  components: {Tag}
})
export default class ShowCard extends Vue {
  @Prop() paragraph!: Paragraph;

  cls = ['card'];

  get d(): string {
    return dayjs.utc(this.paragraph.updatedAt).local().fromNow();
  }

  theme = {'background-color': '', color: 'white'}
  mounted() {
    if(this.paragraph.headPicture) {
      getTheme(this.paragraph.headPicture, 0.2).then(r => {
        this.theme['background-color'] = `rgba(${r.r}, ${r.g}, ${r.b}, .4)`;
        this.theme.color = r.isDark?'white':'#444444';
      });
      const image = new Image()
      image.src = this.paragraph.headPicture;
      image.onload = () => {
        if(image.naturalHeight / image.naturalWidth > 0.6) {
          this.cls.push('horizon');
        } else {
          this.cls.push('vertical');
        }
      }
    } else {
      this.cls.push('no-img');
      this.theme['background-color'] = `rgba(${Math.random()*128}, ${Math.random()*128}, ${Math.random()*128}, .4)`;
    }
  }
}
</script>
<style lang="sass" scoped>
.card
  position: relative
  height: 240px
  margin-bottom: 60px
  overflow: hidden
  display: flex
  &:hover .img
    transform: scale(1.2, 1.2)
    transition: transform ease-out 2s
  .img
    width: 100%
    height: 100%
    transition: transform ease-out .5s
    border-radius: 0 !important
  .title
    >div
      width: 100%
      word-wrap: break-word
    padding: .2em .5em
    font-size: 1.6em
    line-height: 1em
    border-radius: 0 !important
    text-align: right
    .tags
      font-size: .6em
      line-height: 1.2em
    .preview
      margin: .5em 0
      font-size: .5em
      line-height: 1.2em
    .info
      font-size: .8em 
  &.vertical
    .title
      position: absolute
      bottom: 0
      width: 100%
    .preview
      display: none
  &.horizon
    .img
      flex: initial
      max-width: 60%
    .title
      flex: auto
      max-width: 40%
    .preview
      display: none
  &.no-img
    height: 180px
    .title
      padding: .4em .5em
      width: 100%
      text-align: left
      font-size: 1.8em
</style>