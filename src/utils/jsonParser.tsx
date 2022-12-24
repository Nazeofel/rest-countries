import { CountryStats, ApiObject } from "./types";

export default function jsonParser(parsedJSON: any) {
  const countryMap = parsedJSON.map((a: ApiObject, b: number) => {
    const obj: CountryStats = {
      officialName: typeof a.name === "string" ? a.name : [a.name.common][0],
      nativeName: a.nativeName,
      population: a.population,
      region: a.region,
      subRegion: a.subregion,
      domain: a.topLevelDomain,
      currency: a.currencies,
      languages: a.languages,
      borderCountries: a.borders,
      flags: Object.values(a.flags)[1],
      capital: a.capital,
    };
    return obj;
  });
  return countryMap;
}
