import { tabsState, tutorState, parentState, userCurrentState } from "state";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { FC } from "react";
import {Tabs} from "zmp-ui";
import { ClassGrid } from "components/class-grid";
import { GSClass } from "types";
import { TeachingGrid } from "components/teaching-grid";

interface ClassTypeTabsProps {
  selectedIndex: number;
  onChange: (index: number) => void;
}

export const ApplyingList: FC<{ classes: GSClass[]; studentID: string; phoneNumber: string }> = ({ classes, studentID, phoneNumber }) => {
  const userType = useRecoilValue(userCurrentState);
  const userAsTutor = useRecoilValue(tutorState(studentID));
  const userAsParent = useRecoilValue(parentState(phoneNumber));

  const appliedClasses = userType.userCurrentType === 0
    ? classes.filter(classItem => userAsParent?.Apply.includes(classItem.id.toString()))
    : classes.filter(classItem => userAsTutor?.Apply.includes(classItem.id.toString()));

    console.log(phoneNumber, "nguoi dung")
    console.log(userAsTutor?.Apply)

  return (
    <div className="grid grid-cols-1 px-4 py-2 gap-4">
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
    ? classes.filter(classItem => userAsParent?.Teaching.includes(classItem.id.toString()))
    : classes.filter(classItem => userAsTutor?.Teaching.includes(classItem.id.toString()));

  console.log(phoneNumber, "nguoi dung")
  console.log(userAsParent, "Dang day")

  return (
    <div className="grid grid-cols-1 px-4 py-2 gap-4">
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

  const appliedClasses = userType.userCurrentType === 0
    ? classes.filter(classItem => userAsParent?.Done.includes(classItem.id.toString()))
    : classes.filter(classItem => userAsTutor?.Done.includes(classItem.id.toString()));

  return (
    <div className="grid grid-cols-1 px-4 py-2 gap-4">
      {appliedClasses.length > 0 ? (
        <TeachingGrid classes={appliedClasses} />
      ) : (
        <p className="text-gray-500">Bạn chưa có lớp nào đã hoàn thành.</p>
      )}
    </div>
  );
}

export const ClassTypeTabs: FC<{classes: GSClass[], studentID: string, phoneNumber: string}> = ({classes, studentID, phoneNumber}) => { 
  const tabs = useRecoilValue(tabsState);

  return (
    <Tabs
    scrollable
    defaultActiveKey="tab_1"
    className="category-tabs"
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
  );
};