import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { classState, tutorState } from "state";
import Collapse from "components/collapse";
import { useState, useEffect } from "react";
import { classApi } from "api/class";
import { Box, Button, Header, Input, Page, Select } from "zmp-ui";
import { openPhone } from "zmp-sdk/apis";
import React, { FC } from "react";

const {Option} = Select;

const ParentTeachingDetailPage: FC = () => {
  const { id } = useParams();
  const classItem = useRecoilValue(classState(String(id)))!;
  const tutorItem = useRecoilValue(tutorState(classItem.StudentID))!;

  const [feedback, setFeedback] = useState<string>("");
  const [schedule, setSchedule] = useState<{ date: string; note: string }[]>([]);

  const [comments, setComments] = useState<{ date: string; note: string }[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7));


  // Generate a list of months for the last year, this year, and next year
  const generateMonths = () => {
    const months: string[] = [];
    const currentDate = new Date();
    for (let yearOffset = -1; yearOffset <= 1; yearOffset++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(currentDate.getFullYear() + yearOffset, month, 1);
        months.push(date.toISOString().slice(0, 7)); // Format: "yyyy-mm"
      }
    }
    return months;
  };

  const months = generateMonths();

  // Fetch comments for the selected month
  const fetchComments = async () => {
    try {
      const result = await classApi.getStudentDailyComment(
        classItem.PhoneParent, // Assuming PhoneParent is required
        selectedMonth,
        classItem.ClassID
      );

      if (result.RespCode === 0) {
        // Transform the LessonList into the format expected by the comments state
        const transformedComments = result.LessonList.map(lesson => ({
          date: lesson.Date,
          note: lesson.Comment
        }));
        setComments(transformedComments);
      } else {
        console.error("Error fetching comments:", result.RespText);
      }
    } catch (error) {
      console.error("Error in fetchComments:", error);
    }
  };

  // Fetch comments when the component mounts or the selected month changes
  useEffect(() => {
    fetchComments();
  }, [selectedMonth]);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

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
                    <p><b>Thành tích:</b> {tutorItem.Achievement}</p>
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
          <Input
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập nhận xét"
          />
        </div>

        {/* Schedule Section */}
        <Box>
        <Select
          name="Month"
          placeholder="Chọn tháng"
          value={selectedMonth}
          onChange={handleMonthChange}
          defaultValue={new Date().toISOString().slice(0, 7)} // Default to current month
          className="input-field"
          closeOnSelect
        >
          {months.map((month) => (
            <Option
              key={month}
              value={month}
              title={month}
            />
          ))}
        </Select>

          {/* Comments Section */}
          <div className="comments-section">
            {comments.map(comment => (
              <div key={comment.date} className="comment-item">
                <p><b>Date:</b> {comment.date}</p>
                <p><b>Comment:</b> {comment.note}</p>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </Page>
  );
};

export default ParentTeachingDetailPage;
