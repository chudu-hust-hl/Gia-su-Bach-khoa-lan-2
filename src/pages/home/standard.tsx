import { Header, Page, Box } from "zmp-ui";
import React, { FC } from "react";

const StandardInfoPage: FC = () => {
  return (
    <Page>
      <Header title="Tiêu chuẩn gia sư và học phí" />
      <Box className="px-4" title="Quy trình tìm kiếm gia sư">
        <p>
          Sau khi điền đơn tìm kiếm gia sư, người dùng sẽ đợi thông báo từ ứng dụng qua ZaloOA hoặc tự xem danh sách các bạn sinh viên ứng tuyển và chủ động yêu cầu chọn bạn sinh viên.
        </p>
      </Box>
      <Box className="px-4" title="Yêu cầu đối với sinh viên gia sư">
        <p>
          Các bạn sinh viên cần điền thông tin dưới dạng hồ sơ và mã số sinh viên chính xác để có thể truy xuất thông tin, các bạn bắt buộc phải điền thông tin và gửi trước khi nhận lớp.
        </p>
      </Box>
      <Box className="px-4" title="Tiêu chuẩn ứng tuyển">
        <p>
          Tùy theo năng lực và kết quả mong muốn của người học cũng như yêu cầu đặc biệt dành cho bạn gia sư mà gia sư khi muốn ứng tuyển phải đáp ứng một số yêu cầu như kinh nghiệm, thành tích,...
        </p>
      </Box>
      <Box className="px-4" title="Mức học phí">
        <p>
          Mức học phí trung bình:
        </p>
        <ul>
          <li>Tiểu học: 120k/ 2 giờ</li>
          <li>Lớp 6-8: 150k/ 2 giờ</li>
          <li>Lớp 9-11: 180k/ 2 giờ</li>
          <li>Lớp 12: 200k/ 2 giờ</li>
        </ul>
        <p>
          Phụ huynh và gia sư có thể trao đổi thêm về mức học phí trước khi nhận lớp tùy theo yêu cầu về thành tích và nội dung học.
        </p>
      </Box>
      <Box className="px-4" title="Phí đặt cọc">
        <p>
          Các bạn gia sư nhận lớp thành công sẽ phải trả phí đặt cọc bằng học phí một buổi học và có thể được hoàn trả nếu bạn giới thiệu cho dự án một phụ huynh hoặc học sinh khác.
        </p>
      </Box>
    </Page>
  );
};

export default StandardInfoPage;