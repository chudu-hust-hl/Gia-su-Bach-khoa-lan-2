// src/utils/api.ts
import { request } from "utils/request";
import { GSParentInfo, GSStudentInfo } from "types";

export const parentApi = {
  createParentInfo: async (parentInfo: { ParentInfo: GSParentInfo }) => {
    try {
      const result = await request<{ RespCode: number; RespText: string }>("GSParent/CreateParentInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parentInfo),
      });

      return result;
    } catch (error) {
      console.error("Error creating parent info:", error);
      throw error;
    }
  }
};

export const studentApi = {
  createStudentInfo: async (studentInfo: { StudentInfo: GSStudentInfo }) => {
    try {
      const result = await request<{ RespCode: number; RespText: string }>("GSStudent/GSCreateStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentInfo),
      });

      return result;
    } catch (error) {
      console.error("Error creating student info:", error);
      throw error;
    }
  }
};

export const locationApi = {
  // Get list of cities
  getCities: async (): Promise<string[]> => {
      try {
      const result = await request<{
          RespCode: number;
          RespText: string;
          Data: Array<{ City: string }>;
      }>("DefaultValue/GetCity", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
      });

      // Check response code and extract city names
      if (result.RespCode === 0) {
          return result.Data.map(item => item.City);
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
          Data: Array<{ District: string }>;
      }>("DefaultValue/GetDistrict", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ City: city }),
      });

      // Check response code and extract district names
      if (result.RespCode === 0) {
          return result.Data.map(item => item.District);
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
        Data: Array<{ Commune: string }>;
    }>("DefaultValue/GetCommune", {
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
        return result.Data.map(item => item.Commune);
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