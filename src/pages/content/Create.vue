<template>
  <q-page class="flex">
    <div class="row q-col-gutter-xs" style="width: 95%;margin: 10px auto;">
      <div class="col-6">
        <q-card flat bordered>
          <q-form @submit="submit" ref="form">
            <q-card-section>
              <q-file v-model="model" label="Select your markdown." @input="change" name="md_file" />
            </q-card-section>
            <q-card-section>
              The Markdown include follow pictures, which cannot be loaded:
              <ul>
                <li v-for="(v, k) in imgs" :key="k">
                  {{v.reason}} Url: {{k}}
                  <q-file
                    :name="k"
                    filled
                    dense
                    label="Replace"
                    @input="f => uploadUnresolved(k, f)"
                    v-model="uploadUnresolvedFiles[k]"
                  />
                </li>
              </ul>
            </q-card-section>
            <q-card-section>
              <q-btn label="Submit" type="submit" color="primary" filled/>
            </q-card-section>
          </q-form>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered class="show">
          <q-card-section class="flex flex-center" v-if="loading">
            <q-circular-progress indeterminate size="50px" color="lime" style="margin: 0 auto;"/>
          </q-card-section>
          <q-card-section v-else-if="result" id="show">
            <q-markdown :src="result"></q-markdown>
          </q-card-section>
          <q-card-section v-else>
            Rendered will be shown here.
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import { UnresolvedImages, parseMarkdown } from '../../utils/markdown';
import img404 from '../../assets/img404.png';

@Component
export default class QuestionCreate extends Vue {
  model: File|null = null;
  result = '';
  loading = false;
  imgs: UnresolvedImages = {};
  uploadUnresolvedFiles: Record<string, File|null> = {};

  mounted() {
    window.addEventListener('error', e => {
      const ele = e.target as HTMLImageElement;
      if(!ele || ele.tagName.toUpperCase() !== 'TAG') {
        return;
      }
      ele.src = img404;
    })
  }
  
  change(f: File) {
    this.result = '';
    this.loading = true;
    this.imgs = {};
    this.uploadUnresolvedFiles = {};

    const reader = new FileReader();
    if(!reader)
      return;

    reader.onload = async (e) => {
      const result = e.target?.result;
      if(typeof result === 'string') {
        const parsed = await parseMarkdown(e.target?.result as string);
        this.imgs = parsed;
        for(const k in Object.keys(parsed.unresolvedImages)) {
          this.uploadUnresolvedFiles[k] = null;
        }
        this.loading = false;
        this.result = result;
      }
    }
    reader.readAsText(f);
  }
  uploadUnresolved(k: string, f: File) {
    console.log(this.uploadUnresolvedFiles[k]);
    const imgs = document.getElementById('show')?.getElementsByTagName('img');
    if(!imgs)
      return;
    console.log(imgs);
    const img = Array.from(imgs).find(e => (e.attributes as any)?.src?.value === k);
    if(!img)
      return;
    console.log(img);
    const reader = new FileReader();
    if(!reader)
      return;
    reader.onload = async (e) => {
      const result = e.target?.result;
      if(typeof result === 'string') {
        img.src = result;
      }
    }
    reader.readAsDataURL(f);
  }
  submit() {
    const el = (this.$refs.form as Vue).$el as HTMLFormElement;
    fetch('http://localhost:3000/content/upload', {
      method: 'POST',
      body: new FormData(el)
    }).then(console.log);
  }
}
</script>
<style lang="sass">
.show
  overflow-x: hidden
  max-height: calc(100vh - 80px)
  font-size: 12px
  img
    max-width: 100%
  h1
    font-size: 2.5em
  h2
    font-size: 2em
  h3
    font-size: 1.5em
  h4
    font-size: 1em
  pre
    border: 1px solid rgba(0, 0, 0, 0.12)
    border-radius: 4px
    overflow-x: auto
    &.hljs
      padding: 8px 2px
      border-radius: 5px
      position: relative
    ol
      list-style: decimal
      margin: 0
      margin-left: 40px
      margin-top: 1em
      padding: 0
      li
        list-style: decimal-leading-zero
        position: relative
        padding-left: 10px
        .line-num
          position: absolute
          left: -40px
          top: 0
          width: 40px
          height: 100%
          border-right: 1px solid rgba(0, 0, 0, .66)
    b.name
      position: absolute
      top: 2px
      right: 12px
      color: #999
      pointer-events: none
    b.name i
      pointer-events: auto
      cursor: pointer
</style>
