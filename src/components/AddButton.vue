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
    class="transition-all bg-[#66668b] opacity-50 hover:opacity-100 h-8"
    :class="{
      'w-56': size === 'l',
      'w-36': size === 'm',
    }"
  >
    +
  </button>
</template>

<style scoped></style>
