<template>
  <a :href="to" @click.prevent="click"><slot /></a>
</template>
<script>
export default {
  props: ['to'],
  methods: {
    click() {
      browser.tabs.create({ url: this.to });
    }
  }
}

</script>
