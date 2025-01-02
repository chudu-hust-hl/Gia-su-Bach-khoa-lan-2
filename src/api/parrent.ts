import { GSParentBasicInfo, GSParentReqInfo } from "types";
import { request } from "utils/request";

  
export const parentApi = {
  getParentList: async (data: GSParentBasicInfo[]): Promise<{ RespCode: number; RespText: string; Data: GSParentBasicInfo[] }> => {
    try {
      const result = await request<{ RespCode: number; RespText: string; Data: any[] }>("GSParent/GetParentLst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return result;
    } catch (error) {
      console.error("Error fetching parent list:", error);
      throw error;
    }
  },

  createParentInfo: async (ParentInfo: GSParentReqInfo ) => {

    const requestBody = {
      ParentInfo,
    };
    try {
      const result = await request<{ RespCode: number; RespText: string }>("GSParent/CreateParentInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      return result;
    } catch (error) {
      console.error("Error creating parent info:", error);
      throw error;
    }
  },

  getParentInfo: async (ParentID: string) => {
    const requestBody = {
        ParentID,
    };
    
    try {
        const result = await request<{
            RespCode: number;
            RespText: string;
            ParentInfo: GSParentBasicInfo;
        }>("GSParent/GetParentBasicInfo", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        return result;
    } catch (error) {
        console.error("Error fetching student basic info:", error);
        throw error;
    }
  },
};
  