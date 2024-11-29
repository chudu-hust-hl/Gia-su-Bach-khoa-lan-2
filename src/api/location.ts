import { request } from "utils/requestLocation";

export const locationApi = {
  // Get list of cities
  getCities: async (): Promise<string[]> => {
      try {
      const result = await request<{
          RespCode: number;
          RespText: string;
          LocationLst: string[];
      }>("api-t/User/GetLocation", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
      });

      // Check response code and extract city names
      if (result.RespCode === 0) {
        console.log("Loi o day",result)
          return result.LocationLst;
      } else {
          throw new Error(result.RespText || "Failed to fetch cities");
      }
      } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
      }
  },

  // Get districts for a specific city
  getDistricts: async (city: string): Promise<string[]> => {
      try {
      const result = await request<{
          RespCode: number;
          RespText: string;
          LocationLst: string[];
      }>("api-t/User/GetLocation", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ City: city }),
      });

      // Check response code and extract district names
      if (result.RespCode === 0) {
          return result.LocationLst;
      } else {
          throw new Error(result.RespText || "Failed to fetch districts");
      }
      } catch (error) {
      console.error("Error fetching districts:", error);
      return [];
      }
  },

  // Get communes for a specific district
  getCommunes: async (city: string, district: string): Promise<string[]> => {

    console.log("Fetching communes with params:", { city, district });
    try {
    const result = await request<{
        RespCode: number;
        RespText: string;
        LocationLst: string[];
    }>("api-t/User/GetLocation", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
        City: city, 
        District: district 
        }),
    });

    // Check response code and extract ward names
    if (result.RespCode === 0) {
        return result.LocationLst;
    } else {
        console.error("Failed to fetch communes:", result.RespText);
        throw new Error(result.RespText || "Failed to fetch communes");
    }
    } catch (error) {
      console.error("Error fetching communes:", error);
      return [];
    }
  }
};
  
// Add more API functions here as needed

