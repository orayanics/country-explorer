<script setup lang="ts">
import type { IBorderCountry, ICountryDetails } from "~/types/country";
import AppEmptyState from "../states/AppEmptyState.vue";
import AppPendingState from "../states/AppPendingState.vue";
import AppErrorState from "../states/AppErrorState.vue";

const props = defineProps<{
  country: ICountryDetails | undefined;
  borderCountries: IBorderCountry[] | undefined;
  bordersState: "none" | "loading" | "error" | "empty" | "ready";
  countryFlagAlt: string;
  formatPopulation: (population: number) => string;
}>();
</script>

<template>
  <UCard>
    <div class="content-stack">
      <NuxtImg
        v-if="props.country?.flags.png"
        :src="props.country?.flags?.png"
        :alt="props.countryFlagAlt"
        width="160"
        height="100"
      />
      <h1 class="title-row">
        <UIcon name="i-lucide-flag" class="size-5" />
        <span>{{ props.country?.name?.common || "N/A" }}</span>
      </h1>
      <p class="meta-row">
        <UIcon name="i-lucide-users" class="size-4" />
        <span>{{
          props.formatPopulation(props.country?.population || 0)
        }}</span>
      </p>
      <p class="meta-row">
        <UIcon name="i-lucide-globe" class="size-4" />
        <span>{{ props.country?.region || "N/A" }}</span>
      </p>
      <p v-if="props.country?.subregion" class="meta-row">
        <UIcon name="i-lucide-map" class="size-4" />
        <span>{{ props.country?.subregion }}</span>
      </p>
      <p class="meta-row">
        <UIcon name="i-lucide-building-2" class="size-4" />
        <span>{{ props.country?.capital?.[0] || "N/A" }}</span>
      </p>
    </div>

    <USeparator class="my-4" />

    <div class="content-stack">
      <h2 class="section-title-row">
        <UIcon name="i-lucide-waypoints" class="size-5" />
        <span>Border Countries</span>
      </h2>
      <AppEmptyState
        v-if="props.bordersState === 'none'"
        message="No border countries"
      />
      <AppPendingState
        v-else-if="props.bordersState === 'loading'"
        variant="inline"
      />
      <AppErrorState v-else-if="props.bordersState === 'error'" />
      <AppEmptyState
        v-else-if="props.bordersState === 'empty'"
        message="No border countries"
      />
      <div v-else class="chips-wrap">
        <UButton
          v-for="border in props.borderCountries"
          :key="border.cca3"
          :to="`/country/${encodeURIComponent(border.name?.common || border.cca3)}`"
          variant="outline"
          size="sm"
        >
          {{ border.name?.common || border.cca3 }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
@reference "@/assets/main.css";

.content-stack {
  @apply space-y-3;
}

.meta-row {
  @apply flex items-center gap-2;
}

.title-row {
  @apply flex items-center gap-2 text-2xl font-semibold;
}

.section-title-row {
  @apply flex items-center gap-2 text-lg font-medium;
}

.chips-wrap {
  @apply flex flex-wrap gap-2;
}
</style>
