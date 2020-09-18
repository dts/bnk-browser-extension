import { graphql } from './api'

export default {
  data() {
    return { loaded: false, error: null };
  },
  watch: {
    '$route.params': {
      deep: true,
      immediate: true,
      async handler() {
        const promise = this._query = graphql(
          this.$options.query,
          this.$route.params
        );

        const { result, error } = await promise;

        // bail if we've switched to something else:
        if(promise != this._query) return;

        if(error) return this.error = error;

        this.setResult(result);
        this.loaded = true;
      }
    }
  },
  methods: {
    setResult(result) {
      for(let k in result) {
        this.$set(this,k,result[k])
      }
    }
  }
}
