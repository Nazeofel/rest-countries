import { useCuteBear } from "../../utils/States";

export default function Form() {
  const cuteBear = useCuteBear();
  const countryName = useCuteBear((state) => state.countryName);
  const dropDownState = useCuteBear((state) => state.dropDownState);

  const regionValue = (value: string | null) => {
    console.log(value);
    return value === null ? false : cuteBear.setRegion(value);
  };
  return (
    <form>
      <input
        value={countryName}
        type="text"
        placeholder="search for a country"
        onChange={(e) => cuteBear.setSearchByCountry(e.currentTarget.value)}
      />
      <div className="select">
        <div
          className="selected"
          onClick={() => cuteBear.setDropDown(dropDownState)}
        >
          Filter by Region
        </div>
        <div className={dropDownState ? "options active" : "options"}>
          <div data-value={cuteBear.region} id="regions">
            <div
              className="option"
              data-value="Africa"
              onClick={(e) =>
                regionValue(e.currentTarget.getAttribute("data-value"))
              }
            >
              Africa
            </div>
            <div
              className="option"
              data-value="America"
              onClick={(e) =>
                regionValue(e.currentTarget.getAttribute("data-value"))
              }
            >
              America
            </div>
            <div
              className="option"
              data-value="Asia"
              onClick={(e) =>
                regionValue(e.currentTarget.getAttribute("data-value"))
              }
            >
              Asia
            </div>
            <div
              className="option"
              data-value="Europe"
              onClick={(e) =>
                regionValue(e.currentTarget.getAttribute("data-value"))
              }
            >
              Europe
            </div>
            <div
              className="option"
              data-value="Oceania"
              onClick={(e) =>
                regionValue(e.currentTarget.getAttribute("data-value"))
              }
            >
              Oceania
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
