<template>
  <Loader :error="error" :value="{loaded}">
    <FullFlexCol v-if="token">
      <Toolbar />
      <router-view></router-view>
    </FullFlexCol>
    <div v-else>
      <button @click="signIn">
        Sign in
      </button>
    </div>
  </Loader>
</template>
<script>

import Router from 'vue-router';
import routes from 'vue-auto-routing';

import options from '@/utils/options'
const CLIENT_ID = 'client_id_pbmo15';

const router = new Router({
  routes,
  mode: 'abstract',
});

router.afterEach((to,from) => {
  options.popupPage = { path: to.path, query: to.query };
});

export default {
  el: '#app',
  router,
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
      browser.tabs.create(
        {
          url: `https://bnk.dev/oauth/authorization?client_id=${CLIENT_ID}&scope=read_write`
      });
    }
  },
  async mounted() {
    await options.fetch();

    console.log("GO TO: ",options.popupPage);
    this.$router.push(options.popupPage);
    
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
  margin: 0;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
