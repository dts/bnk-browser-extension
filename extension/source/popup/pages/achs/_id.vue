<template>
  <Loader :error="error" :value="{achRoute}" #default="{achRoute}">
    <h3>ACHs > {{ achRoute.name }}</h3>
    <table>
      <tbody>
        <tr>
          <td>Routing</td>
          <td>
            <Copyable :value="achRoute.routingNumber">
              {{ achRoute.routingNumber }}
            </Copyable>
          </td>
        </tr>
        <tr>
          <td>Account</td>
          <td>
            <Copyable :value="achRoute.accountNumber">
              {{ achRoute.accountNumber }}
            </Copyable>
          </td>
        </tr>
      </tbody>
    </table>

    <ExternalLink :to="`https://bnk.dev/accounts/${achRoute.account.id}/routes/achs/${achRoute.id}`">
      On BNK Site
    </ExternalLink>
  </Loader>
</template>
<script>
import GraphQLItem from '@/utils/graphql-item-mixin';

const QUERY = `
query($id: String!) {
  achRoute(id:$id) {
    id name accountNumber routingNumber status
    account { id name availableBalance }
  }
}`;

export default {
  data() {
    return { achRoute: null };
  },
  mixins: [GraphQLItem],
  query: QUERY,
}

</script>
