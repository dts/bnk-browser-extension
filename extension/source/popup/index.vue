<template>
  <div v-if="loaded">
    {{error}}
    <div v-if="token">
      Bearer fetched:
      {{cards}}
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
      cards: null,
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

    if(this.token) {
      this.cards = await fetch('https://api.bnk.dev/graphql',{
        method: 'POST',
        credentials: 'omit',
        body: JSON.stringify({
          query: `
query {
  cardRoutes{
    nodes {
      name
      id
    }
  }
}
          `
        }),
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${this.token}`
        }
      }).then(r => r.json());
    }
  }
}
</script>
<style>
html {
  width: 300px;
  height: 400px;
}
</style>
