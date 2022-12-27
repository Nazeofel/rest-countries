import jsonParser from "./jsonParser";

export const fetchCountries = async (searchByCountry: string) => {
  if (searchByCountry !== "") {
    return;
  }
  const fetching = await fetch("https://restcountries.com/v2/all");
  if (fetching.status !== 200) {
    throw "Error while fetching countries";
  }
  const parsedJSON = await fetching.json();
  return jsonParser(parsedJSON);
};

export const fetchCountryByName = async (
  searchByCountry: string | undefined
) => {
  if (searchByCountry === "" || searchByCountry === undefined) {
    return;
  }

  const fetching = await fetch(
    `https://restcountries.com/v3.1/name/${searchByCountry}`
  );
  if (fetching.status !== 200) {
    throw "invalid countries";
  }
  const parsedJSON = await fetching.json();
  return jsonParser(parsedJSON);
};

export const fetchCountriesByRegion = async (searchByRegion: string) => {
  if (searchByRegion === "") {
    return [];
  }
  const fetching = await fetch(
    `https://restcountries.com/v3.1/region/${searchByRegion}`
  );
  if (fetching.status !== 200) {
    throw "Invalid Region";
  }
  const parsedJSON = await fetching.json();
  return jsonParser(parsedJSON);
};
