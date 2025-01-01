import React, { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Page } from 'zmp-ui';
import Button from 'components/button';
import { useNavigate } from 'react-router-dom';
import { userCurrentState, grantAuthorization } from 'state';
import { getConfig } from 'utils/config';
import logo from "static/logo.png";
import { authorize, showToast, setStorage, getStorage } from "zmp-sdk/apis";

const StartPage: FC = () => {
  const [userCurrent, setUserCurrentType] = useRecoilState(userCurrentState);
  const navigate = useNavigate();

  // const authorizeUser = async () => {
  //   try {
  //     const data = await authorize({
  //       scopes: ["scope.userLocation", "scope.userPhonenumber"],
  //     });
  //     console.log("cai gi day", data);
  //   } catch (error) {
  //     // xử lý khi gọi api thất bại
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   authorizeUser();
  // }, []);

  // const setDataToStorage = async () => {
  //   try {
  //     const { errorKeys } = await setStorage({
  //       data: {
  //         studentID: "20226030",
  //       }
  //     });
  //     console.log("key", errorKeys)
  //   } catch (error) {
  //     // xử lý khi gọi api thất bại
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //    setDataToStorage();
  // }, []);

//   const getDataFromStorage = async () => {
//     try {
//       const { studentID } = await getStorage({
//         keys: ["studentID"]
//       });
//       console.log(studentID)
//     } catch (error) {
//       // xử lý khi gọi api thất bại
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getDataFromStorage();
//  }, []);

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
