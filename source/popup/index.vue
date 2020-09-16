<template>
  <div v-if="loaded">
    {{error}}
    <div v-if="token">
      We've got a token: {{token}}
    </div>
    <div v-else>
      <button @click="signIn">
        Sign in
      </button>
    </div>
  </div>
</template>
<script>

import OptionsStorage from '../options-storage'

export default {
  el: '#app',
  data() {
    return {
      loaded: false,
      error: null,
      token: null,
    };
  },
  methods: {
    async signIn() {
      let port = browser.runtime.connect();
      port.postMessage({ 'type': 'signIn' });
      port.disconnect();
    },
  },
  async mounted() {
    const options = await OptionsStorage.getAll();
    this.token = options.token;
    this.loaded = true;
  }
}
</script>
<style>
html {
  width: 300px;
  height: 400px;
}
</style>
