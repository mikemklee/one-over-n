<script>
import { computed } from "vue";

export default {
  props: {
    modelValue: [String, Number],
  },
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return {
      value,
    };
  },
};
</script>

<template>
  <input v-model="value" class="min-w-0 w-[100%] h-[100%] px-4" />
</template>

<style scoped></style>
