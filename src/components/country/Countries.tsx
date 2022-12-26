import { CountryStats } from "../../utils/types";
import { Link } from "react-router-dom";
import Card from "./CountryCard";
import React from "react";

export default function Countries(props: {
  isFetching: boolean;
  countryInvalid: boolean;
  countries: CountryStats[];
}) {
  return (
    <>
      {props.countryInvalid ? (
        <h1 style={{ color: "white" }}>COUNTRY IS INVALID</h1>
      ) : (
        <div className="country-container">
          {props.countries.map((a: CountryStats, b: number) => {
            return (
              <React.Fragment key={b}>
                <Link to={"country/" + a.officialName}>
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
                  />
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
}