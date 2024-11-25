import { useNavigate } from "react-router-dom";
import { Page, Icon } from "zmp-ui";
import React, {FC} from "react";
import Button from "components/button";
import { MoreInfoGroup } from "./info-group";
import { Banners } from "./banners";
import { Welcome } from "./welcome";


const TutorHomePage: FC = () => {
  const navigate = useNavigate();
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
      </div>
    </Page>
  );
};

export default TutorHomePage;