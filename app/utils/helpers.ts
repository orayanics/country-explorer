export function formatPopulation(population: number): string {
  if (typeof population !== "number") return "N/A";
  return new Intl.NumberFormat().format(population);
}
