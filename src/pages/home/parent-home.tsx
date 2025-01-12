import { useRecoilValue } from "recoil";
import { userState, classesState } from "state";
import { ClassTypeTabs } from "components/class-type-tabs";
import { useNavigate } from "react-router-dom";
import { Banners } from "./banners";
import Button from "components/button";
import { Icon, Box, Page } from "zmp-ui";
import { MoreInfoGroup } from "./info-group";
import React, { FC } from "react";
import { Welcome } from "./welcome";

const ParentHomePage: FC = () => {
  const navigate = useNavigate();
  const classes = useRecoilValue(classesState);
  const user = useRecoilValue(userState);
  const studentID = user.StudentID;
  const phoneNumber = user.PhoneNumber;

  return (
    <Page hideScrollbar={true}>
      <Welcome/>
      <div className="min-h-full bg-section relative">
        <div className="bg-background pt-2 w-3/4 mx-auto">
          <Banners />
        </div>
        <div className="p-4 w-full">
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

export default ParentHomePage;
