<template>
  <q-page>
    <CustomHead
      class="head flex flex-center"
      :style="`color: ${theme.color}`"
    >
      <div class="title">
        <span class="head-text">Search Result of {{$route.params.name}}</span>
      </div>
    </CustomHead>
    <div class="row content">
      <main class="col-8">
        <ShowCard v-for="(paragraph, index) in paragraphs" :key="index" :paragraph="paragraph" />
      </main>
      <div class="col-4" style="padding-left: 30px">
        <SideBar />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ShowCard from '../../components/ShowCard.vue';
import SideBar from '../../components/SideBar/SideBar.vue';
import { Paragraph } from '../../interface/interface';
import img from '../../assets/4.png';
import CustomHead from '../../components/CustomHead.vue';
import { getTheme } from '../../utils/rgbaster';

@Component({
  components: {ShowCard, SideBar, CustomHead}
})
export default class TagSearch extends Vue {
  paragraphs: Paragraph[] = [];
  current = 0;
  limit = 10;
  img0 = img;

  theme = {color: 'white'}
  mounted() {
    getTheme(this.img0, 0.2).then(r => {
      this.theme.color = r.isDark?'white':'#444444';
    });
  }
  
}
</script>
<style lang="sass" scoped>
.content
  width: 95%
  max-width: 900px
  margin: 10px auto
.body--dark
  .head
    background-image: linear-gradient(to bottom right, desaturate($secondary, 10%), $secondary)
.head
  background-image: linear-gradient(to bottom right, $secondary, saturate($secondary, 20%))
  .title
    transform: translateY(-25px)
    text-align: center
  .head-text
    display: block
    font-weight: 600
    font-size: 2.5em
</style>