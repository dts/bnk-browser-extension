<template>
  <div>
    <h1>New ACH Route</h1>
    <form @submit.prevent="$refs.submit.click()">
      <label style="display: block;">
        <Selector relation="accounts"
          v-model="accountID" placeholder="Account"
          :filter="{ name: { notEqualTo: 'closed' } }"
          filter-type="AccountFilter"
        />
      </label>
      <label>
        <input placeholder="Name" v-model="ach.name">
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
      ach: {}
    };
  },
  methods: {
    async submit() {
      const { error , result } = await api({
        method: 'post',
        url: `/accounts/${this.accountID}/routes/achs`,
        body: {
          ...this.ach
        }
      });

      if(error) return this.error = error;
      this.$router.push(`/achs/${result.id}`);
    }
  }
}

</script>
