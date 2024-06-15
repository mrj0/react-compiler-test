import { action, makeAutoObservable } from "mobx";

type Country = {
  name: string;
  cities: string[];
};

const serverCountries: Country[] = [
  {
    name: "USA",
    cities: ["New York", "Los Angeles"],
  },
  {
    name: "Canada",
    cities: ["Toronto", "Vancouver"],
  },
  {
    name: "Australia",
    cities: ["Sydney", "Melbourne"],
  },
  {
    name: "Germany",
    cities: ["Berlin", "Munich"],
  },
  {
    name: "India",
    cities: ["Delhi", "Mumbai"],
  },
];

export class CountryStore {
  inputValue = "";

  countries: Country[] = [];

  constructor() {
    makeAutoObservable(this, {
      onInputValueChange: action.bound,
      onClickAddCountry: action.bound,
      loadCountries: action.bound,
      deleteCountry: action.bound,
      addCountry: action.bound,
    })

    // noinspection JSIgnoredPromiseFromCall
    this.loadCountries();
  }

  // input handlers. I don't *love* having react handlers in a store, I think these would ideally be in a component
  // and maybe the react compiler would help with that. But in pure mobx, for performance I might place handlers
  // on a store to avoid re-renders. Usually these would call another action function to do the actual work.
  onInputValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.inputValue = e.target.value;
  }

  loadCountries = async (): Promise<Country[]> => {
    // just a dummy to imitate async fetch request
    this.countries = serverCountries;
    return this.countries;
  };

  deleteCountry = async (name: string): Promise<Country[]> => {
    // just a dummy return to imitate async fetch request
    this.countries = this.countries.filter((country) => country.name !== name);
    return this.countries;
  };

  // this is another event handler that then calls a plain action, plain actions are more reusable in a store
  onClickAddCountry: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await this.addCountry(this.inputValue);
    this.inputValue = "";
  }

  addCountry = async (name: string): Promise<Country> => {
    // just a dummy return to imitate async fetch request

    // because this function doesn't await, it doesn't need to use runInAction here in strict mode
    const country: Country = {name: name, cities: []};
    this.countries.push(country);
    return country;
  };
}
