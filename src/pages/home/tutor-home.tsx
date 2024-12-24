import { useRecoilState, useRecoilValue } from "recoil";
import { userState, classesState, selectedTabIndexState } from "state";
import { TeachingList, ApplyingList, DoneList, ClassTypeTabs } from "components/class-type-tabs";
import { useNavigate } from "react-router-dom";
import { Banners } from "./banners";
import Button from "components/button";
import { Icon, Page, Box } from "zmp-ui";
import { MoreInfoGroup } from "./info-group";
import React, {FC} from "react";
import { Welcome } from "./welcome";

const TutorHomePage: FC = () => {
  const navigate = useNavigate();
  const [selectedTabIndex, setSelectedIndex] = useRecoilState(selectedTabIndexState);
  const classes = useRecoilValue(classesState); 
  const user = useRecoilValue (userState);
  const studentID = user.studentID;
  const phoneNumber = user.phoneNumber;

  return (
    <Page hideScrollbar={true}>
      <Welcome/>
      <div className="p-0">
          <MoreInfoGroup/>
      </div>
      <div className="min-h-full bg-section relative">
        <div className="bg-background w-full">
          <Banners />
        </div>
        <div className="absolute top-[25%] left-0 right-0 z-10 flex justify-center">
          <Button
            large
            primary
            className="inline-block w-[50%] max-w-[500px] rounded-none shadow-md !bg-[#FFA726] text-[#ffffff]"
            onClick={() => navigate("/formStudent")}
          >
            Đăng kí làm gia sư
          </Button>
          <Button
            large
            primary
            className="inline-block w-[50%] max-w-[500px] rounded-none shadow-md !bg-[#FFA726] text-[#ffffff]"
            onClick={() => navigate("/formParent")}
          >
            Yêu cầu tìm gia sư
          </Button>
        </div>
        <Box>
          <ClassTypeTabs classes={classes} studentID={studentID} phoneNumber={phoneNumber}/>
        </Box>
      </div>
    </Page>
  );
};

export default TutorHomePage;