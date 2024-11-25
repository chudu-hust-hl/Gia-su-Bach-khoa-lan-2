import { Header, Page } from "zmp-ui";
import React, {FC} from "react";


const DownloadAppPage: FC = () => {
  return (
    <Page>
      <Header title="Cài ứng dụng về màn hình"/>
      <div className="px-4">
      <p>Instructions on how to install the app on the home screen...</p>
      </div>
    </Page>
    );
}

export default DownloadAppPage