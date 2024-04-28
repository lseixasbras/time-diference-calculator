export type LocationDTO = {
  adminCode1?: string | null;
  lng: string;
  geonameId: number;
  toponymName: string;
  countryId?: string | null;
  fcl: string;
  population?: number | null;
  countryCode?: string | null;
  name: string;
  fclName: string;
  adminCodes1?: { [key: string]: string } | null;
  countryName?: string | null;
  fcodeName: string;
  adminName1?: string | null;
  lat: string;
  fcode: string;
};

export type LocationComparison = {
  id: string;
  comparisonLocationName: string;
  comparisonLocationTimeZone: string;
  referenceLocationName: string;
  referenceLocationTimeZone: string;
  timeDifference: number;
};
