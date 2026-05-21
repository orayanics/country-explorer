<script setup lang="ts">
type TPendingVariant = "inline" | "list" | "detail";

withDefaults(
  defineProps<{
    variant?: TPendingVariant;
  }>(),
  {
    variant: "inline",
  },
);
</script>

<template>
  <div v-if="variant === 'list'" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <UCard v-for="index in 6" :key="index">
      <div class="space-y-3">
        <USkeleton class="h-8 w-12" />
        <USkeleton class="h-5 w-40" />
        <USkeleton class="h-4 w-32" />
        <USkeleton class="h-4 w-28" />
        <USkeleton class="h-4 w-24" />
      </div>
    </UCard>
  </div>

  <UCard v-else-if="variant === 'detail'">
    <div class="space-y-3">
      <USkeleton class="h-24 w-40" />
      <USkeleton class="h-7 w-56" />
      <USkeleton class="h-4 w-40" />
      <USkeleton class="h-4 w-32" />
      <USkeleton class="h-4 w-36" />
      <USkeleton class="h-4 w-28" />
    </div>
  </UCard>

  <div v-else class="space-y-2">
    <USkeleton class="h-4 w-48" />
  </div>
</template>
