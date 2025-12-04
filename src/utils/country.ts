import * as countryCodes from "country-codes-list";

export interface CountryData {
  code: string;
  name: string;
  prefix: string;
}

export class Country {
  static myCountryObjects = countryCodes.customList(
    "countryCode",
    "{countryCode},{countryNameEn},{countryCallingCode}"
  );
  static getCountryByCode(code: string): CountryData | null {
    const upperCode = code.toUpperCase();
    const countryData = this.myCountryObjects[upperCode];
    if (countryData) {
      const [countryCode, countryName, callingCode] = countryData.split(",");
      return {
        code: countryCode,
        name: countryName,
        prefix: callingCode,
      };
    }
    return null;
  }

  static getDefaultCountry(): CountryData {
    return Country.getCountryByCode("AU")!;
  }

  static getOrDefaultCountry(code: string): CountryData {
    const country = this.getCountryByCode(code);
    return country ? country : this.getDefaultCountry();
  }
}
