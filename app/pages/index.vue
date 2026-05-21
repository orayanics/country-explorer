<script setup lang="ts">
import { formatPopulation } from "#imports";
const route = useRoute();
const router = useRouter();

const searchQuery = computed<string>({
  get: () => route.query.search?.toString() || "",
  set: (value) => {
    router.replace({
      query: {
        ...route.query,
        search: value || undefined,
      },
    });
  },
});

const regionQuery = computed<TRegionOption>({
  get: () => (route.query.region?.toString() as TRegionOption) || "All",
  set: (value) => {
    router.replace({
      query: {
        ...route.query,
        region: value !== "All" ? value : undefined,
      },
    });
  },
});
const { data, isLoading, error, regions } = useCountries(
  searchQuery,
  regionQuery,
);
const {
  paginatedItems: paginatedCountries,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  goToPage,
} = usePagination(data, { pageSize: 12 });
</script>

<template>
  <UContainer class="py-8 space-y-6">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-semibold">Country Explorer</h1>
      </template>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField label="Search">
          <UInput
            v-model="searchQuery"
            type="text"
            placeholder="Search by country name"
            icon="i-lucide-search"
            :disabled="isLoading"
          />
        </UFormField>

        <UFormField label="Region">
          <USelect
            v-model="regionQuery"
            :items="regions"
            icon="i-lucide-globe"
            class="w-full"
            :disabled="isLoading"
          />
        </UFormField>
      </div>
    </UCard>

    <AppPendingState v-if="isLoading" variant="list" />
    <AppErrorState v-else-if="error" />
    <AppEmptyState
      v-else-if="data.length === 0"
      message="No countries found."
    />

    <UPageGrid v-else>
      <CountryCard
        v-for="country in paginatedCountries"
        :key="country.cca3"
        :country="country"
        :format-population="formatPopulation"
      />
    </UPageGrid>

    <AppPagination
      v-if="!isLoading && !error && data.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="totalItems"
      :page-size="pageSize"
      @update:page="goToPage"
    />
  </UContainer>
</template>
