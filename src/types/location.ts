export interface CountryResponse {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phoneCode: string;
  currency: string;
  currencySymbol: string;
  emoji: string;
  region: string;
  subregion: string;
  hasStates: boolean;
}

export interface StateResponse {
  id: number;
  countryId: number;
  name: string;
  stateCode: string;
  hasCities: boolean;
}
