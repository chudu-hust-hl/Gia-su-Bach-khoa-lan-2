// src/pages/your-class/teaching-detail.tsx
import { useParams } from "react-router-dom";
import {  useRecoilValue } from "recoil";
import { userCurrentState, userState } from "state";
import TutorTeachingDetailPage from "./tutor-teaching-detail";
import ParentTeachingDetailPage from "./parent-teaching-detail";
import React, {FC} from "react";

const TeachingDetailPage: FC = () => {
  const userType = useRecoilValue(userCurrentState);

  return (
    <>
      {userType.userCurrentType === 0 ? (
        <ParentTeachingDetailPage />
      ) : (
        <TutorTeachingDetailPage />
      )}
    </>
  );
};

export default TeachingDetailPage;