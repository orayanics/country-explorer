<script setup lang="ts">
import { formatPopulation } from "~/utils/helpers";

const {
  country,
  borderCountries,
  bordersState,
  bordersError,
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
    <AppEmptyState
      v-else-if="error || bordersError"
      message="Country not found."
    />
    <CountryDetailCard
      v-else
      :country="country"
      :border-countries="borderCountries"
      :borders-state="bordersState"
      :country-flag-alt="countryFlagAlt"
      :format-population="formatPopulation"
    />
  </UContainer>
</template>
