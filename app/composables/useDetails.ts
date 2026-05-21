import { computed } from "vue";
import { useQuery } from "@pinia/colada";
import type { IBorderCountry, ICountryDetails } from "@/types/country";
import { BASE_URL, BORDER_FIELDS, STALE_TIME_MS } from "@/utils/constants";
import { buildNameEndpoint } from "@/utils/helpers";

type TBordersState = "none" | "loading" | "error" | "empty" | "ready";

export function useDetails() {
  const route = useRoute();
  const nameParam = computed(() => String(route.params.code ?? "").trim());
  const normalizedName = computed(() => nameParam.value.toLowerCase());

  const {
    data: countryList,
    isLoading: pending,
    error,
    refresh,
  } = useQuery({
    key: () => ["country-details", normalizedName.value],
    query: () =>
      nameParam.value
        ? $fetch<ICountryDetails[]>(buildNameEndpoint(nameParam.value))
        : Promise.resolve([]),
    staleTime: STALE_TIME_MS,
  });

  const country = computed<ICountryDetails | null>(() => {
    const list = countryList.value ?? [];
    if (list.length === 0) return null;

    const needle = normalizedName.value;
    return (
      list.find((item) => item.name.common.toLowerCase() === needle) ??
      list.find((item) => item.name.official.toLowerCase() === needle) ??
      list[0] ??
      null
    );
  });

  const borderCodes = computed(() => country.value?.borders ?? []);
  const hasBorders = computed(() => borderCodes.value.length > 0);

  const {
    data: borderCountries,
    isLoading: bordersPending,
    error: bordersError,
  } = useQuery({
    key: () => ["country-borders", borderCodes.value.join(",") || "none"],
    query: () =>
      hasBorders.value
        ? $fetch<IBorderCountry[]>(
            `${BASE_URL}/alpha?codes=${borderCodes.value.join(",")}&fields=${BORDER_FIELDS}`,
          )
        : Promise.resolve([]),
    staleTime: STALE_TIME_MS,
  });

  const countryFlagAlt = computed(() => {
    if (!country.value) return "Country flag";
    return country.value.flags.alt || `${country.value.name.common} flag`;
  });

  const bordersState = computed<TBordersState>(() => {
    if (!hasBorders.value) return "none";
    if (bordersError.value) return "error";
    if (bordersPending.value || borderCountries.value === undefined) {
      return "loading";
    }
    if ((borderCountries.value?.length ?? 0) === 0) return "empty";
    return "ready";
  });

  return {
    country,
    borderCountries,
    bordersState,
    pending,
    error,
    refresh,
    countryFlagAlt,
  };
}
