import { computed } from "vue";
import { useQuery } from "@pinia/colada";
import type { IBorderCountry, ICountryDetails } from "@/types/country";
import { BASE_URL, BORDER_FIELDS, STALE_TIME_MS } from "@/utils/constants";

type TBordersState = "none" | "loading" | "error" | "empty" | "ready";

export function useDetails() {
  const route = useRoute();
  const name = computed(
    () => route.params.code?.toString().toLowerCase().trim() ?? "",
  );

  const {
    data: details,
    isLoading: pending,
    error,
  } = useQuery({
    key: () => ["country-details", name.value],
    query: () =>
      $fetch<ICountryDetails[]>(
        `${BASE_URL}/name/${encodeURIComponent(name.value)}?fields=${DETAILS_FIELDS}`,
      ),
    staleTime: STALE_TIME_MS,
  });

  const country = computed<ICountryDetails | undefined>(() => {
    const list = details.value ?? [];
    return (
      list.find((c) => c.name.common.toLowerCase() === name.value) ??
      list.find((c) => c.name.official.toLowerCase() === name.value) ??
      list[0]
    );
  });

  const borderCodes = computed(() => country.value?.borders ?? []);

  const {
    data: borderCountries,
    isLoading: bordersPending,
    error: bordersError,
  } = useQuery({
    key: () => ["country-borders", borderCodes.value.join(",") || "none"],
    query: () =>
      borderCodes.value.length > 0
        ? $fetch<IBorderCountry[]>(
            `${BASE_URL}/alpha?codes=${borderCodes.value.join(",")}&fields=${BORDER_FIELDS}`,
          )
        : Promise.resolve([]),
    staleTime: STALE_TIME_MS,
  });

  const countryFlagAlt = computed(() =>
    country.value
      ? country.value.flags.alt || `${country.value.name.common} flag`
      : "Country flag",
  );

  const bordersState = computed<TBordersState>(() => {
    if (borderCodes.value.length === 0) return "none";
    if (bordersError.value) return "error";
    if (bordersPending.value || borderCountries.value === undefined)
      return "loading";
    if (borderCountries.value.length === 0) return "empty";
    return "ready";
  });

  return {
    country,
    borderCountries,
    bordersState,
    pending,
    error,
    countryFlagAlt,
  };
}
