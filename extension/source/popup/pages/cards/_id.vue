<template>
  <Loader :error="error" :value="{cardRoute}" #default="{cardRoute}">
    <h3>Cards > {{ cardRoute.name }}</h3>
    <table>
      <tbody>
        <tr v-if="cardRoute.cardholderName">
          <td>Cardholder Name</td>
          <td>{{ cardRoute.cardholderName }}</td>
        </tr>
        <tr>
          <td>Number</td>
          <td>
            <Copyable :value="cardRoute.primaryAccountNumber">
              {{ cardRoute.primaryAccountNumber }}
            </Copyable>
          </td>
        </tr>
        <tr>
          <td>Expiry</td>
          <td>{{ cardRoute.expiry | yearMonth }}</td>
        </tr>
        <tr>
          <td>CVV</td>
          <td>
            <Copyable :value="cardRoute.verificationCode">
              {{ cardRoute.verificationCode }}
            </Copyable>
          </td>
        </tr>
      </tbody>
    </table>

  </Loader>
</template>
<script>
import GraphQLItem from '@/utils/graphql-item-mixin';

const QUERY = `
query($id: String!) {
  cardRoute(id:$id) {
    id name cardholderName primaryAccountNumber expiry verificationCode status
    account { name availableBalance }
  }
}`;

export default {
  data() {
    return { cardRoute: null };
  },
  filters: {
    yearMonth(utc) {
      return utc.match(/^\d+-\d+/)[0]
    },
  },
  mixins: [GraphQLItem],
  query: QUERY,
}

</script>
