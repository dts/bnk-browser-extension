<template>
  <FullFlexCol v-if="ready">
    <slot v-bind="value">[empty default slot]</slot>
  </FullFlexCol>
  <FullFlexCol v-else center>
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
      console.log(`DFINED KEYS ${definedKeys} in ${this.value}`);
      return definedKeys.length > 0;
    }
  },
}
</script>
