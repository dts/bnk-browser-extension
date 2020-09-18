<template>
  <Loader :error="error" :value="{achs,cards}">
    BNK Extension.
    <h2>Recent ACH routes and cards:</h2>
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

  </Loader>
</template>
<script>
import { graphql } from '@/utils/api'

const QUERY = `
query {
  cards:cardRoutes(first: 3 orderBy: [CREATED_AT_DESC]) {
    nodes {
      name
      id
    }
  }
  achs:achRoutes(first: 2 orderBy: [CREATED_AT_DESC]) {
    nodes {
      name
      id
    }
  }
}`;

export default {
  mounted() {
    this.fetch();
  },
  data() {
    return { error:null, cards:null, achs:null };
  },
  methods: {
    async fetch() {
      const { error, result } = await graphql(QUERY);
      this.error = error;
      if(error) return;
      
      const { cards, achs } = result;
      this.cards = cards.nodes || [];
      this.achs = achs.nodes || [];
    }
  }
  
}

</script>
