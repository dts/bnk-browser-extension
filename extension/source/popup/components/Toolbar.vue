<template>
  <div class="toolbar">
    <Button to="/">Home</Button>
    <Button to="/achs/new">+ACH</Button>
    <Button to="/cards/new">+Card</Button>
    <input ref="filter" v-model="filter" />
    <Button @click="filter=null">Clear</Button>
  </div>
</template>
<script>
export default {
  computed: {
    filter: {
      get() {
        return this.$route.query.name;
      },
      set(value) {
        if(value && value.length > 0) {
          let query = { name: value };

          if(this.$route.path != '/search') {
            this.$router.push({
              path: '/search', query
            });            
          } else {
            this.$router.replace({ query });
          }
        } else {
          this.$router.go(-1);
        }
      }
    }
  }
}
</script>
<style scoped>

.toolbar {
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

</style>
