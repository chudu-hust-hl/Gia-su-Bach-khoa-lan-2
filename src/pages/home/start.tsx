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
      <Box className="min-h-full bg-section flex flex-col items-center justify-center">
        <img
              className="w-25 h-25 rounded-lg border-inset mb-10"
              src={getConfig((c) => c.template.headerLogo) || logo}
              alt="Logo"
            />
        <h2 className="text-2xl mb-4 text-center">Bạn là phụ huynh, người học <br/> hay gia sư</h2>
        <div className="flex flex-col space-y-4">
          <Button large primary onClick={() => handleUserTypeSelect(0)}>
            Tôi là phụ huynh, người học
          </Button>
          <Button large primary onClick={() => handleUserTypeSelect(1)}>
            Tôi là gia sư
          </Button>
        </div>
      </Box>
    </Page>
  );
};

export default StartPage;
