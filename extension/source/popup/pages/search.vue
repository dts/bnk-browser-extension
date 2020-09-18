<template>
  <div>
    Searching for {{$route.query.name}}
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
import gql from '@/utils/graphql';

const QUERY = `
query($name:String!) {
  cards:cardRoutes(filter: { name: { includesInsensitive: $name } }) {
    nodes {
      name
      id
    }
  }
  achs:achRoutes(filter: { name: { includesInsensitive: $name } }) {
    nodes {
      name
      id
    }
  }
}`;

export default {
  data() {
    return { 
      error: null,
      cards: null,
      achs: null,
    };
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      async handler() {
        const { error, result } = await gql(QUERY,this.$route.query);
        if(error) return this.error = error;
        const { cards, achs } = result;
        this.cards = cards.nodes || [];
        this.achs = achs.nodes || [];
      }
    }
  }
}

  

</script>
