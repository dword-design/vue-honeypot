<template>
  <label
    :style="{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
      width: 0,
      height: 0,
      opacity: 0,
    }"
  >
    <span>Name</span>
    <input v-model="value" autocomplete="off" tabindex="-1" type="text" />
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');

const validate = () => {
  if (value.value) {
    throw new Error(
      'Looks like you are a bot. You have filled out the legendary honeypot field!',
    );
  }
};

defineExpose({ validate });
</script>
