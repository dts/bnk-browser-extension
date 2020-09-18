<template>
  <span @click="copy" class="copyable">
    <slot />
    <span v-if="copied">
      [copied]
    </span>
    <span v-else>
      [copy]
    </span>
  </span>
</template>
<style scoped>
.copyable {
  cursor: pointer;
}
</style>
<script>
import {writeText} from 'clipboard-polyfill'

export default {
  props: ['value'],
  data() {
    return { copied: false }
  },
  methods: {
    copy() {
      writeText(this.value);
      this.copied = true;
    },
  },
  watch: {
    async copied() {
      if(this.copied) {
        await new Promise(res => setTimeout(res,2000));
        this.copied = false;
      }
    }
  }
}
</script>
