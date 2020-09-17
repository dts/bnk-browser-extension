<template>
  <transition mode="out-in" name="fade">
    <div key="error" v-if="error" class="installed-badge error">
      Error connecting to BNK Browser Extension (is it installed?)
    </div>
    <div key="loading" v-else-if="loading" class="installed-badge loading">
      <spinner />
    </div>
    <div key="authenticated" v-else-if="authenticated" class="installed-badge authenticated">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"/>
      </svg>
      
      You're installed & authenticated with BNK.
    </div>
    <div  key="installed"  v-else class="installed-badge">
      You're installed but not authenticate.
      <nuxt-link to="/authenticate">Connect your BNK Account</nuxt-link>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      error: null,
      authenticated: null,
      loading: true,
    }
  },
  async mounted() {
    await new Promise(resolve => setTimeout(resolve,1000));
    
    try {
      const { error, authenticated } = await this.$extension({
        'type': 'checkStatus',
      });
      
      this.error = error;
      this.authenticated = authenticated;
    } catch(x) {
      console.log("ERROR: ",x);
      this.error = x;
    } finally {
      this.loading = false;
    }
  },
}
</script>
<style scoped>

.installed-badge {
  height: 4em;
  overflow: hidden;
  
  display: flex;
  align-items: center;
  
  border: 2px solid transparent;
  border-radius: 2em;
  padding: 1em;
  margin: 1em;
}

svg {
  margin-right: 0.5em;
}

.installed-badge.authenticated {
  border-color: green;
}

.installed-badge.error {
  border-color: red;
}

</style>
