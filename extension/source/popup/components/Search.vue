<template>
  <div class="search">
    <div v-if="achs && achs.length > 0">
      <h3>ACHs</h3>
      <div v-for="ach in achs">
        <router-link :to="`/achs/${ach.id}`">
          {{ach.name}} &gt;
        </router-link>
      </div>
    </div>
    <div v-if="cards && cards.length > 0">
      <h3>Cards</h3>
      <div v-for="card in cards">
        <router-link :to="`/cards/${card.id}`">
          {{card.name}} &gt;
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { graphql } from '@/utils/api';

const QUERY = `
query($name:String!) {
  cards:cardRoutes(first: 5 filter: { name: { includesInsensitive: $name } }) {
    nodes {
      name
      id
    }
  }
  achs:achRoutes(first: 5 filter: { name: { includesInsensitive: $name } }) {
    nodes {
      name
      id
    }
  }
}`;
import worker from '@/utils/worker';

export default {
  props: ['query'],
  data() {
    return { 
      error: null,
      cards: null,
      achs: null,
    };
  },
  watch: {
    query: {
      deep: true,
      immediate: true,
      handler: 'search',
    }
  },
  methods: {
    search: worker(async function() {
      const { error, result } = await graphql(QUERY,{ name: this.query });
      if(error) return this.error = error;
      const { cards, achs } = result;
      this.cards = cards.nodes || [];
      this.achs = achs.nodes || [];
    }),
  }
}

</script>
<style>

.search {
  background-color: rgba(255,255,255,0.8);
  width: 100%;
  box-shadow: 0px 2px 5px rgba(10,10,10,0.7);
  padding: 1em;
}
.search h3:first-child {
  margin-top: 0;
}

</style>
