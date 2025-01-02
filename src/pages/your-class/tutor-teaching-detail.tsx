// src/pages/your-class/teaching-detail.tsx
import { useParams } from "react-router-dom";
import {  useRecoilValue } from "recoil";
import { classState } from "state";
import Collapse from "components/collapse"; // Assuming you have a Collapse component
import { classApi } from "api/class";
import { Box, Button, Header, Input, Page, Calendar, Select } from "zmp-ui";
import { openPhone } from "zmp-sdk/apis"; // Import the openPhone function
import React, {FC, useEffect, useState} from "react";
import { getStudentID } from "utils/auth";

const TutorTeachingDetailPage:FC = () => {
  const { id } = useParams();
  const classItem =  useRecoilValue(classState(String(id)))!;
  const [schedule, setSchedule] = useState<{ date: string; note: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to hold the selected date
  const [note, setNote] = useState<string>(''); // State to hold the note input
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // Default to current month

  // Generate a list of months for the Select component
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    return date.toISOString().slice(0, 7); // Format: "yyyy-mm"
  });

  const fetchScheduleData = async () => {
    try {
      const result = await classApi.getStudentDailyComment(
        classItem.PhoneParent, // Assuming PhoneParent is required
        selectedMonth,
        classItem.ClassID
      );

      if (result.RespCode === 0) {
        // Transform the LessonList into the format expected by the schedule state
        const transformedSchedule = result.LessonList.map(lesson => ({
          date: lesson.Date,
          note: lesson.Comment
        }));
        setSchedule(transformedSchedule);
      } else {
        console.error("Error fetching schedule data:", result.RespText);
      }
    } catch (error) {
      console.error("Error in fetchScheduleData:", error);
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value);
  };

  // Fetch schedule data when the component mounts or the selected month changes
  useEffect(() => {
    fetchScheduleData();
  }, [selectedMonth]);


  const handleAddSchedule = async () => {
    if (selectedDate && note) {
      try {
        // Assuming you have access to the StudentID and ClassID
        const StudentID = getStudentID() || "20226030"; // Replace with actual StudentID
        const ClassID = classItem.ClassID; // Use the ClassID from the classItem
  
        // Call the API to create a daily comment
        const result = await classApi.createStudentDailyComment(
          StudentID,
          ClassID,
          selectedDate,
          note
        );
  
        // Check if the API call was successful
        if (result.RespCode === 0) {
          // Add the schedule to the local state
          setSchedule((prev) => [...prev, { date: selectedDate, note }]);
          setSelectedDate(null); // Reset the selected date
          setNote(''); // Clear the note input
        } else {
          console.error("Error creating daily comment:", result.RespText);
        }
      } catch (error) {
        console.error("Error in handleAddSchedule:", error);
      }
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
          //numberOfWeek={1}
          onSelect={(date, selectedDate) => {
            // `date` is a DateType. Convert it to a JavaScript Date object.
            const jsDate = new Date(date); // Ensure valid JS Date conversion
            if (!isNaN(jsDate.getTime())) {
              // Chuyển đổi ngày sang định dạng dd/mm/yyyy
              const formattedDate = jsDate.toLocaleDateString("en-GB");
              setSelectedDate(formattedDate);

              // Extract the month in "yyyy-mm" format and update the selectedMonth state
              const year = jsDate.getFullYear();
              const month = String(jsDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
              const monthString = `${year}-${month}`;
              setSelectedMonth(monthString);
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

        <Box className="mb-4">
          <h3 className="font-medium">Lịch đã thêm:</h3>
          {schedule.length > 0 ? (
            <ul>
              {schedule.map((item, index) => {
                // Convert the date from "yyyy-mm-dd" to "dd-mm-yyyy"
                const [year, month, day] = item.date.split('-');
                const outputDate = `${day}-${month}-${year}`;

                return (
                  <li key={index}>
                    <span className="font-semibold">{outputDate}:</span> {item.note}
                  </li>
                );
              })}
            </ul>
            ) : (
            <p className="text-gray-500">Bạn chưa thêm lịch dạy nào.</p>
          )}
        </Box>
      </Box>
    </div>
    </Page>
  );
};

export default TutorTeachingDetailPage;