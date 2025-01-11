import React, { useEffect, useState } from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot, useRecoilValue } from "recoil";
import { getConfig } from "utils/config";
import { Layout } from "./layout";
import { ConfigProvider } from "./config-provider";
import { Toaster } from "react-hot-toast";
import { getUserID, getAccessToken } from "zmp-sdk/apis";
import { setUserZaloID, setToken, setStudentID, setPhoneNum, getPhoneNum, getStudentID, getUserZaloID, getToken, getAvatar, getName, removeUserZaloID, removeToken } from "utils/auth";
import { userState } from "state";
import { authApi } from "api/auth";
import { getPhoneNumber } from "zmp-sdk";
import { GSZaloUserInfo } from "types";



const MyApp = () => {
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        removeUserZaloID();
        const id = await getUserID({}); // Call the API to get the user ID
        setUserZaloID(id); // Update the state with the fetched user ID
        console.log('UserID:', id);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    fetchUserID(); // Call the function to fetch the user ID
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        removeToken();
        const token = await getAccessToken({}); // Call the API to get the user ID
        setToken(token); // Update the state with the fetched user ID
        console.log('Access Token:', token);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    fetchToken(); // Call the function to fetch the user ID
  }, []);

  // useEffect(() => {
  //   const fetchPhoneNumber = async () => {
  //     try {
  //       const phoneNumber = await getPhoneNumber({}); // Call the API to get the user ID
  //       setPhoneNum(phoneNumber); // Update the state with the fetched user ID
  //       console.log('Access Token:', token);
  //     } catch (error) {
  //       console.error('Failed to fetch user ID:', error);
  //     }
  //   };

  //   fetchToken(); // Call the function to fetch the user ID
  // }, []);

  useEffect(() => {
    const zaloUserInfo = async () => {
      try {
        const zaloUser = (await authApi.getZaloUserInfo()); // Call the API to get the user ID
        setStudentID(zaloUser.ZaloUserInfo.StudentID);
        setPhoneNum(zaloUser.ZaloUserInfo.PhoneNumber);
        console.log('StudentID from app database:', zaloUser.ZaloUserInfo.StudentID);
        console.log('PhoneNumber from app database:', zaloUser.ZaloUserInfo.PhoneNumber);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    zaloUserInfo(); // Call the function to fetch the user ID
  }, []);

  useEffect(() => {
    const zaloUserInfo: GSZaloUserInfo ={
      UserID: getUserZaloID() || "Zalo12345678",
      Token: getToken() || "example-token-code-test1",
      Avatar: getAvatar() || "example-avatar",
      Name: getName() || "Nguyễn Trung Dũng",
      PhoneNumber: getPhoneNum() || "0904485061",
      StudentID: getStudentID() || "20226030",
    }
    const storeZaloUserInfo = async () => {
      try {
        const result = await authApi.storeZaloUserInfo(zaloUserInfo);
        console.log('Store user info:', result); // Log the result of storing user info

      } catch (error) {
        console.error('Failed to store user ID:', error);
      }
    };

    storeZaloUserInfo(); // Call the function to fetch the user ID
  }, []);

  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-background-color": "#f4f5f6",
        }}
      >
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <Layout />
              <Toaster
                containerClassName="toast-container"
                containerStyle={{
                  top: "calc(50% - 24px)",
                }}
              />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
