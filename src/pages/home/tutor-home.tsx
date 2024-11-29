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
      <div className="min-h-full bg-section">
        <div className="bg-background pt-2 w-3/4 mx-auto">
          <Banners />
        </div>
        <div className="p-4 w-full">
          <Button
            large
            primary
            className="w-full mb-4"
            onClick={() => navigate("/formStudent")}
          >
            <Icon icon="zi-plus-circle" className="inline-block mr-2" />
            Đăng kí làm gia sư
          </Button>
          <Button
            large
            primary
            className="w-full"
            onClick={() => navigate("/formParent")}
          >
            <Icon icon="zi-plus-circle" className="inline-block mr-2" />
            Tạo yêu cầu tìm gia sư
          </Button>
        </div>
        <div className="p-4">
          <MoreInfoGroup/>
        </div>
        <Box>
          <ClassTypeTabs classes={classes} studentID={studentID} phoneNumber={phoneNumber}/>
        </Box>
      </div>
    </Page>
  );
};

export default TutorHomePage;