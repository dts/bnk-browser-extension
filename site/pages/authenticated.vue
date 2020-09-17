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
  mounted() {
    let ext = window.chrome || window.browser;

    if(!ext) return this.error = "No browser extension API?";

    ext.runtime.sendMessage(
      this.$nuxt.context.env.extensionID,
      { 'type': 'authenticated',
        'payload': this.$route.query,
      },
      (response) => {
        if(response)
          this.response = response;
        else
          this.error = ext.runtime.lastError.message;
      }
    );
  }
}

</script>
