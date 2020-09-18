<template>
  <div class="full-flex-row">
    <slot />
  </div>
</template>
<style>
.full-flex-row {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}
</style>
