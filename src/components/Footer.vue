<template>
  <div>
    <div :style="adjustContainer">
    </div>
    <q-footer elevated class="footer-container">
      <div class="img" :style="style">
        <img :src="url" id="footer-image" />
        <q-resize-observer @resize="onResize" />
      </div>
      <div class="cus-footer bg-grey-8 text-white" :style="adjust">
        <div>
          Build by Yoshino-s.
          <br />Powdered By VueJS Quasar NestJS
          <br /><span style="font-size: .6em;line-height: .6em">{{hitokoto||'如果不是真爱，谁又愿意做舔狗呢'}}</span> 
        </div>
      </div>
    </q-footer>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import footer from '../assets/footer.png';

@Component
export default class Footer extends Vue {
  url = footer;

  hitokoto = ''

  style = {
    left: '0px',
    top: '0px',
  }

  adjust = {
    'min-height': '0px',
  }

  adjustContainer = {
    'height': '0px'
  }

  mounted() {
    const img = document.getElementById('footer-image') as HTMLImageElement;
    img.onload = () => this.onResize();
    fetch('https://v1.hitokoto.cn/').then(r=>r.json()).then(j => this.hitokoto = `${j.hitokoto} ----「${j.from}」`)
  }

  onResize() {
    const img = document.getElementById('footer-image') as HTMLImageElement;
    const {width, height} = img.getBoundingClientRect()
    this.style.left = `calc((100% - ${width}px) / 2)`;
    this.style.top = `-${height * 0.802}px`;
    this.adjust['min-height'] = `${height * 0.198}px`;
    this.adjustContainer['height'] = `${height * 0.802}px`;
  }
}
</script>
<style lang="sass" scoped>
.footer-container
  .img
    position: absolute
    width: 100%
    max-width: 640px
    img
      width: 100%
  .cus-footer
    padding: 10px
    text-align: center
    display: flex
    justify-items: center
    align-items: center
    >*
      flex: auto
</style>