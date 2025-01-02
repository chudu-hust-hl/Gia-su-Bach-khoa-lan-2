import { useRecoilValue } from "recoil";
import {useParams, useNavigate} from "react-router-dom";
import { tutorState } from "state"; // Import the tutor state
import { ShareButton } from "./share-button"; // Assuming you have a share button for tutors
import React, {FC} from "react";
import { Button, Header, Page } from "zmp-ui";
import toast from "react-hot-toast";

export default function TutorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tutorItem =  useRecoilValue(tutorState(String(id))); // Get the tutor using the ID from params

  if (!tutorItem) {
    return <div>Loading...</div>; // Handle loading state or if the classItem is not found
  }

  const handleApply = () => {
    // Implement the logic for applying to the tutor
    toast.success("Đã thêm gia sư vào danh sách yêu thích");
  };

  return (
    <Page className="flex flex-col h-screen">
      <Header title="Thông tin gia sư" />
        <div className="flex-1 overflow-y-auto">
          <div className="w-full px-4">
            <div className="py-2">
              <h1 className="text-2xl font-bold">
                Gia sư: {tutorItem.StudentName} {/* Display tutor's name */}
              </h1>
            </div>
            <div className="text-sm mt-1">Giới tính: {tutorItem.SexStudent}</div> {/* Display gender */}
            <div className="text-sm mt-1">Môn học: {tutorItem.Subjects}</div> {/* Display subjects */}
            <div className="text-sm mt-1">Hình thức dạy: {tutorItem.FormTeach}</div> {/* Display teaching method */}
            <div className="text-sm mt-1">Địa chỉ: {tutorItem.Address}</div> {/* Display address */}
            <div className="text-sm mt-1">Kinh nghiệm: {tutorItem.Experience}</div> {/* Display experience */}
            <div className="text-sm mt-1">Thành tích: {tutorItem.Achivement}</div> {/* Display achievements */}
            {/* Share button for the tutor have not been created*/}
          </div>
        </div>

      <div className="bg-white flex-none grid grid-cols-2 gap-2 py-3 px-4">
        <Button onClick={handleApply}>
          Ứng tuyển
        </Button>
        <Button onClick={() => navigate("/message")}>
          Nhắn tin
        </Button>
      </div>
    </Page>
  );
}