export function formatPopulation(population: number): string {
  if (typeof population !== "number") return "N/A";
  return new Intl.NumberFormat().format(population);
}

export function buildNameEndpoint(name: string): string {
  return `${BASE_URL}/name/${encodeURIComponent(name)}?fields=${DETAILS_FIELDS}`;
}
