import { GSParentInfo } from "types";
import { request } from "utils/request";

export const getParrentListApi = {
    getParentList: async (data: GSParentInfo[]): Promise<{ RespCode: number; RespText: string; Data: GSParentInfo[] }> => {
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
      }  
  }
  
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
  