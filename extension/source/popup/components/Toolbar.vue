<template>
  <div class="toolbar">
    <Button to="/">Home</Button>
    <Button to="/achs/new">+ACH</Button>
    <Button to="/cards/new">+Card</Button>
    <div v-if="$route.fullPath != '/'">
      <label class="filter">
        <input ref="filter"
          @focus="hiding=false"
          @blur="hiding=true"
          placeholder="Search"
          v-model="filter"
        />
        <Button class="clear" v-if="filter"
          @click="filter=null">
          X
        </Button>
      </label>
      <transition name="fade">
        <div class="search-results" v-if="filter && !hiding">
          <Search :query="filter" />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$refs.filter.focus();
  },
  data() {
    return {
      filter: null,
      hiding: false,
    };
  },
  watch: {
    filter() {
      this.hiding = false;
    },
    /*    '$route.path': {
       handler() {
       this.hiding = true;
       } 
       }*/
  },
  methods: {
    hideLater() {
      setTimeout(() => this.hiding = true,100)
    }
  }
}
</script>
<style scoped>

.toolbar {
  position: relative;
  background-color: #ddd;
  display: flex;
  flex-direction: row;
}

.toolbar input {
  min-width: 5em;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}

.toolbar label {
  position: relative;
  
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  
  display: flex;
  flex-direction: row;
}

.toolbar .clear {
  position: absolute;
  right: 0;
}

.toolbar .search-results {
  position: absolute;
  top: 2.25em;
  left: 0em;

  background-color: rgba(255,255,255,0.8);
  width: 100%;
  box-shadow: 0px 2px 5px rgba(10,10,10,0.7);
  padding: 1em;
}

</style>
