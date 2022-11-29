<script setup>
defineProps({
  withBorder: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "m",
  },
});
</script>

<template>
  <div
    class="w-40 h-14 flex justify-center items-center"
    :class="{
      border: withBorder,
      'border-gray-600': true,
      'w-56': size === 'l',
      'w-36': size === 'm',
    }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
