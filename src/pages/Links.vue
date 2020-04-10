<template>
  <q-page>
    <CustomHead
      class="paragraph-head flex flex-center"
      :style="`background-image: url(${img}); color: ${theme.color}`"
    >
      <div class="title">
        <span class="head-text">以下是各位师傅的友情链接</span>
      </div>
    </CustomHead>
    <div class="row content flex flex-center">
      <div class="card" v-for="link in links" :key="link[0][0]">
        <q-card>
          <q-card-section>
            <div v-for="e in link" :key="e[1]">
              <a :href="e[1]" class="color">{{e[0]}}</a>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CustomHead from '../components/CustomHead.vue';
import img from '../assets/3.png';
import { getTheme } from '../utils/rgbaster';
import linkJSON from '../assets/links.json';

const links: [string, string][][] = [[], []];

const c = Object.entries(linkJSON);
const len = Math.ceil(c.length / 3);
links[0] = c.splice(0, len);
links[1] = c.splice(0, len);
links[2] = c;

@Component({
  components: { CustomHead}
})
export default class About extends Vue {
  img = img;

  links = links;

  theme = {color: 'white'}
  mounted() {
    getTheme(this.img, 0.2).then(r => {
      this.theme.color = r.isDark?'white':'#444444';
    });
  }
}
</script>
<style lang="sass" scoped>
.content
  margin: 10px auto
  z-index: 10
  align-items: flex-start
  .card
    height: 100%
    flex: 1
    >div
      margin: 0 10px
.paragraph-head
  background-size: cover
  background-position: center
  .title
    transform: translateY(-25px)
    text-align: center
  .head-text
    display: block
    font-weight: 600
    font-size: 2.5em
</style>