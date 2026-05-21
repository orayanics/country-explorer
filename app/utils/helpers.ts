export function formatPopulation(population: number): string {
  if (typeof population !== "number") return "N/A";
  return new Intl.NumberFormat().format(population);
}

export function buildCountriesEndpoint(searchValue: string): string {
  const trimmedSearch = searchValue.trim();
  if (!trimmedSearch) {
    return `${COUNTRIES_BASE_URL}/all?fields=${COUNTRY_FIELDS}`;
  }

  return `${COUNTRIES_BASE_URL}/name/${encodeURIComponent(trimmedSearch)}?fields=${COUNTRY_FIELDS}`;
}

export function buildNameEndpoint(name: string): string {
  return `${COUNTRIES_BASE_URL}/name/${encodeURIComponent(name)}?fields=${DETAILS_FIELDS}`;
}
