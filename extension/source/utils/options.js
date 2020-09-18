import Vue from 'vue';
import OptionsSync from 'webext-options-sync';

export const defaults = {
  token: null,
  popupPage: '/',
  pageCache: null,
};

const sync = new OptionsSync({
	defaults,
	migrations: [
		OptionsSync.migrations.removeUnused
	],
	logging: true
});

export default new Vue({
  data() {
    return { ...defaults };
  },
  methods: {
    async fetch() {
      const all = await sync.getAll();

      for(let key in all) {
        this.$set(this,key,all[key])
      }

      this.$watch(() => this.$data,
                  this.persist,
                  { deep: true })
    },
    persist() {
      sync.setAll({ ...this.$data });
    },
    clear() {
      for(var k in defaults)
        this[k] = defaults[k];
      
      return sync.setAll({})
        .then(this.fetch);
    },
  },
});
