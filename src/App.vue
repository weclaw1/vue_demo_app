<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="appNavbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div id="appNavbar" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/users">Users</router-link>
          <router-link class="navbar-item" to="/characters" v-if="auth.isLoggedIn">Characters</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="auth.isLoggedIn">
                <a v-on:click.prevent="auth.logout()" class="button is-light">Log out</a>
              </template>
              <template v-else>
                <a v-on:click.prevent="showSignUp = true" class="button is-primary"><strong>Sign up</strong></a>
                <a v-on:click.prevent="showLogin = true" class="button is-light">Log in</a>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <notification class="is-danger" v-if="error" v-on:close="handleErrorClose">
      {{error}}
    </notification>
    <sign-up v-if="showSignUp" v-on:close="handleSignUpClose"></sign-up>
    <login v-if="showLogin" v-on:close="handleLoginClose"></login>
    <router-view v-on:displayError="displayError"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';
import Auth from './store/Auth';
import Notification from './components/Notification.vue';

@Component({
  components: {
    SignUp,
    Login,
    Notification,
  },
})
export default class App extends Vue {
  private error: string = '';
  private showSignUp: boolean = false;
  private showLogin: boolean = false;
  private auth: Auth = getModule(Auth);

  public handleLoginClose() {
    this.showLogin = false;
  }

  public handleSignUpClose() {
    this.showSignUp = false;
  }

  public displayError(error: string) {
    this.error = error;
  }

  public handleErrorClose() {
    this.error = '';
  }
}

</script>