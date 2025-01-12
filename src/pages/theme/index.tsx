import {  useRecoilValue } from "recoil";
import TutorListPage from "./tutor-list"; // Import the TutorListPage component
import ClassListPage from "./class-list"; // Import the ClassListPage component
import { userCurrentState} from "state"; // Assuming userState holds the user information
import React,{ FC } from "react";

export default function AvailableClassPage(){
	const userType = useRecoilValue(userCurrentState);
  	// Check the user type and render the appropriate component

	return (
	<>
		{userType.userCurrentType === 0 ? (
			<TutorListPage/>
		) : (
			<ClassListPage/>
		)}
	</>
	);
}
