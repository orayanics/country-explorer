<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}>();

const emit = defineEmits<{
  "update:page": [page: number];
}>();
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm">Page {{ currentPage }} of {{ totalPages }}</p>
      </div>
    </template>

    <UPagination
      :page="currentPage"
      :items-per-page="pageSize"
      :total="totalItems"
      @update:page="emit('update:page', $event)"
    />
  </UCard>
</template>
