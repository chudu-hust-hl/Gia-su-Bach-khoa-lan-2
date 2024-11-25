import { Header, Page } from "zmp-ui";
import React, {FC} from "react";

const StandardInfoPage: FC = () => {
  return (
    <Page>
      <Header title="Tiêu chuẩn gia sư và học phí"/>
      <div className="px-4">
        <p>Information about tutor standards and fees...</p>
      </div>
    </Page>
    );
};

export default StandardInfoPage;