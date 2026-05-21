<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "Something went wrong. Please try again later.",
  },
);
</script>

<template>
  <UAlert color="error" variant="soft" :title="message" />
</template>
