<template>
  <q-page class="flex flex-center">
    <q-card class="reg-card">
      <q-card-section class="more-margin">
        <keep-alive>
          <q-form @submit="onSubmit" class="q-gutter-md">
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
              <router-link to="/user/register">注册</router-link>
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
import {login} from '../../query/user.query';

@Component
export default class Index extends Vue {
  validator = { notEmptyValidator};

  async onSubmit() {
    const res = await login(this.name, this.password);
    if(res.jwt) {
      this.$q.notify({
        type: 'positive',
        message: `Welcome ${this.name}.`,
        timeout: 1000
      });
      localStorage.setItem('jwt', res.jwt);
      this.$router.push('/');
    } else {
      this.$q.notify({
        type: 'negative',
        message: 'Login fail.',
        timeout: 1000
      });
    }
  }

  created() {
    if(localStorage.getItem('jwt')) {
      this.$router.replace('/user/profile');
    }
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
  .head
    height: 140px
  .more-margin
    margin: 0 30px
</style>