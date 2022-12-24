export interface CountryStats {
  officialName: string;
  nativeName: string;
  capital: string;
  population: number;
  region: string;
  subRegion: string;
  domain: string[];
  currency: string[];
  languages: string[];
  borderCountries: string[];
  flags: string;
}

export interface ApiObject {
  name: any;
  code: string;
  symbol: string;
  iso639_1: string;
  iso639_2: string;
  nativeName: string;
  acronym: string;
  otherNames: string[];
  otherAcronyms: string[];
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  numericCode: string;
  flags: string;
  currencies: string[];
  languages: string[];
  translations: string[];
  flag: string;
  regionalBlocs: string[];
  cioc: string;
  independent: boolean;
}
