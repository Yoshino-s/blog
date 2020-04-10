<template>
  <q-page>
    <Head />
    <div class="row content">
      <main class="col-8">
        <ShowCard
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          :paragraph="paragraph"
        />
        <div class="flex flex-center">
          <q-pagination
            v-model="current"
            color="purple"
            :max="10"
            :max-pages="6"
            :boundary-numbers="true"
            class="pagi"
          ></q-pagination>
        </div>
      </main>
      <div class="col-4" style="padding-left: 30px">
        <SideBar />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ShowCard from '../components/ShowCard.vue';
import SideBar from '../components/SideBar/SideBar.vue';
import Head from '../components/Head.vue';
import {listParagraphs} from '../query/content.query';
import { Paragraph } from '../interface/interface';
import img0 from '../assets/1.jpg';
import img1 from '../assets/logo.jpg';

@Component({
  components: {ShowCard, SideBar, Head}
})
export default class Index extends Vue {
  paragraphs: Paragraph[] = [];
  current = 0;
  limit = 10;
  img0 = img0;img1 = img1;

  created() {
    this.update();
  }

  async update() {
    this.paragraphs = (await listParagraphs({offset: this.current * this.limit, limit: this.limit})).paragraphs ?? [];
  }
}
</script>
<style lang="sass">
.content
  width: 95%
  max-width: 900px
  margin: 10px auto
</style>