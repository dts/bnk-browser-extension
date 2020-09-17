<template>
  <div>
    <h1>u r in</h1>
    {{ error}}
    {{ response }}
  </div>
</template>
<script>
const EXTENSION_ID = 'doaldmiaeepjopefcjliakaclpijkfnp';

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
      EXTENSION_ID,
      { 'type': 'authenticated',
        'payload': this.$route.query,
      },
      (response) => {
        this.response = response;
      }
    );
  }
}

</script>
