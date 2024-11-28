import { useRecoilState, useRecoilValue } from "recoil";
import React, { FC } from "react";
import { userState, classesState, selectedTabIndexState } from "state";
import { Header, Page } from "zmp-ui";
import { TeachingList, ApplyingList, DoneList, ClassTypeTabs } from "components/class-type-tabs";


const YourClassPage: FC = () => {
  const [selectedTabIndex, setSelectedIndex] = useRecoilState(selectedTabIndexState);
  const classes = useRecoilValue(classesState); 
  const user = useRecoilValue (userState);
  const studentID = user.studentID;
  const phoneNumber = user.phoneNumber;

  const renderList = () => {
    switch (selectedTabIndex) {
      case 0: // "Đang diễn ra"
        return <TeachingList classes={classes} studentID={studentID} phoneNumber={phoneNumber} />;
      case 1: // "Đang yêu cầu"
        return <ApplyingList classes={classes} studentID={studentID} phoneNumber={phoneNumber} />;
      case 2: // "Đã hoàn thành"
        return <DoneList classes={classes} studentID={studentID} phoneNumber={phoneNumber} />;
      default:
        return null;
    }
  };

  return (
    <Page>
      <Header title="Danh sách lớp" />
      <div>
        <ClassTypeTabs selectedIndex={selectedTabIndex} onChange={setSelectedIndex} />
        {renderList()}
      </div>
    </Page>
  );
};

export default YourClassPage;