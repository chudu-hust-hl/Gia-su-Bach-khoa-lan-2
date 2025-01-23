import React, { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Page } from 'zmp-ui';
import Button from 'components/button';
import { useNavigate } from 'react-router-dom';
import { userCurrentState, grantAuthorization } from 'state';
import { getConfig } from 'utils/config';
import logo from "static/logo.png";
import { getPhoneNum, getStudentID, getUserZaloID, getToken, getAvatar, getName, removeUserZaloID, removeToken, removeStudentID } from "utils/auth";
import { authApi } from 'api/auth';
import { GSZaloUserInfo } from 'types';
import { authorize, showToast} from "zmp-sdk/apis";

const StartPage: FC = () => {
  const [userCurrent, setUserCurrentType] = useRecoilState(userCurrentState);
  const navigate = useNavigate();


  const handleUserTypeSelect = async (type: 0|1) => {
    // Create an updated user type object
    const updatedUserType = {
      userCurrentType: type, // Set the user type based on the selection
    };
  
    // Update the Recoil state
    setUserCurrentType(updatedUserType);
  
    // Store the updated user type in localStorage
    localStorage.setItem('userType', JSON.stringify(updatedUserType));
  
    // Get the userZaloID and token
    const userZaloID = getUserZaloID();
    const token = getToken();
  
    // Create the zaloUserInfo object
    const zaloUserInfo: GSZaloUserInfo = {
      UserID: String(userZaloID),
      Token: String(token),
      Avatar: String(getAvatar()),
      Name: String(getName()),
      PhoneNumber: String(getPhoneNum()),
      StudentID: String(getStudentID()),
    };
  
    // Store the zaloUserInfo using the API
    try {
      console.log("User Info:", zaloUserInfo);
      const result = await authApi.storeZaloUserInfo(zaloUserInfo);
      console.log('Store user info:', result); // Log the result of storing user info
    } catch (error) {
      console.error('Failed to store user ID:', error);
    }
  
    // Check if StudentID is null
    const studentID = getStudentID();
    if (studentID === null && type==1) {
      // Navigate to /formStudent if StudentID is null
      navigate("/formStudent");
    } else {
      // Navigate to the home page or another page if StudentID is not null
      navigate("/");
    }
  };

  return (
    <Page>
      <Box className="min-h-screen bg-white flex flex-col items-center justify-center">
        {/* Container chính */}
        <div className="relative w-[90%] max-w-md bg-[#AD493A] p-6 rounded-2xl drop-shadow-md">
          {/* Logo */}
          <img
            className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full border-4 border-white"
            src={getConfig((c) => c.template.headerLogo) || logo}
            alt="Logo"
          />
          {/* Tiêu đề */}
          <h2 className="mt-12 text-center text-[#ffffff] text-2xl font-semibold">
            Tham gia với vai trò:
          </h2>
          {/* Nút chọn vai trò */}
          <div className="mt-6 flex flex-col space-y-4 items-center">
            <Button
              className="border-none w-[80%] py-3 text-lg font-semibold bg-[#3a65ad] text-[#FFFFFF] rounded-lg hover:bg-blue-600"
              onClick={() => handleUserTypeSelect(0)}
            >
              Phụ huynh / người học
            </Button>
            <Button
              className="border-none w-[80%] py-3 text-lg font-semibold bg-[#3a65ad] text-[#FFFFFF] rounded-lg hover:bg-blue-600"
              onClick={() => handleUserTypeSelect(1)}
            >
              Gia sư
            </Button>
          </div>
        </div>
      </Box>
    </Page>
  );
};

export default StartPage;