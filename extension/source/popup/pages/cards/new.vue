<template>
  <div>
    <h1>New Card</h1>
    <form @submit.prevent="$refs.submit.click()">
      <label style="display: block;">
        <Selector relation="accounts"
          v-model="accountID" placeholder="Account"
          :filter="{ name: { notEqualTo: 'closed' } }"
          filter-type="AccountFilter"
        />
      </label>
      <label>
        <input placeholder="Card name" v-model="card.name">
      </label>
      <label>
        <input placeholder="Address line 1" v-model="card.address_line1">
      </label>
      <label>
        <input placeholder="Address zip" v-model="card.address_zip">
      </label>
      <Error :value="error" />
      <div>
        <Button ref="submit" type="submit" @click="submit">
          Submit
        </Button>
      </div>
    </form>
  </div>
</template>
<script>

import { api } from '@/utils/api';

export default {
  data() {
    return {
      error: null,
      accountID: null,
      card: {}
    };
  },
  methods: {
    async submit() {
      const { error , result } = await api({
        method: 'post',
        url: `/accounts/${this.accountID}/routes/cards`,
        body: {
          use_case: 'card_on_file',
          ...this.card
        }
      });

      if(error) return this.error = error;
      this.$router.push(`/cards/${result.id}`);
    }
  }
}

</script>
