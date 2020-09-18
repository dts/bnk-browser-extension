<template>
  <div class="toolbar">
    <Button to="/">Home</Button>
    <Button to="/achs/new">+ACH</Button>
    <Button to="/cards/new">+Card</Button>
    <input ref="filter"
      @focus="hiding=false"
      @blur="hiding=true"
      v-model="filter"
    />
    <Button @click="filter=null">Clear</Button>
    <transition name="fade">
      <Search v-if="filter && !hiding" :query="filter" />
    </transition>
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

.toolbar .search {
  position: absolute;
  top: 2em;
}

</style>
