/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import "../scss/App.scss";
import {
  fetchCountries,
  fetchCountriesByRegion,
  fetchCountryByName,
} from "../utils/ApiCalls";
import Countries from "./country/Countries";
import Form from "./UI/Form";
import Navbar from "./UI/Navbar";
import { useCuteBear } from "../utils/States";
import { useDebounce } from "../utils/customHooks";

export default function App() {
  const cuteBear = useCuteBear();
  const regionChange = useCuteBear((state) => state.region);
  const countryChange = useCuteBear((state) => state.countryName);
  const params = useParams().id;
  const debouncedCountries = useDebounce(countryChange, 500);
  const debouncedRegion = useDebounce(regionChange, 500);

  React.useEffect(() => {
    (async () => {
      cuteBear.setIsCountryValid("fetching");
      try {
        if (debouncedCountries) {
          cuteBear.setCountries(await fetchCountryByName(debouncedCountries));
        } else {
          cuteBear.setCountries(await fetchCountries(debouncedCountries));
        }
      } catch {
        cuteBear.setIsCountryValid("invalid");
      } finally {
        cuteBear.setIsCountryValid("");
      }
    })();
  }, [debouncedCountries]);

  React.useEffect(() => {
    (async () => {
      cuteBear.setIsCountryValid("fetching");
      try {
        cuteBear.setCountries(await fetchCountriesByRegion(regionChange));
      } catch {
        cuteBear.setIsCountryValid("invalid");
      } finally {
        cuteBear.setIsCountryValid("");
      }
    })();
  }, [debouncedRegion]);

  return (
    <>
      <Navbar />
      <main className="main-container">
        {params === undefined ? (
          <>
            <Form />
            <Countries />
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
}
