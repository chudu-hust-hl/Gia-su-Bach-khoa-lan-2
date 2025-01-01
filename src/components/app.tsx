import React, { useEffect, useState } from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot, useRecoilValue } from "recoil";
import { getConfig } from "utils/config";
import { Layout } from "./layout";
import { ConfigProvider } from "./config-provider";
import { Toaster } from "react-hot-toast";
import { getUserID, getAccessToken } from "zmp-sdk/apis";
import { setUserZaloID, setToken, setStudentID, setPhoneNumber } from "utils/auth";
import { userState } from "state";
import { authApi } from "api/auth";



const MyApp = () => {
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const id = await getUserID({}); // Call the API to get the user ID
        setUserZaloID(id); // Update the state with the fetched user ID
        console.log('User  ID:', id);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    fetchUserID(); // Call the function to fetch the user ID
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken({}); // Call the API to get the user ID
        setToken(token); // Update the state with the fetched user ID
        console.log('Access Token:', token);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    fetchToken(); // Call the function to fetch the user ID
  }, []);

  useEffect(() => {
    const zaloUserInfo = async () => {
      try {
        const zaloUser = (await authApi.getZaloUserInfo()); // Call the API to get the user ID
        setStudentID(zaloUser.ZaloUserInfo.StudentID);
        setPhoneNumber(zaloUser.ZaloUserInfo.PhoneNumber);
        console.log('StudentID from app database:', zaloUser.ZaloUserInfo.StudentID);
        console.log('PhoneNumber from app database:', zaloUser.ZaloUserInfo.PhoneNumber);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    zaloUserInfo(); // Call the function to fetch the user ID
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
