<template>
  <router-link v-if="to" :to="to" v-on="$listeners"><slot /></router-link>
  <button v-else v-on="$listeners"><slot /></button>
</template>
<script>
export default {
  props: ['to'],
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
