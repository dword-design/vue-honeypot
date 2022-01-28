<template>
  <label
    style="
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 0;
      height: 0;
      opacity: 0;
    "
  >
    <span>Name</span>
    <input v-model="value" autocomplete="off" tabindex="-1" type="text" />
  </label>
</template>

<script>
export default {
  data: () => ({ value: '' }),
  methods: {
    validate() {
      if (this.value) {
        throw new Error(
          'Looks like you are a bot. You have filled out the legendary honeypot field!'
        )
      }
    },
  },
}
</script>
