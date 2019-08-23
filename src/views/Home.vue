<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Home</h1>
      <h2 class="subtitle">Currently you are not logged in</h2>
      <h2 class="subtitle">Current time: {{currentDate}}</h2>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {
  public currentDate: string = '';
  private intervalHandler?: number;

  private created() {
    this.currentDate = new Date().toLocaleTimeString();
    this.intervalHandler = setInterval(this.updateTime, 1000);
  }

  private destroyed() {
    clearInterval(this.intervalHandler);
  }

  private updateTime() {
    this.currentDate = new Date().toLocaleTimeString();
  }
}
</script>
