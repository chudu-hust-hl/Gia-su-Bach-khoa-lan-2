import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { classState, tutorState } from "state";
import Collapse from "components/collapse";
import { useState } from "react";
import { Box, Button, Header, Input, Page } from "zmp-ui";
import { openPhone } from "zmp-sdk/apis";
import React, { FC } from "react";

const ParentTeachingDetailPage: FC = () => {
  const { id } = useParams();
  const classItem = useRecoilValue(classState(String(id)))!;
  const tutorItem = useRecoilValue(tutorState(classItem.StudentID))!;

  const [feedback, setFeedback] = useState<string>("");
  const [schedule, setSchedule] = useState<{ date: string; note: string }[]>([]);

  const handlePhoneClick = (phoneNumber: string) => {
    openPhone({
      phoneNumber,
      success: () => {
        // Handle success
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Page>
      <Header title="Danh sách lớp " />
      <div className="w-full h-full flex flex-col p-4 text-[#050C33] bg-gradient-to-b from-[#e0e8ff] to-[#c0caff]">
        {/* Class Information Section */}
        <div className="relative my-8 bg-white p-4 shadow-lg rounded-lg transition-all hover:shadow-xl">
          <h1 className="absolute top-[-25px] left-[10vh] text-xl font-semibold text-center border text-white rounded-lg bg-[#39437c] w-[50vw] p-1">
            Thông tin lớp học
          </h1>
          <hr className="my-2" />
          <div className="text-lg mb-2">
            <b>Môn học:</b> {classItem.Subjects}
          </div>
          <div className="text-lg mb-2">
            <b>Lớp:</b> {classItem.ValueClass}
          </div>
          <Collapse
            items={[
              {
                title: "Thông tin chi tiết",
                content: (
                  <div className="animate-fadeIn">
                    <p>Mục tiêu học tập: {classItem.NameSupport}</p>
                    <p>Thông tin bổ sung: {classItem.InfoMore}</p>
                    <p>Học phí: {classItem.Money}</p>
                    <p>Địa chỉ: {classItem.AddressParent}</p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Tutor Information Section */}
        <div className="relative mb-4 bg-white shadow-lg rounded-lg p-4 transition-all hover:shadow-xl">
          <h2 className="absolute top-[-25px] left-[10vh] text-xl font-semibold text-center border text-white rounded-lg bg-[#39437c] w-[50vw] p-1">
            Thông tin gia sư
          </h2>
          <hr className="my-2" />
          <div className="text-lg mb-2">
            <b>Họ và tên:</b> {tutorItem.StudentName}
          </div>
          <div
            className="text-lg mb-2 cursor-pointer text-blue-600 hover:underline"
            onClick={() => handlePhoneClick(tutorItem.Phone)}
          >
            <b>SĐT:</b> {tutorItem.Phone}
          </div>
          <Collapse
            items={[
              {
                title: "Thông tin chi tiết",
                content: (
                  <div className="animate-fadeIn rounded-md border-[#D9D9D9] border-[2px] p-2">
                    <p><b>Trường:</b> {tutorItem.SelectSchool}</p>
                    <p><b>Chuyên ngành:</b> {tutorItem.Subjects}</p>
                    <p><b>Thành tích:</b> {tutorItem.Achivement}</p>
                    <p><b>Kinh nghiệm:</b> {tutorItem.Experience}</p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Feedback Section */}
        <div className="mb-4 bg-white p-4 shadow-lg rounded-lg transition-all hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-2">Nhận xét chung về gia sư</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập nhận xét"
          />
        </div>

        {/* Schedule Section */}
        <Box className="p-4 border rounded shadow bg-white transition-all hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-2">Lịch học</h2>
          <div className="mt-2">
            <h3 className="font-medium">Ghi chú cho các ngày:</h3>
            {schedule.length > 0 ? (
              <ul>
                {schedule.map((item, index) => (
                  <li key={index} className="text-gray-800">
                    {item.date}: {item.note}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Bạn chưa thêm ghi chú nào.</p>
            )}
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default ParentTeachingDetailPage;
