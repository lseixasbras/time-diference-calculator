import axios from "axios";
import { LocationDTO } from "../types";

export const getLocation = async (location: string) => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/location/${location}`
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const calculateTimeDiference = async (
  comparisonLocations: LocationDTO[],
  referenceLocation: LocationDTO
) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/calculate`,
      {
        comparisonLocations,
        referenceLocation,
      }
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
