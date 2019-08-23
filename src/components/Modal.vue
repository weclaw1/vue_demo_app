<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button v-on:click="$emit('close')" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot>
        </slot>
      </section>
      <footer class="modal-card-foot">
        <button v-on:click="$emit('save')" class="button is-success">{{saveBtnText}}</button>
        <button v-on:click="$emit('close')" class="button">{{cancelBtnText}}</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Modal extends Vue {
  @Prop()
  private title!: string;

  @Prop({default: 'Save'})
  private saveBtnText!: string;

  @Prop({default: 'Cancel'})
  private cancelBtnText!: string;
}
</script>