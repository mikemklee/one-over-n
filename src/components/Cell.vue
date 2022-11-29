<script setup>
defineProps({
  withBorder: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div
    class="w-40 h-16 flex justify-center items-center"
    :class="{
      border: withBorder,
      'border-gray-600': true,
    }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
