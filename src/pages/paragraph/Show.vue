<template>
  <q-page>
    <CustomHead
      class="paragraph-head flex flex-center"
      :style="theme"
    >
      <div class="title">
        <span class="head-text">{{paragraph.title}}</span>
        <span class="date">{{d}}</span>
      </div>
    </CustomHead>
    <div class="row content">
      <main class="col-8">
        <q-card class="card">
          <q-card-section>
            <q-markdown ref="markdown" :src="md" toc @data="onToc" />
          </q-card-section>
        </q-card>
      </main>
      <div class="col-4 side" style="padding-left: 30px">
        <SideBar :hide-about="true">
          <q-separator />
          <Widget title="TOC">
            <q-tree :nodes="tree" node-key="label" :default-expand-all="true">
              <template v-slot:default-header="prop">
                <a class="row items-center no-color" :href="'#'+prop.node.id">
                  <div class="text-weight-bold">{{ prop.node.label }}</div>
                </a>
              </template>
            </q-tree>
          </Widget>
        </SideBar>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SideBar from '../../components/SideBar/SideBar.vue';
import CustomHead from '../../components/CustomHead.vue';
import { getTheme } from '../../utils/rgbaster';
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import Widget from '../../components/SideBar/Widget.vue';
import { showParagraph } from '../../query/content.query';
import { Paragraph } from '../../interface/interface';

dayjs.extend(relativeTime);

type Node = {
  id: string;
  label: string;
  level: number;
  children: Node[];
}

@Component({
  components: {SideBar, CustomHead, Widget}
})
export default class Show extends Vue {
  paragraph: Paragraph = {
    id: 0,
    description: '',
    preview: '',
    paragraph: '',
    paragraphLink: '',
    headPicture: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    category: '',
    title: ''
  }

  md = '';

  tree: Node[] = [];

  get d(): string {
    return dayjs(this.paragraph.createdAt).fromNow();
  }

  theme = {
    color: 'white',
    background: 'rgba(0, 0, 0, .4)'
  }
  async mounted() {
    const res = await showParagraph(this.$route.params.id);
    if(!res.paragraph) {
      this.$q.dialog({
        title: res.message
      });
    } else {
      this.paragraph = res.paragraph;
      if(this.paragraph.headPicture) {
        this.theme.background = `url(${this.paragraph.headPicture})`;
        getTheme(this.paragraph.headPicture, 0.2).then(r => {
          this.theme.color = r.isDark?'white':'#444444';
        });
      } else {
        this.theme.background = `rgba(${Math.random()*128}, ${Math.random()*128}, ${Math.random()*128}, .4)`;
      }
      
      if(this.paragraph.paragraphLink) {
        this.md = await (await fetch(this.paragraph.paragraphLink)).text();
      } else {
        this.md = this.paragraph.paragraph;
      }
    }
  }

  getWeight(level: number) {
    if(level)
      if(level<=2)
        return 600;
    return 200;
  }

  onToc(toc: Node[]) {
    if(toc.length===0) {
      return;
    }
    const tree: Node[] = [];
    const currentPath: Node[] = [];
    toc.forEach(node => {
      if(currentPath.length===0) {
        tree.push(node);
        currentPath.push(node);
      } else {
        if(node.level>currentPath[currentPath.length-1].level) {
          currentPath[currentPath.length-1].children.push(node);
          currentPath.push(node);
        } else {
          while(node.level<=currentPath[currentPath.length-1].level) {
            currentPath.pop();
          }
          if(currentPath.length===0) {
            tree.push(node);
            currentPath.push(node);
          } else {
            currentPath[currentPath.length-1].children.push(node);
            currentPath.push(node);
          } 
        }
      }
    });
    this.tree = tree;
  }
}
</script>
<style lang="sass" scoped>
.content
  width: 95%
  max-width: 1000px
  margin: 10px auto
  z-index: 10
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
  .author, .date
    padding-right: 2em
    display: block
    text-align: right
    font-size: 1.4em
</style>