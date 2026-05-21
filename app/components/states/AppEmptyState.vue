<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "Nothing found.",
  },
);
</script>

<template>
  <UAlert color="neutral" variant="soft" :title="message" />
</template>
