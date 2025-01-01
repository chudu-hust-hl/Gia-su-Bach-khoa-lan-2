import { GSZaloUserInfo } from "types";
import { request } from "utils/request";

export const authApi = {
    getZaloUserInfo: async () => {
      try {
        const result = await request<{ RespCode: number; RespText: string; ZaloUserInfo: GSZaloUserInfo }>("User/GSGetZaloUserInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        return result;
      } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
      }
    },

  };




  

  