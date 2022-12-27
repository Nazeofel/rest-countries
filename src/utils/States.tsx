import create from "zustand";
import { BearState } from "./types";

export const useCuteBear = create<BearState>()((set) => ({
  countries: [],
  region: "",
  countryName: "",
  dropDownState: false,
  countryValid: "",
  setIsCountryValid: (countryValid) => set({ countryValid: countryValid }),
  setDropDown: (dropDownState) => set({ dropDownState: !dropDownState }),
  setSearchByCountry: (countryName) => set({ countryName: countryName }),
  setRegion: (region) => set({ region: region }),
  setCountries: (countries) => set({ countries: countries }),
}));
