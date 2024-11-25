import { Header, Page } from "zmp-ui";
import React, {FC} from "react";

const AppInfoPage: FC = () => {
  return (
    <Page>
      <Header title="Thông tin ứng dụng"/>
      <div className="px-4">
        <p>Details about the application...</p>
      </div>
    </Page>
    );
};

export default AppInfoPage;