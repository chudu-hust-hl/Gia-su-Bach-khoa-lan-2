import { GSZaloUserInfo } from "types";
import { getToken } from "utils/auth";
import { request } from "utils/request";
import { getPhoneNumber } from "zmp-sdk/apis";

export const authApi = {
    getZaloUserInfo: async () => {
      try {
        const result = await request<{ 
          RespCode: number; 
          RespText: string; 
          ZaloUserInfo: GSZaloUserInfo 
        }>("User/GSGetZaloUserInfo", {
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

    storeZaloUserInfo: async (ZaloUserInfo: GSZaloUserInfo) => {
      const requestBody = {
        ZaloUserInfo: ZaloUserInfo,
      }
      try {
        const result = await request<{ 
          RespCode: number; 
          RespText: string 
        }>("User/GSStoreZaloUserInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        return result;
      } catch (error) {
        console.error("Error storing user info:", error);
        throw error;
      }
    },

    

    // getPhoneNumberFromZalo: async (token: string, code: string, secretKey: string): Promise<string | null> => {
    //   const endpoint = "https://graph.zalo.me/v2.0/me/info";
  
    //   const options = {
    //     url: endpoint,
    //     headers: {
    //       access_token: token,
    //       code: code,
    //       secret_key: secretKey,
    //     },
    //   }
    //   try {
    //     const result = await request<{ data: { number: string }; error: number; message: string }>(options);
  
    //     if (result.error === 0) {
    //       const phoneNumber = result.data.number;
    //       console.log("Phone Number:", phoneNumber);
    //       return phoneNumber;
    //     } else {
    //       console.error("Error fetching phone number:", result.message);
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error("Error fetching phone number:", error);
    //     throw error;
    //   }
    // },

  };




  

  