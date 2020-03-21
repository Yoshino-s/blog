<template>
  <q-page class="flex flex-center">
    <q-card class="reg-card">
      <q-card-section class="more-margin">
        <keep-alive>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              dense
              v-model="name"
              label="姓名"
              lazy-rules
              :rules="[ validator.notEmptyValidator ]"
            />

            <q-input
              dense
              type="password"
              v-model="password"
              label="密码"
              lazy-rules
              :rules="[ validator.notEmptyValidator ]"
            />

            <div>
              <div class="reg-options">
                <router-link to="/account/register">注册...</router-link>
              </div>
              <q-btn
                label="提交"
                type="submit"
                color="primary"
                class="full-width"
              />
            </div>
          </q-form>
        </keep-alive>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import { notEmptyValidator } from '../../utils/validator';

@Component
export default class Index extends Vue {
  validator = { notEmptyValidator};

  onSubmit() {
    //
  }
  name = '';
  password = '';
}
</script>
<style lang="sass" scoped>
.reg-card
  position: relative
  width: calc(100vw - 40px)
  max-width: 400px
  .overlay
    height: 140px
    width: 100%
    transition: width ease-in .75s
    background-color: rgba(0, 0, 0, .4)
    position: absolute
    top: 0
  .head
    height: 140px
  .more-margin
    margin: 0 30px
  .reg-options
    margin: 0 10px 10px
    text-align: right
</style>