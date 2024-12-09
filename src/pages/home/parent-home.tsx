import { useRecoilValue } from "recoil";
import { userState, classesState } from "state";
import { ClassTypeTabs } from "components/class-type-tabs";
import { useNavigate } from "react-router-dom";
import { Banners } from "./banners";
import Button from "components/button";
import { Box, Page } from "zmp-ui";
import { MoreInfoGroup } from "./info-group";
import React, { FC } from "react";
import { Welcome } from "./welcome";

const ParentHomePage: FC = () => {
  const navigate = useNavigate();
  const classes = useRecoilValue(classesState);
  const user = useRecoilValue(userState);
  const studentID = user.studentID;
  const phoneNumber = user.phoneNumber;

  return (
    <Page>
      {/* Phần chào mừng */}
      <Welcome />

      <div className="min-h-full bg-section relative">
        {/* Nhóm thông tin thêm */}
        <div className="p-0">
          <MoreInfoGroup />
        </div>

        {/* Phần banner */}
        <div className="bg-background w-full relative">
          <Banners />
          {/* Nút Tạo yêu cầu đè lên banner */}
          <div className="absolute top-[80%] left-0 right-0 z-10 flex justify-center">
            <Button
              large
              primary
              className="w-[85%] max-w-[500px] !rounded-[24px] shadow-md !bg-[#FFA726] text-[#ffffff]"
              onClick={() => navigate("/formParent")}
            >
              Tạo yêu cầu tìm gia sư
            </Button>
          </div>
        </div>

        {/* Tabs danh sách */}
        <div className="mt-6 px-4">
          <Box>
            <ClassTypeTabs
              classes={classes}
              studentID={studentID}
              phoneNumber={phoneNumber}
            />
          </Box>
        </div>
      </div>
    </Page>
  );
};

export default ParentHomePage;
