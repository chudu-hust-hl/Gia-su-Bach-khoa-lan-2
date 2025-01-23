import React, {useEffect, useState, startTransition} from "react";
import { Page, Box, Text, Button } from "zmp-ui";
import {useNavigate} from "react-router";
import { getUserZaloID } from "utils/auth";
import { followOA } from "zmp-sdk/apis";
import { getConfig } from "utils/config";
import logo from "static/logo.png";
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { classesState } from "state";

const SuccessPage: React.FC = () => {
const classes = useRecoilValue(classesState);

const handleClick = () => {
  startTransition(() => {
    navigate("/your-class");
  });
};


useEffect(() => {
    const fetchUserID = async () => {
        try {
        const id = getUserZaloID(); // Call the API to get the user ID
        const follow = id ? await followOA({id: id}) : null;// Update the state with the fetched user ID
        console.log('UserID:', id);
        } catch (error) {
        console.error('Failed following ZaloOA:', error);
        }
    };

    fetchUserID(); // Call the function to fetch the user ID
}, []);
  const navigate = useNavigate();
  return (
    <Page>
    <Box className="min-h-screen bg-white flex flex-col items-center justify-center">
        {/* Container chính */}
        <div className="relative w-[90%] max-w-md p-6 rounded-2xl drop-shadow-md">
          {/* Logo */}
          <img
            className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full border-4 border-white"
            src={getConfig((c) => c.template.headerLogo) || logo}
            alt="Logo"
          />
          {/* Tiêu đề */}
          <h2 className="mt-12 text-center text-2xl font-semibold">
            Đăng ký thành công
          </h2>
          <Text className="mt-2 text-center">Hãy follow OA Dự án gia sư Đại học Bách khoa Hà Nội để không bỏ lỡ những thông báo quan trọng về lớp của bạn qua tin nhắn.</Text>

          {/* Nút chọn vai trò */}
          <div className="mt-6 flex flex-col space-y-4 items-center">
            <Button
              className="border-none w-[80%] py-3 text-lg font-semibold bg-[#3a65ad] text-[#FFFFFF] rounded-lg hover:bg-blue-600"
              onClick={handleClick}
              
            >
                Tiếp tục
            </Button>
            <Button
              className="border-none w-[80%] py-3 text-lg font-semibold bg-[#FFFFFF] text-[#FFFFFF] rounded-lg"
              onClick={handleClick}
            >
                Để sau
            </Button>
          </div>
        </div>
      </Box>
    </Page>
  );
};

export default SuccessPage;