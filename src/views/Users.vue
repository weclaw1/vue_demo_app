<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Users</h1>
      <template v-if="loading">
        <vue-loading type="beat"></vue-loading>
      </template>
      <template v-else>
        <form v-on:submit.prevent="addUser">
          <table class="table">
            <thead>
              <th>Id</th><th>Username</th><th>Password</th><th>Email</th><th>Admin</th><th></th>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{user.id}}</td>
                <td>{{user.username}}</td>
                <td>{{user.password}}</td>
                <td>{{user.email}}</td>
                <td>{{user.admin}}</td>
                <td>                  
                  <div class="control">
                    <button v-on:click.prevent="deleteUser(user.id)" class="button" v-bind:disabled="!auth.isAdmin"><i class="fas fa-minus-square"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                </td>
                <td>
                  <div class="control">
                    <input v-model="newUser.username" class="input" v-bind:disabled="!auth.isAdmin" type="text" placeholder="Username">
                  </div>
                </td>
                <td>
                  <div class="control">
                    <input v-model="newUser.password" class="input" v-bind:disabled="!auth.isAdmin" type="password" placeholder="Password">
                  </div>
                </td>
                <td>
                  <div class="control">
                    <input v-model="newUser.email" class="input" v-bind:disabled="!auth.isAdmin" type="email" placeholder="Email">
                  </div>
                </td>
                <td>
                  <div class="control">
                    <label class="checkbox"><input v-model="newUser.admin" v-bind:disabled="!auth.isAdmin" type="checkbox"></label>
                  </div>
                </td>
                <td>
                  <div class="control">
                    <button v-on:click.prevent="addUser" class="button" v-bind:disabled="!auth.isAdmin"><i class="fas fa-plus-square"></i></button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </form>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { getModule } from 'vuex-module-decorators';
import { VueLoading } from 'vue-loading-template';
import Auth from '../store/Auth';

@Component({
  components: {
    VueLoading,
  },
})

export default class Users extends Vue {
  private newUser: User = new User(undefined, '', '', '', false);
  private users: User[] = [];
  private loading: boolean = true;
  private userRepository: UserRepository = new UserRepository();
  private auth: Auth = getModule(Auth);

  public addUser() {
    this.userRepository.post(this.newUser).then((response) => {
      this.newUser = new User(undefined, '', '', '', false);
      this.loadUsers();
    })
    .catch((error) => {
      this.$emit('displayError', 'Error while adding new user: ' + error);
    });
  }

  public deleteUser(id: number) {
    this.userRepository.delete(id).then((response) => {
      this.loadUsers();
    })
    .catch((error) => {
      this.$emit('displayError', 'Error while removing user: ' + error);
    });
  }

  private created() {
    this.loadUsers();
  }

  private loadUsers() {
    this.userRepository.getAll().then((response) => {
      this.loading = false;
      this.users = response;
    })
    .catch((error) => {
      this.loading = false;
      this.$emit('displayError', 'Error while loading users: ' + error);
    });
  }

}
</script>