<template>
  <div id="app">
    <AlertModal v-show="alert">{{alert}}</AlertModal>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AlertModal from '../components/AlertModal.vue'

@Component({ name: 'App', components: { AlertModal } })
export default class App extends Vue {
  get alert () {
    return this.$store.state.alert
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
