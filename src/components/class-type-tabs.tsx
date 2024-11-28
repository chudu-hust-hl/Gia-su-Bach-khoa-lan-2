import { tabsState, tutorState, userCurrentState } from "state";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { FC } from "react";
import Tabs from "components/tabs";
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
  const userAsParent = useRecoilValue(tutorState(phoneNumber));

  const appliedClasses = userType.userCurrentType === 0
    ? classes.filter(classItem => userAsParent?.Apply.includes(classItem.id.toString()))
    : classes.filter(classItem => userAsTutor?.Apply.includes(classItem.id.toString()));

    console.log(studentID, "nguoi dung")
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
  const userAsParent = useRecoilValue(tutorState(phoneNumber));

  const appliedClasses = userType.userCurrentType === 0
    ? classes.filter(classItem => userAsParent?.Teaching.includes(classItem.id.toString()))
    : classes.filter(classItem => userAsTutor?.Teaching.includes(classItem.id.toString()));

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
  const userAsParent = useRecoilValue(tutorState(phoneNumber));

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

export const ClassTypeTabs: FC<ClassTypeTabsProps> = ({ selectedIndex, onChange }) => {
  const tabs = useRecoilValue(tabsState);

  return (
    <Tabs
      items={tabs}
      value={tabs[selectedIndex]}
      onChange={(tab) => onChange(tabs.indexOf(tab))}
      renderLabel={(item) => item}
    />
  );
};