<template>
  <Widget title="About Me" class="widget-intro">
    <div class="badget">
      <img :src="badget" />
    </div>
    <div class="content" v-html="content"></div>
    <div class="abouts">
      <span class="about">
        <a v-for="v in abouts" :key="v[0]" :href="v[1]">
          <q-btn round flat :icon="v[0]" />
        </a>
      </span>
    </div>
  </Widget>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import badget from '../../assets/badget.png';
import Widget from './Widget.vue';
import githubW from '../../assets/logo/github.white.svg';
import githubB from '../../assets/logo/github.black.svg';
import qqW from '../../assets/logo/qq.white.svg';
import qqB from '../../assets/logo/qq.black.svg';
import zhihuW from '../../assets/logo/zhihu.white.svg';
import zhihuB from '../../assets/logo/zhihu.black.svg';

@Component({
  components: {Widget}
})
export default class WidgetIntro extends Vue {
  badget = badget;
  content = '比赛ID：Yoshino-s，来自华东师范大学，目前在华东师大<a class="color">Metasequoia校队</a>以及<a class="color">V&N联合战队</a>。\
  主要方向Misc/Web，新手一枚。VS Code, Typescript忠实用户，前端切图手。';
  get abouts() {
    return [
      ['img:'+(this.$q.dark.isActive?githubW:githubB), 'https://www.github.com/yoshino-s/'],
      ['img:'+(this.$q.dark.isActive?qqW:qqB), 'https://www.github.com/yoshino-s/'],
      ['img:'+(this.$q.dark.isActive?zhihuW:zhihuB), 'https://www.zhihu.com/people/yoshino-34'],
    ]
  }
}
</script>
<style lang="sass">
.widget-intro
  .badget
    width: 60%
    margin: 0 auto
    img
      width: 100%
  .abouts
    display: flex
    justify-content: center
</style>