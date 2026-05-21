<script setup lang="ts">
import type { ICountry } from "~/types/country";

const props = defineProps<{
  country: ICountry;
  formatPopulation: (population: number) => string;
}>();
</script>

<template>
  <UCard>
    <NuxtLink
      :to="`/country/${encodeURIComponent(props.country.name?.common)}`"
    >
      <div class="space-y-4">
        <div class="flex gap-4">
          <div>
            <NuxtImg
              :src="props.country.flags?.svg || props.country.flags?.png"
              :alt="props.country.flags?.alt || `${props.country.name?.common}`"
              loading="lazy"
              class="rounded-xl object-cover w-24 h-16 border border-gray-200"
            />
          </div>

          <div class="flex flex-col justify-center">
            <p class="text-xl font-semibold flex gap-2">
              {{ props.country.name?.common || "N/A" }}
            </p>
            <p class="text-gray-600">
              <span>{{ props.country.region || "N/A" }}</span>
            </p>
          </div>
        </div>

        <div class="grid gap-4 grid-cols-2">
          <p class="flex flex-col font-semibold">
            {{ props.formatPopulation(props.country.population) }}
            <span class="inline-block font-medium text-gray-600"
              >Population</span
            >
          </p>

          <p class="flex flex-col font-semibold">
            {{ props.country.capital?.[0] || "N/A" }}
            <span class="inline-block font-medium text-gray-600">Capital</span>
          </p>
        </div>
      </div>
    </NuxtLink>
  </UCard>
</template>
