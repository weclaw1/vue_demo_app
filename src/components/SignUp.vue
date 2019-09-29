<template>
  <modal 
    v-on:save="handleSubmit"
    v-on:close="handleClose"
    v-on:handleErrorClose="handleErrorClose"
    title="Sign up"
    saveBtnText="Create an account"
    v-bind:error="error"
  >
    <notification class="is-danger" v-if="error" v-on:close="handleErrorClose">
      {{error}}
    </notification>
    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left">
        <input v-model="newUser.username" class="input" type="text" placeholder="Username">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input v-model="newUser.email" class="input" type="email" placeholder="Email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input v-model="newUser.password" class="input" type="password" placeholder="Password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Modal from './Modal.vue';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { getModule } from 'vuex-module-decorators';
import Auth from '../store/Auth';

@Component({
  components: {
    Modal,
  },
})
export default class SignUp extends Vue {
  private newUser: User = new User(undefined, '', '', '', false);
  private userRepository: UserRepository = new UserRepository();
  private auth: Auth = getModule(Auth);
  private error: string = '';

  public handleSubmit() {
    this.userRepository.sign_up(this.newUser).then((response) => {
      const username = this.newUser.username;
      const password = this.newUser.password;
      this.auth.login({username, password})
      .catch((error) => {
        this.error = 'Error while logging in: ' + error;
      });
      this.handleClose();
    })
    .catch((error) => {
      this.error = 'Error while signing up: ' + error;
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