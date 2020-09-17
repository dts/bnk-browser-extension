<template>
  <div>
    <h1>u r in</h1>
    {{ error}}
    {{ response }}
  </div>
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
      'type': 'authenticated',
      'payload': this.$route.query,
    });

    this.error = error;
    this.response = result;
  }
}

</script>
