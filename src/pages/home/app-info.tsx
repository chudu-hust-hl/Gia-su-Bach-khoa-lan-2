import { Header, Page, Box } from "zmp-ui";
import React, { FC } from "react";

const AppInfoPage: FC = () => {
  return (
    <Page>
      <Header title="Thông tin ứng dụng" />
      <Box className="px-4" title="Giới thiệu ứng dụng">
        <p>
          Đây là ứng dụng được phát triển bởi đội ngũ iCTSV trực thuộc Ban Công tác Sinh viên Đại học Bách khoa Hà Nội.
        </p>
      </Box>
      <Box className="px-4" title="Mục đích ứng dụng">
        <p>
          Ứng dụng được xây dựng với mục đích hỗ trợ các bạn sinh viên tìm kiếm việc làm thêm gia sư và giúp học sinh cùng những vị phụ huynh có nhu cầu tìm kiếm người kèm cặp cho con em mình.
        </p>
      </Box>
      <Box className="px-4" title="Định danh">
        <p>
          Các sinh viên được theo dõi và cập nhận nhận xét từ chính hệ thống thông tin của Đại học và mỗi phụ huynh hoặc học sinh tìm kiếm lớp học sẽ được định danh theo số điện thoại để đề phòng các vấn đề liên quan.
        </p>
      </Box>
      <Box className="px-4" title="Thông tin liên hệ">
        <p>
          Thông tin chi tiết vui lòng mời các bạn theo dõi ZaloOA của dự án.
        </p>
        <p>
          Địa chỉ trực tiếp của dự án: C1-106 Đại học Bách khoa Hà Nội
        </p>
      </Box>
    </Page>
  );
};

export default AppInfoPage;