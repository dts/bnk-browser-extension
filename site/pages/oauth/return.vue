<template>
  <div v-if="$route.query.error">
    OAuth Error: {{$route.query.error}}
  </div>
  <div v-else-if="$route.query.code">
    Code completion
  </div>
  <div v-else>
    Redirecting...
  </div>
</template>
<script>

const EXTENSION_ID = 'doaldmiaeepjopefcjliakaclpijkfnp';

export default {
  methods: {
    
  },
  mounted() {
    if(!this.$route.query.code) return;
    
    const ext = window.chrome || window.browser;

    ext.runtime.sendMessage(
      EXTENSION_ID,{ code: this.$route.query.code },
      function(response) {
        console.log("RESPONSE!!!",response);
    });
  }
}


</script>
