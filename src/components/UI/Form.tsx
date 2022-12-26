import { FormData } from "../../utils/types";

export default function Form(props: FormData) {
  return (
    <form>
      <input
        value={props.searchByCountry}
        type="text"
        placeholder="search for a country"
        onChange={(e) => props.setSearchByCountry(e.target.value)}
      />
      <div className="select">
        <div
          className="selected"
          onClick={() => props.setDropdownState((prev) => !prev)}
        >
          Filter by Region
        </div>
        <div className={props.dropdownState ? "options active" : "options"}>
          <div data-value={props.searchByRegion} id="regions">
            <div
              className="option"
              data-value="Africa"
              onClick={(e) => props.getRegion(e)}
            >
              Africa
            </div>
            <div
              className="option"
              data-value="America"
              onClick={(e) => props.getRegion(e)}
            >
              America
            </div>
            <div
              className="option"
              data-value="Asia"
              onClick={(e) => props.getRegion(e)}
            >
              Asia
            </div>
            <div
              className="option"
              data-value="Europe"
              onClick={(e) => props.getRegion(e)}
            >
              Europe
            </div>
            <div
              className="option"
              data-value="Oceania"
              onClick={(e) => props.getRegion(e)}
            >
              Oceania
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
