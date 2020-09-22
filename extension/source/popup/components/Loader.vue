<template>
  <FullFlexCol key="error" v-if="error">
    <Error :value="error" />
  </FullFlexCol>
  <FullFlexCol key="ready" v-else-if="ready">
    <slot v-bind="value">[empty default slot]</slot>
  </FullFlexCol>
  <FullFlexCol key="spinner" v-else center>
    <Spinner />
  </FullFlexCol>
</template>
<script>
export default {
  props: ['error','value'],
  computed: {
    ready() {
      if(!this.value) return false;
      let keys = Object.keys(this.value);
      let definedKeys = keys.filter(k => this.value[k]);
      return definedKeys.length > 0;
    }
  },
}
</script>
<style>
</style>
