<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Home</h1>
      <h2 class="subtitle">Currently you are {{ auth.isLoggedIn ? '' : 'not' }} logged in</h2>
      <h2 class="subtitle">Current time: {{currentDate}}</h2>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import Auth from '../store/Auth';

@Component({
  components: {
  },
})
export default class Home extends Vue {
  public currentDate: string = '';
  private intervalHandler?: number;
  private auth: Auth = getModule(Auth);

  public updateTime() {
    this.currentDate = new Date().toLocaleTimeString();
  }

  private created() {
    this.currentDate = new Date().toLocaleTimeString();
    this.intervalHandler = setInterval(this.updateTime, 1000);
  }

  private destroyed() {
    clearInterval(this.intervalHandler);
  }
}
</script>
