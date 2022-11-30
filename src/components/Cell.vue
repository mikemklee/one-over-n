<script setup>
defineProps({
  size: {
    type: String,
    default: "m",
  },
});
</script>

<template>
  <div
    class="h-14 flex justify-center items-center"
    :class="{
      'w-56': size === 'l',
      'w-36': size === 'm',
    }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
