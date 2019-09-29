<template>
  <modal 
    v-on:save="handleSubmit"
    v-on:close="handleClose"
    v-on:handleErrorClose="handleErrorClose"
    title="Login"
    saveBtnText="Login"
    v-bind:error="error"
  >
    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left">
        <input v-model="username" class="input" type="text" placeholder="Username">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input v-model="password" class="input" type="password" placeholder="Password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import Auth from '../store/Auth';
import Modal from './Modal.vue';

@Component({
  components: {
    Modal,
  },
})
export default class Login extends Vue {
  private username: string = '';
  private password: string = '';
  private auth: Auth = getModule(Auth);
  private error: string = '';

  public handleSubmit() {
    const username = this.username;
    const password = this.password;
    this.auth.login({username, password}).then(() => {
      this.handleClose();
    })
    .catch((error) => {
      this.error = 'Error while logging in: ' + error;
    });
  }

  public handleClose() {
    this.$emit('close');
  }

  public handleErrorClose() {
    this.error = '';
  }
}
</script>