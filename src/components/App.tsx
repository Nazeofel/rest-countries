/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import "../scss/App.scss";
import jsonParser from "../utils/jsonParser";
import Countries from "./country/Countries";
import Form from "./UI/Form";
import Navbar from "./UI/Navbar";

export default function App() {
  const [countries, setCountries] = React.useState([]);
  const [searchByCountry, setSearchByCountry] = React.useState("");
  const [searchByRegion, setSearchByRegion] = React.useState("");
  const [isFetching, setIsFetching] = React.useState(false);
  const [dropdownState, setDropdownState] = React.useState(false);
  const [countryInvalid, setCountryInvalid] = React.useState(false);

  const params = useParams();

  React.useEffect(() => {
    setIsFetching(true);
    const fetchCountries = async () => {
      if (searchByCountry === "") {
        const fetching = await fetch("https://restcountries.com/v2/all");
        if (fetching.status !== 404) {
          setCountryInvalid(false);
          const parsedJSON = await fetching.json();
          const countryMap = jsonParser(parsedJSON);
          setIsFetching(false);
          return setCountries(countryMap);
        } else {
          return setCountryInvalid(true);
        }
      } else {
        return;
      }
    };

    const fetchCountryByName = async () => {
      if (searchByCountry !== "") {
        const fetching = await fetch(
          `https://restcountries.com/v3.1/name/${searchByCountry}`
        );
        if (fetching.status !== 404) {
          setCountryInvalid(false);
          const parsedJSON = await fetching.json();
          const countryMap = await jsonParser(parsedJSON);
          setIsFetching(false);
          return setCountries(countryMap);
        } else {
          return setCountryInvalid(true);
        }
      } else {
        return;
      }
    };
    const timeOut = setTimeout(fetchCountryByName, 500);
    const timeOut2 = setTimeout(fetchCountries, 500);
    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOut2);
    };
  }, [searchByCountry]);

  React.useEffect(() => {
    setIsFetching(true);
    async function fetchCountriesByRegion() {
      if (searchByRegion === "" || isFetching === true) return;
      const fetching = await fetch(
        `https://restcountries.com/v3.1/region/${searchByRegion}`
      );
      if (fetching.status !== 404) {
        const parsedJSON = await fetching.json();
        const countryMap = await jsonParser(parsedJSON);
        setIsFetching(false);
        return setCountries(countryMap);
      } else {
        return;
      }
    }
    const timeOut = setTimeout(fetchCountriesByRegion, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchByRegion]);

  function getRegion(e: any) {
    const value = e.target.getAttribute("data-value");
    if (isFetching === true) {
      return;
    } else {
      setSearchByRegion(value);
    }
  }

  return (
    <>
      <Navbar />

      <main className="main-container">
        {params.id === undefined ? (
          <>
            <Form
              setDropdownState={setDropdownState}
              dropdownState={dropdownState}
              searchByCountry={searchByCountry}
              setSearchByCountry={setSearchByCountry}
              setSearchByRegion={setSearchByRegion}
              searchByRegion={searchByRegion}
              getRegion={getRegion}
            />
            <Countries
              countries={countries}
              isFetching={isFetching}
              countryInvalid={countryInvalid}
            />{" "}
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
}
