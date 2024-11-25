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

  {/*useEffect(() => {
    if (!user || user.Type === null) {
      navigate("/start"); // Redirect to the Start page
    }
  }, [user, navigate]);

  // If the user is not defined or the type is null, we don't render anything yet
  if (!user || user.Type === null) {
    return null; // You can also return a loading spinner or similar here
  }*/}

  
  console.log(localStorage.getItem('userType'), "Dday la user");
  
  if (!localStorage.getItem('userType')) {
    console.log(userType, "Khong co");
    return <StartPage />; // Show the selection component
  }
  else{
    if (userType.userCurrentType == null) {
      console.log(userType, "Chua chon");
      return <StartPage />; // Show the selection component
    }
    console.log(userType, "Co type");
  }

  // Check the user type and render the appropriate component
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