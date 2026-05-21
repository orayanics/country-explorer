<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const isNotFound = computed(() => props.error?.status === 404);

function handleBackHome(): void {
  clearError({ redirect: "/" });
}
</script>

<template>
  <UApp>
    <UContainer class="py-16">
      <UPageCard
        v-if="isNotFound"
        title="404 - Page not found"
        description="The page you are looking for does not exist or may have been moved."
        icon="i-lucide-file-search"
      >
        <template #footer>
          <UButton
            label="Back to home"
            icon="i-lucide-house"
            @click="handleBackHome"
          />
        </template>
      </UPageCard>

      <UPageCard
        v-else
        :title="`${error.status || 500} - Something went wrong`"
        :description="error.message || 'An unexpected error occurred.'"
        icon="i-lucide-triangle-alert"
      >
        <template #footer>
          <UButton
            label="Back to home"
            icon="i-lucide-house"
            @click="handleBackHome"
          />
        </template>
      </UPageCard>
    </UContainer>
  </UApp>
</template>
