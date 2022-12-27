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

export default function App() {
  const cuteBear = useCuteBear();
  const regionChange = useCuteBear((state) => state.region);
  const countryChange = useCuteBear((state) => state.countryName);
  const params = useParams().id;

  React.useEffect(() => {
    const x = async () => {
      cuteBear.setIsCountryValid("fetching");
      try {
        cuteBear.setCountries(await fetchCountries(countryChange));
      } catch {
        cuteBear.setIsCountryValid("invalid");
      } finally {
        console.log("done");
      }
    };

    const y = async () => {
      cuteBear.setIsCountryValid("fetching");
      try {
        cuteBear.setCountries(await fetchCountryByName(countryChange));
      } catch {
        cuteBear.setIsCountryValid("invalid");
      } finally {
        console.log("done");
      }
    };

    const timeOut = setTimeout(y, 500);
    const timeOut2 = setTimeout(x, 500);
    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOut2);
    };
  }, [countryChange]);

  React.useEffect(() => {
    const x = async () => {
      cuteBear.setIsCountryValid("fetching");
      try {
        cuteBear.setCountries(await fetchCountriesByRegion(regionChange));
      } catch {
        cuteBear.setIsCountryValid("invalid");
      } finally {
        console.log("done");
      }
    };
    const timeOut = setTimeout(x, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [regionChange]);

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
