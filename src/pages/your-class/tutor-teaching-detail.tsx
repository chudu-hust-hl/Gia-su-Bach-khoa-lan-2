// src/pages/your-class/teaching-detail.tsx
import { useParams } from "react-router-dom";
import {  useRecoilValue } from "recoil";
import { classState } from "state";
import Collapse from "components/collapse"; // Assuming you have a Collapse component
import { useState } from "react";
import { Box, Button, Header, Input, Page, Calendar } from "zmp-ui"; // Import Button and Input from zmp-ui
import { DatePicker } from "zmp-ui"; // Import DatePicker from zmp-ui
import { openPhone } from "zmp-sdk/apis"; // Import the openPhone function
import React, {FC} from "react";

const TutorTeachingDetailPage:FC = () => {
  const { id } = useParams();
  const classItem =  useRecoilValue(classState(String(id)))!;
  const [schedule, setSchedule] = useState<{ date: string; note: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to hold the selected date
  const [note, setNote] = useState<string>(''); // State to hold the note input

  const handleAddSchedule = () => {
    if (selectedDate && note) {
      setSchedule((prev) => [...prev, { date: selectedDate, note }]);
      setSelectedDate(null); // Reset the selected date after adding to the schedule
      setNote(''); // Clear the note input after adding
    }
  };

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
    <Header title="Lớp bạn đang dạy" backgroundColor="#AD493A"/>
    <div className="w-full h-full flex flex-col p-4">
      {/* Class Information Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Thông tin lớp học</h1>
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
                  <p>Địa chỉ: {classItem.AddressParent}</p>
                </div>
              ),
            },
          ]}
        />
        <div className="text-lg">Tên phụ huynh: {classItem.NameParent}</div>
        <div className="text-lg" onClick={() => handlePhoneClick(classItem.PhoneParent)}>
          Số điện thoại phụ huynh: {classItem.PhoneParent}
        </div>        
        <div className="text-lg">Học phí: {classItem.Money}</div>
      </div>

      {/* Feedback Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Phản hồi</h2>
        <textarea
          className="w-full h-24 border border-gray-300 rounded p-2"
          placeholder="Nhập phản hồi của bạn..."
        />
      </div>

      {/* Schedule Section */}
      <Box className="mt-4 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold">Lịch học</h2>
        <Calendar
          fullscreen={false} // Không hiển thị toàn màn hình
          numberOfWeek={1}
          onSelect={(date, selectedDate) => {
            // `date` is a DateType. Convert it to a JavaScript Date object.
            const jsDate = new Date(date); // Ensure valid JS Date conversion
            if (!isNaN(jsDate.getTime())) {
              // Chuyển đổi ngày sang định dạng dd/mm/yyyy
              const formattedDate = jsDate.toLocaleDateString("en-GB");
              setSelectedDate(formattedDate);
            } else {
              console.error("Invalid date selected:", date);
            }
          }}
          dayOfWeekNameFormat="short" // Hiển thị tên thứ đầy đủ
        />

        {/* Input field for the note */}
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập ghi chú cho ngày này..."
          className="mt-2"
        />

        {/* Button from zmp-ui */}
        <Button
          className="mt-2"
          onClick={handleAddSchedule}
        >
          Thêm lịch
        </Button>

        <div className="mt-2">
          <h3 className="font-medium">Lịch đã thêm:</h3>
          {schedule.length > 0 ? (
            <ul>
              {schedule.map((item, index) => (
                <li key={index}>
                  {item.date}: {item.note}
                </li>
              ))}
            </ul>
            ) : (
            <p className="text-gray-500">Bạn chưa thêm lịch dạy nào.</p>
          )}
        </div>
      </Box>
    </div>
    </Page>
  );
};

export default TutorTeachingDetailPage;