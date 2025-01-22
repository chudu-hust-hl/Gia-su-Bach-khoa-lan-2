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
        console.log('UserID 1:', id, getUserZaloID());
        setUserZaloID(id); // Update the state with the fetched user ID
        const CookiesID = getUserZaloID();
        console.log('UserID 2:', id, CookiesID);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

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

    const fetchPhoneNumber = async () => {
      try {
        const phoneNumber = await getPhoneNumber({}); // Call the API to get the user ID
        //setPhoneNum(phoneNumber); // Update the state with the fetched user ID
        console.log('Phone Number Token:', phoneNumber);
      } catch (error) {
        console.error('Failed to fetch user phoneNumber Token:', error);
      }
    };

    const storeUserInfo = async () => {
      try {
        const userZaloID = getUserZaloID();
        const token = getToken();
        const zaloUserInfo: GSZaloUserInfo = {
          UserID: String(userZaloID),
          Token: String(token),
          Avatar: String(getAvatar()),
          Name: String(getName()),
          PhoneNumber: String(getPhoneNum()),
          StudentID: String(getStudentID()),
        };
        const result = await authApi.storeZaloUserInfo(zaloUserInfo);
        console.log('Store user info:', result); // Log the result of storing user info
      } catch (error) {
        console.error('Failed to store user info:', error);
      }
    };

    Promise.all([fetchUserID(), fetchToken(), fetchPhoneNumber()]).then(() => {
      storeUserInfo();
    });
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
