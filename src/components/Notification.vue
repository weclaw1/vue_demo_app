<template>
  <div class="notification">
    <button v-on:click="$emit('close')" class="delete"></button>
      <slot>
      </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Notification extends Vue {
  private handleKeydown(event: KeyboardEvent) {
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
}
</script>