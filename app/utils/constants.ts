export const regions = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
] as const;

export type TRegion = (typeof regions)[number];

export const COUNTRIES_BASE_URL = "https://restcountries.com/v3.1";
export const COUNTRY_FIELDS = "name,flags,population,region,capital,cca3";

export const DETAILS_FIELDS =
  "name,flags,population,region,subregion,capital,borders,cca3";
export const BORDER_FIELDS = "name,cca3";

export const STALE_TIME_MS = 1000 * 60 * 60;
