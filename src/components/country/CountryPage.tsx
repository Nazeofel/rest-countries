import { useParams } from "react-router-dom";
import Card from "./CountryCard";
import React from "react";
import { CountryStats } from "../../utils/types";
import { useCuteBear } from "../../utils/States";
import { fetchCountryByName } from "../../utils/ApiCalls";

export default function CountryPage() {
  const params = useParams().id;
  const cuteBear = useCuteBear();
  const contryBear: CountryStats[] = cuteBear.countries;

  React.useEffect(() => {
    const x = async () => {
      cuteBear.setIsCountryValid("fetching");
      try {
        cuteBear.setCountries(await fetchCountryByName(params));
      } catch {
        cuteBear.setIsCountryValid("invalid");
      } finally {
        console.log("done");
      }
    };
    x();
  }, [params]);

  return (
    <>
      {contryBear.map((a: CountryStats, b: number) => {
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
