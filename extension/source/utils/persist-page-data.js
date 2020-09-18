import options from '@/utils/options';

let initialLoad = true;
export default {
  created() {
    if(!initialLoad) return;
    if(!this.$options.__file) return;
    if(!this.$options.__file.includes('pages'))
      return;
    
    console.log("FIRST CREATE "+this.$options.__file);

    try {
      const cache = options.pageCache;
      console.log("CACHE: ",cache)
      for(let k in cache) 
        this[k] = cache[k]
    } finally {
      initialLoad = false;
    }
  },
  updated() {
    if(!this.$options.__file) return true;
    if(!this.$options.__file.includes('pages'))
      return true;
    
    console.log("UPDATED "+this.$options.__file);
    console.log("DATA: ",JSON.stringify(this.$data));

    try {
      options.pageCache = JSON.parse(JSON.stringify(this.$data));
      console.log("Set page cache: ",options.pageCache);
    } catch(x) {
      console.error("Error persisting page cache: ",x);
    }
  }
}
