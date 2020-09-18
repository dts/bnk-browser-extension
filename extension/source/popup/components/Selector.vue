<template>
  <Error
    v-if="error"
    :value="error"
  />
  <select
    v-else
    :value="value"
    :disabled="disabled"
    v-bind="$attrs"
    @input="onInput"
  >
    <option
      :value="null"
      hidden
      >Select</option>
    <option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
     {{ item.name }}
    </option>
  </select>
</template>
<script>
import { graphql } from '@/utils/api';

export default {
  props: ['relation', 'value', 'disabled','filter','filterType'],
  data() {
    return {
      error: null,
      options: null,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { result, error } = await graphql(
        `query(${this.filterType?'$filter':''}:${this.filterType}){ 
           _:${this.relation}(filter:$filter) { nodes { id name }}
         }`,
        { filter: this.filter },
      );

      if (error) this.error = error;
      this.options = result._.nodes;
    },
    onInput(event) {
      this.$emit('input',event.target.value);
    },
  },
};
</script>
