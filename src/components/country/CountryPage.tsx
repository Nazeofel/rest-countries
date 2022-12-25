import { useParams } from "react-router-dom";
import Card from "../Card";
import React from "react";
import { CountryStats } from "../../utils/types";
import jsonParser from "../../utils/jsonParser";

export default function CountryPage() {
  const params = useParams().id;
  console.log(params);
  const [countryData, setCountryData] = React.useState([]);

  React.useEffect(() => {
    async function fetchCountryByName() {
      if (params === undefined) return;
      const fetching = await fetch(
        `https://restcountries.com/v3.1/name/${params}`
      );
      const parsedJSON = await fetching.json();
      const countryMap = await jsonParser(parsedJSON);
      setCountryData(countryMap);
    }
    fetchCountryByName();
  }, [params]);

  return (
    <>
      {countryData.map((a: CountryStats, b: number) => {
        return (
          <Card
            officialName={a.officialName}
            nativeName={a.nativeName}
            population={a.population}
            region={a.region}
            subRegion={a.subRegion}
            domain={a.domain}
            currency={a.currency}
            languages={a.languages}
            borderCountries={a.borderCountries}
            flags={a.flags}
            capital={a.capital}
            key={b}
          />
        );
      })}
    </>
  );
}
