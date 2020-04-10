<template>
  <q-page class="flex">
    <div class="row ediotr-container">
      <div class="col-6">
        <q-card class="editor">
          <q-card-section>
            <q-file v-model="paragraph" label="Select your markdown." @input="change" />
            <q-file v-model="headPicture" label="Select your head picture" @input="headPictureChange"/>
          </q-card-section>
          <q-card-section v-if="Array.from(Object.keys(imgs)).length">
            The Markdwon include follow pictures, which cannot be loaded:
            <ul>
              <li v-for="(v, k) in imgs" :key="k">
                {{v.reason}} Url: {{decodeURIComponent(k)}}
                <q-file
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
            Metadata
            <q-input v-model="title" label="Title" />
            <q-input v-model="category" label="Category(Case insensitive)" />
            <div class="tags">
              <q-chip
                v-for="(tag, i) in tags"
                :key="tag"
                removable
                @remove="()=>{tags.splice(i);}"
              >{{tag}}</q-chip>
              <q-input bottom-slots v-model="tag" label="New tag(Case insensitive)" @keyup.enter="add">
                <template v-slot:append>
                  <q-btn round color="primary" icon="add" dense @click="add" />
                </template>
              </q-input>
            </div>
            <q-input v-model="description" autogrow label="Description" />
            <q-input v-model="preview" autogrow label="Preview" bottom-slots>
              <template v-slot:append>
                <q-btn round color="primary" icon="cached" dense @click="gen" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-btn label="Submit" color="primary" filled @click="submit"/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="show">
          <q-card-section class="flex flex-center" v-if="loading">
            <q-circular-progress indeterminate size="50px" color="lime" style="margin: 0 auto;" />
          </q-card-section>
          <q-card-section v-else-if="result" id="show">
            <q-img :src="headPic"></q-img>
            <q-markdown :src="result" id="result"></q-markdown>
          </q-card-section>
          <q-card-section v-else>Rendered will be shown here.</q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import { UnresolvedImages, parseMarkdown } from '../../utils/markdown';
import img404 from '../../assets/img404.png';
import { createParagraph, UploadDTO } from '../../query/content.query';

@Component
export default class QuestionCreate extends Vue {
  paragraph: File|null = null;
  headPicture: File|null = null;  
  result = '';
  headPic = '';
  loading = false;
  imgs: UnresolvedImages = {};
  uploadUnresolvedFiles: Record<string, File|null> = {};

  title = '';
  category = '';
  tags: string[] = [];
  tag = '';
  description = '';
  preview = '';

  mounted() {
    window.addEventListener('error', e => {
      const ele = e.target as HTMLImageElement;
      if(!ele || ele.tagName.toUpperCase() !== 'IMG') {
        return;
      }
      ele.src = img404;
    })
  }

  add() {
    if(this.tag) {
      this.tags.push(this.tag);
      this.tag = '';
    }
  }

  gen() {
    const ele = document.getElementById('result');
    if(!ele)
      return;
    const res = ele.innerText.replace(/\n/g,' ');
    (window as any).res = res;
    this.preview = res.slice(0, 300) + '...';
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
        for(const k in Object.keys(parsed)) {
          this.uploadUnresolvedFiles[k] = null;
        }
        this.loading = false;
        this.result = result;
      }
    }
    reader.readAsText(f);
  }

  headPictureChange(f: File) {
    const reader = new FileReader();
    if(!reader)
      return;
    reader.onload = async (e) => {
      const result = e.target?.result;
      if(typeof result === 'string') {
        this.headPic = result;
      }
    }
    reader.readAsDataURL(f);
  }
  uploadUnresolved(k: string, f: File) {
    const imgs = document.getElementById('show')?.getElementsByTagName('img');
    if(!imgs)
      return;
    const img = Array.from(imgs).find(e => (e.attributes as any)?.src?.value === k);
    if(!img)
      return;
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
  async submit() {
    if(!this.paragraph || !this.headPicture) {
      this.$q.notify({
        type: 'negative',
        message: 'Please select the file.',
        timeout: 1000
      });
      return;
    }
    const options: UploadDTO = {
      title: this.title,
      description: this.description,
      preview: this.preview,
      paragraph: this.paragraph,
      tags: JSON.stringify(this.tags),
      category: this.category,
      headPicture: this.headPicture
    };
    for(const [f, v] of Object.entries(this.uploadUnresolvedFiles)) {
      if(v!==null)
        options[f] = v;
    }
    const res = await createParagraph(options);
    if(res.link) {
      this.$router.push(res.link);
    } else {
      this.$q.dialog({
        title: res.message
      });
    }
  }
}
</script>
<style lang="sass">
.ediotr-container
  width: 95%
  margin: 0 auto
  margin-top: 20px
  >div
    padding: 0 10px
  .editor
    .tags
      margin-top: 5px
</style>