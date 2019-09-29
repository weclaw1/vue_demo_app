<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button v-on:click="$emit('close')" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <notification class="is-danger" v-if="error" v-on:close="handleErrorClose">
          {{error}}
        </notification>
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
import Notification from './Notification.vue';

@Component({
  components: {
    Notification,
  },
})
export default class Modal extends Vue {
  @Prop()
  private title!: string;

  @Prop({default: 'Save'})
  private saveBtnText!: string;

  @Prop({default: 'Cancel'})
  private cancelBtnText!: string;

  @Prop()
  private error!: string;

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.$emit('save');
    }
    if (event.key === 'Escape') {
      this.$emit('close');
    }
  }

  private created() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  private destroyed() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  private handleErrorClose() {
    this.$emit('handleErrorClose');
  }
}
</script>