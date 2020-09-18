import { graphql } from './api'
import OptionsStorage from '@/options-storage'

let cache;
let cachePromise = OptionsStorage.getAll()
    .then(o => {
      cache = o.cache;
      cachePromise = null;
    });

export default {
  data() {
    return { loaded: false, error: null };
  },
  watch: {
    '$route.params': {
      deep: true,
      immediate: true,
      async handler() {
        if(await this.checkCache()) {
          return;
        }
        
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
    async checkCache() {
      await cachePromise;
      if(cache && cache.id == this.$route.params.id) {
        this.setResult(cache.result);
        return true;
      }
      return false;
    },
    setResult(result) {
      OptionsStorage.set({ cache: { id: this.$route.params.id, result: result } });
      
      for(let k in result) {
        console.log("K: ",k);
        this.$set(this,k,result[k])
      }
    }
  }
}
