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
                      <button v-on:click.prevent="deleteCharacter(character.id)" class="button"><i class="fas fa-minus-square"></i></button>
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
                        <option v-for="characterClass in characterClasses" v-bind:key="characterClass">{{ characterClass }}</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                </td>
                <td>
                  <div class="control">
                    <button v-on:click.prevent="addCharacter" class="button"><i class="fas fa-plus-square"></i></button>
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
  private newCharacter: GameCharacter = new GameCharacter(undefined, '', 0, CharacterClass.Knight);
  private characters: GameCharacter[] = [];
  private loading: boolean = true;
  private auth: Auth = getModule(Auth);
  private characterClasses: string[] = Object.keys(CharacterClass);
  private characterRepository: GameCharacterRepository = new GameCharacterRepository(this.auth.token ?
                                                                                     this.auth.token.id : 0);

  public addCharacter() {
    this.characterRepository.post(this.newCharacter).then((response) => {
      this.newCharacter = new GameCharacter(undefined, '', 0, CharacterClass.Knight);
      this.loadCharacters();
    })
    .catch((error) => {
      this.$emit('displayError', 'Error while adding new character: ' + error);
    });
  }

  public deleteCharacter(id: number) {
    this.characterRepository.delete(id).then((response) => {
      this.loadCharacters();
    })
    .catch((error) => {
      this.$emit('displayError', 'Error while removing game character: ' + error);
    });
  }

  private created() {
    this.loadCharacters();
  }

  private loadCharacters() {
    this.characterRepository.getAll().then((response) => {
      this.loading = false;
      this.characters = response;
    })
    .catch((error) => {
      this.loading = false;
      this.$emit('displayError', 'Error while loading game characters: ' + error);
    });
  }
}
</script>