import React from "react";
import "../scss/App.scss";
import { CountryStats } from "../utils/types";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import jsonParser from "../utils/jsonParser";

export default function App() {
  const [countries, setCountries] = React.useState([]);
  const [searchByCountry, setSearchByCountry] = React.useState("");
  const [searchByRegion, setSearchByRegion] = React.useState("");
  const [isFetching, setIsFetching] = React.useState(false);
  const [dropdownState, setDropdownState] = React.useState(false);
  const [countryInvalid, setCountryInvalid] = React.useState(false);

  React.useEffect(() => {
    if (searchByCountry === "") {
      const fetchCountries = async () => {
        const fetching = await fetch("https://restcountries.com/v2/all");
        if (fetching.ok) {
          const parsedJSON = await fetching.json();
          const countryMap = jsonParser(parsedJSON);
          return setCountries(countryMap);
        } else {
          return console.log("fetching not ok");
        }
      };
      fetchCountries();
    } else {
      const fetchCountryByName = async () => {
        const fetching = await fetch(
          `https://restcountries.com/v3.1/name/${searchByCountry}`
        );
        if (fetching.status !== 404) {
          setCountryInvalid(false);
          const parsedJSON = await fetching.json();
          const countryMap = await jsonParser(parsedJSON);
          return setCountries(countryMap);
        } else {
          return setCountryInvalid(true);
        }
      };
      fetchCountryByName();
    }
  }, [searchByCountry]);

  React.useEffect(() => {
    async function fetchCountriesByRegion() {
      if (searchByRegion === "" || isFetching === true) return;
      setIsFetching(true);
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
    fetchCountriesByRegion();
  }, [searchByRegion]);

  function getRegion(e: any) {
    const value = e.target.getAttribute("data-value");
    setSearchByRegion(value);
  }

  function RenderCountries() {
    return (
      <div className="country-container">
        {countryInvalid === false ? (
          countries.map((a: CountryStats, b: number) => {
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
          })
        ) : (
          <h1>NO VALID COUNTRY</h1>
        )}
      </div>
    );
  }

  return (
    <>
      <nav className="navigation">
        <div className="nav-items">
          <h1 className="website-title">Where in the World?</h1>
          <button className="theme-button">Dark Mode</button>
        </div>
      </nav>
      <main className="main-container">
        <form>
          <input
            value={searchByCountry}
            type="text"
            placeholder="search for a country"
            onChange={(e) => setSearchByCountry(e.target.value)}
          />
          <div className="select">
            <div
              className="selected"
              onClick={() => setDropdownState((prev: boolean) => !prev)}
            >
              Filter by Region
            </div>
            <div className={dropdownState ? "options active" : "options"}>
              <div data-value={searchByRegion} id="regions">
                <div
                  className="option"
                  data-value="Africa"
                  onClick={(e) => getRegion(e)}
                >
                  Africa
                </div>
                <div
                  className="option"
                  data-value="America"
                  onClick={(e) => getRegion(e)}
                >
                  America
                </div>
                <div
                  className="option"
                  data-value="Asia"
                  onClick={(e) => getRegion(e)}
                >
                  Asia
                </div>
                <div
                  className="option"
                  data-value="Europe"
                  onClick={(e) => getRegion(e)}
                >
                  Europe
                </div>
                <div
                  className="option"
                  data-value="Oceania"
                  onClick={(e) => getRegion(e)}
                >
                  Oceania
                </div>
              </div>
            </div>
          </div>
        </form>
        <RenderCountries />
      </main>
    </>
  );
}
