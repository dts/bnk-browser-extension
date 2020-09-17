<template>
  <Container>
    <div v-if="error">
      {{ error }}
    </div>
    <Spinner v-else />
  </Container>
</template>
<script>

export default {
  data() {
    return {
      error: null,
      response: null,
    };
  },
  async mounted() {
    const { error, result } = await this.$extension({
      'type': 'authenticate',
      'payload': this.$route.query,
    });

    this.error = error;
    this.response = result;

    if(!this.error) {
      this.$router.push('/');
    }
  }
}

</script>
