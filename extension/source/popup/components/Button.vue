<template>
  <router-link v-if="to" :to="to" v-bind="$attrs" v-on="$listeners">
    <slot />
  </router-link>
  <button v-else @click="click" v-bind="$attrs">
    <slot v-if="!internalState" />
    <span v-else-if="internalState == 'error'">
      {{ error }}
    </span>
    <span v-else>
      <Spinner />
    </span>
  </button>
</template>
<script>
export default {
  props: ['to'],
  data() {
    return { internalState: this.state, currentPromise: null };
  },
  methods: {
    async click() {
      if (this.currentPromise) return;

      const cb = this.$listeners.click;

      if (cb) {
        this.internalState = 'loading';
        // if there's an error, display the error in-line for 4
        // seconds, then go back to neutral state:
        try {
          this.currentPromise = cb(event);
          var res = await this.currentPromise;
        } catch (x) {
          if (typeof this.$report == 'function') {
            this.$report(x);
          }

          this.internalState = 'error';
          this.error = x.message || x.error || x;

          await new Promise(resolve => setTimeout(resolve,4000));
        } finally {
          this.currentPromise = null;
          this.error = null;
          this.internalState = null;
        }
      } else {
        this.$emit(EVENT_CLICK, event);
      }
    }
  }
}
</script>
<style scoped>
a,button {
  border: 1px solid black;
  padding: 0.25em;
  text-decoration: none;
  color: black;
  background-color: white;
  margin: 0.25em;
}
</style>
