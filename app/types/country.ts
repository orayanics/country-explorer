// /v3.1/all?fields=name,flags,population,region,capital,cca3
export interface ICountry {
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };
  cca3: string;
  capital?: string[];
  region: string;
  population: number;
}

// /v3.1/name/{name}
export interface ICountryDetails {
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  borders?: string[];
}

export interface IBorderCountry {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
}
