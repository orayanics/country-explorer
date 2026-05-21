<script setup lang="ts">
import { formatPopulation } from "~/utils/helpers";

const {
  country,
  borderCountries,
  bordersState,
  pending,
  error,
  countryFlagAlt,
} = useDetails();
</script>

<template>
  <UContainer class="py-8 space-y-6">
    <UButton
      to="/"
      variant="ghost"
      icon="i-lucide-arrow-left"
      label="Back to list"
    />

    <AppPendingState v-if="pending" variant="detail" />
    <AppErrorState v-else-if="error" />

    <CountryDetailCard
      v-else-if="country"
      :country="country"
      :border-countries="borderCountries"
      :borders-state="bordersState"
      :country-flag-alt="countryFlagAlt"
      :format-population="formatPopulation"
    />
  </UContainer>
</template>
