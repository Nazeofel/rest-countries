import { CountryStats } from "../../utils/types";
export default function Card(props: CountryStats) {
  return (
    <div className="card-infos">
      <div className="country-flag">
        <img src={props.flags.toString()} alt="country" />
      </div>
      <div className="text-container">
        <p className="country-name">{props.officialName}</p>
        <p className="base-country-infos">
          Population:<span>{props.population}</span>
        </p>
        <p className="base-country-infos">
          Region:<span>{props.region}</span>
        </p>
        <p className="base-country-infos">
          Capital:<span>{props.capital}</span>
        </p>
      </div>
    </div>
  );
}
