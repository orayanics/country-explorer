import { computed } from "vue";
import { useQuery } from "@pinia/colada";
import { refDebounced } from "@vueuse/core";
import type { LocationQueryRaw } from "vue-router";

import type { ICountry } from "@/types/country";
import { regions, STALE_TIME_MS } from "@/utils/constants";
import type { TRegion } from "@/utils/constants";
import { buildCountriesEndpoint } from "@/utils/helpers";

type TRegionOption = "All" | TRegion;
export const regionOptions: TRegionOption[] = ["All", ...regions];
const DEBOUNCE_DELAY_MS = 600;

export function useCountries() {
  const route = useRoute();
  const router = useRouter();

  function updateRouteQuery(key: "search" | "region", value: string): void {
    const nextQuery: LocationQueryRaw = { ...route.query };

    if (key === "search") {
      if (value) nextQuery.search = value;
      else delete nextQuery.search;
    }
    if (key === "region") {
      if (value && value !== "All") nextQuery.region = value;
      else delete nextQuery.region;
    }

    router.replace({ query: nextQuery });
  }

  const searchQuery = computed<string>({
    get: () => String(route.query.search ?? ""),
    set: (value) => updateRouteQuery("search", value),
  });
  const debouncedSearchQuery = refDebounced(searchQuery, DEBOUNCE_DELAY_MS);

  const regionQuery = computed<TRegionOption>({
    get: () => {
      const value = String(route.query.region ?? "All");
      return regionOptions.includes(value as TRegionOption)
        ? (value as TRegionOption)
        : "All";
    },
    set: (value) => updateRouteQuery("region", value),
  });

  const { data, isLoading, error, refresh } = useQuery({
    key: () => [
      "countries",
      debouncedSearchQuery.value || "all",
      regionQuery.value,
    ],
    query: () =>
      $fetch<ICountry[]>(buildCountriesEndpoint(debouncedSearchQuery.value)),
    staleTime: STALE_TIME_MS,
  });

  const countries = computed<ICountry[]>(() => {
    const list = data.value ?? [];
    const region = regionQuery.value;
    return region === "All"
      ? list
      : list.filter((country) => country.region === region);
  });

  return {
    regionOptions,
    searchQuery,
    regionQuery,
    countries,
    pending: isLoading,
    error,
    refresh,
  };
}
