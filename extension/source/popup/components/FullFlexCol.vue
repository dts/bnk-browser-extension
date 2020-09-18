<template>
  <div class="full-flex-col" :class="{center}">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.full-flex-col {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}
.full-flex-col.center {
  align-items: center;
  justify-content: center;
}
</style>
