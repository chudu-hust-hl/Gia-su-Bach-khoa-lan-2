// src/pages/your-class/parent-teaching-detail.tsx
import { useParams } from "react-router-dom";
import {  useRecoilValue } from "recoil";
import { classState, tutorState } from "state";
import Collapse from "components/collapse"; // Assuming you have a Collapse component
import { useState } from "react";
import { Box, Button, Header, Input, Page } from "zmp-ui"; // Import Button and Input from zmp-ui
import { openPhone } from "zmp-sdk/apis"; // Import the openPhone function
import React, {FC} from "react";

const ParentTeachingDetailPage: FC = () => {
  const { id } = useParams();
  const classItem =  useRecoilValue(classState(String(id)))!;
  const tutorItem =  useRecoilValue(tutorState(classItem.StudentID))!; // Assuming StudentID is the ID for the tutor

  const [feedback, setFeedback] = useState<string>(''); // State to hold the feedback input
  const [schedule, setSchedule] = useState<{ date: string; note: string }[]>([]); // State to hold the notes

  const handlePhoneClick = (phoneNumber: string) => {
    openPhone({
      phoneNumber,
      success: () => {
        // Handle success
      },
      fail: (error) => {
        // Handle failure
        console.log(error);
      },
    });
  };

  return (
    <Page>
      <Header title="Danh sách lớp " backgroundColor="red"/>
      <div className="w-full h-full flex flex-col p-4">
        {/* Class Information Section */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Thông tin lớp học</h1>
          <div className="text-lg">Môn học: {classItem.Subjects}</div>
          <div className="text-lg">Lớp: {classItem.ValueClass}</div>
          <Collapse
            items={[
              {
                title: "Thông tin chi tiết",
                content: (
                  <div>
                    <p>Mục tiêu học tập: {classItem.NameSupports}</p>
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
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Thông tin gia sư</h2>
          <div className="text-lg">Tên gia sư: {tutorItem.StudentName}</div>
          <div className="text-lg" onClick={() => handlePhoneClick(tutorItem.Phone)}>SĐT Gia sư: {tutorItem.Phone}</div>
          <Collapse
            items={[
              {
                title: "Thông tin chi tiết",
                content: (
                  <div>
                    <p>Thành tích: {tutorItem.Achivement}</p>
                    <p>Kinh nghiệm: {tutorItem.Experience}</p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Feedback Section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Nhận xét chung về gia sư</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-24 border border-gray-300 rounded p-2"
            placeholder="Nhập nhận xét"
          />
        </div>

        {/* Schedule Section */}
        <Box className="mt-4 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Lịch học</h2>
          <div className="mt-2">
            <h3 className="font-medium">Ghi chú cho các ngày:</h3>
            {schedule.length > 0 ? (
              <ul>
                {schedule.map((item, index) => (
                  <li key={index}>
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