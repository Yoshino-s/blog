<template>
  <q-card class="sidebar">
    <WidgetIntro v-if="!hideAbout"/>
    <q-separator v-if="!hideAbout"/>
    <WidgetTags/>
    <q-separator/>
    <Widget title="友情链接" class="friendly">
      <span v-for="(link, name) in links" :key="name"><a :src="link" class="color">{{name}}</a></span>
      <router-link to="/links" class="color">以及更多</router-link>
    </Widget>
    <q-separator/>
    <Widget title="AD">
      这里是广告
    </Widget>
    <slot>
    </slot>
  </q-card>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import badget from '../../assets/badget.png';
import WidgetIntro from './Intro.vue';
import WidgetTags from './Tags.vue';
import Widget from './Widget.vue';

@Component({
  components: {WidgetIntro, WidgetTags, Widget}
})
export default class SideBar extends Vue {
  @Prop() hideAbout?: boolean;

  badget = badget;
  links = {};
}
</script>
<style lang="sass">
.sidebar
  font-size: .8rem
  position: sticky
  top: 80px
  .divider
    height: 1px
    width: 95%
    margin: 0 auto
    background-color: #bbbbbb
  .friendly
    span
      display: inline-block
      margin-left: 10px
      width: 100%
      font-size: 1.05em
</style>