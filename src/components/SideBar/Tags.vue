<template>
  <Widget title="Tags" class="widget-tags">
    <router-link class="no-color" :to="`/tag/${tag}`" v-for="tag in tags" :key="tag">
      <Tag :tag="tag"/>
    </router-link>
  </Widget>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Widget from './Widget.vue';
import Tag from '../Tag.vue';
import { listAllTags } from '../../query/tag.query';

@Component({
  components: {Widget, Tag}
})
export default class WidgetTags extends Vue {
  tags: string[] = [];
  async created() {
    this.tags = (await listAllTags()).tags?.map(t => t.name) ?? [];
  }
}
</script>
<style lang="sass">
.widget-tags
  .tag
    display: inline-block
    padding: 0 .5em
    margin: .2em .2em
</style>