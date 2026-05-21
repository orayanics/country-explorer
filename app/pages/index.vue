<script setup>
import AppEmptyState from "~/components/states/AppEmptyState.vue";
import AppErrorState from "~/components/states/AppErrorState.vue";
import AppPendingState from "~/components/states/AppPendingState.vue";

import { formatPopulation } from "~/utils/helpers";

const { regionOptions, searchQuery, regionQuery, countries, pending, error } =
  useCountries();

const {
  paginatedItems: paginatedCountries,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  goToPage,
} = usePagination(countries, { pageSize: 12 });
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
            :disabled="pending"
          />
        </UFormField>

        <UFormField label="Region">
          <USelect
            v-model="regionQuery"
            :items="regionOptions"
            icon="i-lucide-globe"
            class="w-full"
            :disabled="pending"
          />
        </UFormField>
      </div>
    </UCard>

    <AppPendingState v-if="pending" variant="list" />
    <AppErrorState v-else-if="error" />
    <AppEmptyState
      v-else-if="countries.length === 0"
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
      v-if="!pending && !error && countries.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="totalItems"
      :page-size="pageSize"
      @update:page="goToPage"
    />
  </UContainer>
</template>
