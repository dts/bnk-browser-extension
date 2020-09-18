<template>
  <div class="error" v-if="value" type="error">{{ text }}</div>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    text() {
      let value = this.value;

      if (!value) return value;
      if (value.error) value = value.error;
      if (value.message) value = value.message;

      if (typeof value == 'string') return value;

      return String(value);
    },
  },
};
</script>
<style>

.error {
  background-color: red;
  color: white;
}
</style>
