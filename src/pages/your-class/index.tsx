import { useRecoilState, useRecoilValue } from "recoil";
import React, { FC } from "react";
import { userState, classesState, selectedTabIndexState } from "state";
import { Header, Page } from "zmp-ui";
import { TeachingList, ApplyingList, DoneList, ClassTypeTabs } from "components/class-type-tabs";


const YourClassPage: FC = () => {
  const classes = useRecoilValue(classesState); 
  const user = useRecoilValue (userState);
  const studentID = user.StudentID;
  const phoneNumber = user.PhoneNumber;


  return (
    <Page>
      <Header title="Danh sách lớp" />
      <div>
      <ClassTypeTabs studentID={studentID} phoneNumber={phoneNumber}/>
      </div>
    </Page>
  );
};

export default YourClassPage;