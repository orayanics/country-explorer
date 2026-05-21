import type { ICountry } from "~/types/country";
import { refDebounced } from "@vueuse/core";
import { useFavoritesStore } from "~/stores/favorites";

export type TRegionOption = "All" | TRegion;
export const regionOptions: TRegionOption[] = ["All", ...regions];
const DEBOUNCE_DELAY_MS = 600;

export const useCountries = (
  query: Ref<string>,
  region: Ref<string>,
  favorite: Ref<string>,
) => {
  const debouncedQuery = refDebounced(query, DEBOUNCE_DELAY_MS);

  const url = computed(() => {
    const trimmed = debouncedQuery.value.trim();
    return trimmed
      ? `${BASE_URL}/name/${encodeURIComponent(trimmed)}?fields=${COUNTRY_FIELDS}`
      : `${BASE_URL}/all?fields=${COUNTRY_FIELDS}`;
  });

  const { data, isLoading, error } = useQuery({
    key: () => ["countries", debouncedQuery.value.trim(), region.value],
    query: () =>
      $fetch<ICountry[]>(url.value).catch((err) => {
        if (err?.statusCode === 404) return [];
        throw err;
      }),
    staleTime: STALE_TIME_MS,
  });

  const countries = computed<ICountry[]>(() => {
    const list = data.value ?? [];
    const regionValue = region.value;
    const favoriteValue = favorite.value === "true";

    if (favoriteValue) {
      const favoritesStore = useFavoritesStore();
      return list.filter((country) =>
        favoritesStore.isFavorite(country.name.common),
      );
    }

    return regionValue === "All"
      ? list
      : list.filter((country) => country.region === regionValue);
  });

  return { data: countries, isLoading, error, regions: regionOptions };
};
