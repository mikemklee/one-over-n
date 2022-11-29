<script setup>
defineProps({
  size: {
    type: String,
    default: "m",
  },
});
</script>

<template>
  <button
    class="box-border transition-all bg-gray-600 opacity-20 hover:opacity-100 h-8"
    :class="{
      'w-56': size === 'l',
      'w-36': size === 'm',
    }"
  >
    +
  </button>
</template>

<style scoped></style>
