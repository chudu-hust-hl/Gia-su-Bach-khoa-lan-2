import { tabsState, tutorState, parentState, userCurrentState } from "state";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from "recoil";
import React, { FC, useEffect } from "react";
import {Tabs} from "zmp-ui";
import { ClassGrid } from "components/class-grid";
import { GSClass } from "types";
import { classesState } from "state";
import { TeachingGrid } from "components/teaching-grid";
import Button from "./button";



export const ApplyingList: FC<{ classes: GSClass[]; studentID: string; phoneNumber: string }> = ({ classes, studentID, phoneNumber }) => {
  const userType = useRecoilValue(userCurrentState);
  const userAsTutor = useRecoilValue(tutorState(studentID));
  const userAsParent = useRecoilValue(parentState(phoneNumber));

  const appliedClasses = userType.userCurrentType === 0
    ? classes.filter(classItem => (userAsParent?.Apply || []).includes(classItem.ClassID.toString()))
    : classes.filter(classItem => (userAsTutor?.Apply || []).includes(classItem.ClassID.toString()));

    console.log(userAsTutor?.Apply)

  return (
    <div className="grid grid-cols-1 px-4 py-2 gap-4 bg-gradient-to-b from-[#bbc7ff] to-[#2F529B]">
      {appliedClasses.length > 0 ? (
        <ClassGrid classes={appliedClasses} />
      ) : (
        <p className="text-gray-500">Bạn chưa ứng tuyển vào lớp nào.</p>
      )}
    </div>
  );
}

export const TeachingList: FC<{ classes: GSClass[]; studentID: string; phoneNumber: string }> = ({ classes, studentID, phoneNumber }) => {
  const userType = useRecoilValue(userCurrentState);
  const userAsTutor = useRecoilValue(tutorState(studentID));
  const userAsParent = useRecoilValue(parentState(phoneNumber));

  const appliedClasses = userType.userCurrentType === 0
    ? classes.filter(classItem => (userAsParent?.Teaching || []).includes(classItem.ClassID.toString()))
    : classes.filter(classItem => (userAsTutor?.Teaching || []).includes(classItem.ClassID.toString()));


  return (
    <div className="grid grid-cols-1 px-4 py-2 gap-4 bg-gradient-to-b from-[#bbc7ff] to-[#2F529B]">
      {appliedClasses.length > 0 ? (
        <TeachingGrid classes={appliedClasses} />
      ) : (
        <p className="text-gray-500">Bạn đang chưa dạy lớp nào.</p>
      )}
    </div>
  );
}

export const DoneList: FC<{ classes: GSClass[]; studentID: string; phoneNumber: string }> = ({ classes, studentID, phoneNumber }) => {
  const userType = useRecoilValue(userCurrentState);
  const userAsTutor = useRecoilValue(tutorState(studentID));
  const userAsParent = useRecoilValue(parentState(phoneNumber));

  const doneClasses = userType.userCurrentType === 0
    ? classes.filter(classItem => (userAsParent?.Done || []).includes(classItem.ClassID.toString()))
    : classes.filter(classItem => (userAsTutor?.Done || []).includes(classItem.ClassID.toString()));

  return (
    <div className="grid grid-cols-1 px-4 py-2 gap-4 bg-gradient-to-b from-[#bbc7ff] to-[#2F529B]">
      {doneClasses.length > 0 ? (
        <TeachingGrid classes={doneClasses} />
      ) : (
        <p className="text-gray-500">Bạn chưa có lớp nào đã hoàn thành.</p>
      )}
    </div>
  );
}

export const ClassTypeTabs: FC<{ studentID: string, phoneNumber: string}> = ({ studentID, phoneNumber}) => { 
  const tabs = useRecoilValue(tabsState);
  const classes = useRecoilValue(classesState);

  return (
    <div>
      <Tabs
      scrollable
      defaultActiveKey="tab_1"
      className="category-tabs relative top-4"
      >
        <Tabs.Tab key="tab_1" label= "Lớp đang diễn ra">
          <TeachingList classes={classes} studentID={studentID} phoneNumber={phoneNumber} />
        </Tabs.Tab>
        <Tabs.Tab key="tab_2" label= "Lớp đang gửi yêu cầu">
          <ApplyingList classes={classes} studentID={studentID} phoneNumber={phoneNumber} />
        </Tabs.Tab>
        <Tabs.Tab key="tab_3" label= "Lớp đã kết thúc">
        <DoneList classes={classes} studentID={studentID} phoneNumber={phoneNumber} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};