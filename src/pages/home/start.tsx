import React, { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Page } from 'zmp-ui';
import Button from 'components/button';
import { useNavigate } from 'react-router-dom';
import { userCurrentState } from 'state';
import { getConfig } from 'utils/config';
import logo from "static/logo.png";

const StartPage: FC = () => {
  const [userCurrent, setUserCurrentType] = useRecoilState(userCurrentState);
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: 0|1) => {
    // Create an updated user type object
    const updatedUserType = {
      userCurrentType: type, // Set the user type based on the selection
    };
  
    // Update the Recoil state
    setUserCurrentType(updatedUserType);
  
    // Store the updated user type in localStorage
    localStorage.setItem('userType', JSON.stringify(updatedUserType));
  
    // Optional: Navigate to a different page if needed
    navigate("/"); // Navigate to the home page or another page
  };

  return (
    <Page>
      <Box className="min-h-screen bg-white flex flex-col items-center justify-center">
        {/* Container chính */}
        <div className="relative w-[90%] max-w-md bg-[#060f44] p-6 rounded-2xl drop-shadow-md">
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
              className="border-none w-[80%] py-3 text-lg font-semibold bg-[#FFB600] text-[#050C33] rounded-lg hover:bg-blue-600"
              onClick={() => handleUserTypeSelect(0)}
            >
              Phụ huynh / người học
            </Button>
            <Button
              className="border-none w-[80%] py-3 text-lg font-semibold bg-[#FFB600] text-[#050C33] rounded-lg hover:bg-blue-600"
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