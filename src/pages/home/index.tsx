import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userCurrentState, userState } from "state"; // Assuming userState holds the user information
import TutorHomePage from "./tutor-home";
import ParentHomePage from "./parent-home";
import StartPage from "./start";
import React, {FC} from "react";

export default function HomePage() {
  const userType = useRecoilValue(userCurrentState);
  const navigate = useNavigate();

  {useEffect(() => {
    if (!localStorage.getItem('userType')) {
      console.log(userType, "Khong co");
      navigate("/start"); // Show the selection component
    }
    else{
      if (userType.userCurrentType == null) {
        console.log(userType, "Chua chon");
        navigate("/start"); // Show the selection component
      }
      console.log(userType, "Co type");
    }
  }, [userType, navigate]);}
  
  return (
    <>
      {userType.userCurrentType === 0 ? (
        <ParentHomePage />
      ) : (
        <TutorHomePage />
      )}
    </>
  );
}