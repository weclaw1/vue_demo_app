<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Characters</h1>
      <template v-if="loading">
        <vue-loading type="beat"></vue-loading>
      </template>
      <template v-else>
        <form v-on:submit.prevent="addCharacter">
          <table class="table">
            <thead>
              <th>Id</th><th>Name</th><th>Level</th><th>Class</th><th></th><th></th>
            </thead>
            <tbody>
              <tr v-for="character in characters" :key="character.id">
                <td>{{character.id}}</td>
                <td>{{character.characterName}}</td>
                <td>{{character.level}}</td>
                <td>{{character.characterClass}}</td>
                <td></td>
                <td>                  
                  <div class="control">
                    <form v-on:submit.prevent="deleteCharacter(character.id)">
                      <button v-on:click.prevent="deleteCharacter(character.id)" class="button">-</button>
                    </form>
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
                    <input v-model="newCharacter.characterName" class="input" type="text" placeholder="Name">
                  </div>
                </td>
                <td>
                </td>
                <td>
                  <div class="control">
                    <div class="select">
                      <select v-model="newCharacter.characterClass">
                        <option v-for="characterClass in CharacterClass" v-bind:key="characterClass">{{ CharacterClass[characterClass] }}</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                </td>
                <td>
                  <div class="control">
                    <button v-on:click.prevent="addCharacter" class="button">+</button>
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
import { GameCharacterRepository } from '../repositories/GameCharacterRepository';
import { GameCharacter, CharacterClass } from '../entities/GameCharacter';
import { getModule } from 'vuex-module-decorators';
import { VueLoading } from 'vue-loading-template';
import Auth from '../store/Auth';

@Component({
  components: {
    VueLoading,
  },
})

export default class Users extends Vue {
  private newCharacter: GameCharacter = new GameCharacter(undefined, '', 0, CharacterClass:);
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
      console.log(error);
    });
  }

  public deleteUser(id: number) {
    this.userRepository.delete(id).then((response) => {
      this.loadUsers();
    })
    .catch((error) => {
      console.log(error);
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
      console.log(error);
    });
  }

}
</script>