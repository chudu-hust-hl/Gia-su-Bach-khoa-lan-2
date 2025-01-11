import { useRecoilValue } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import { classState, userCurrentState } from "state";
import { ShareButton } from "./share-button";
import React, { FC, useEffect, useState } from "react";
import { Button, Header, Page, Box } from "zmp-ui";
import toast from "react-hot-toast";
import { studentApi } from "api/student";
import { getStudentID } from "utils/auth";
import { GSStudentBasicInfo } from "types";

// Modal Component to Display Student Info
const StudentInfoModal: FC<{ student: GSStudentBasicInfo; onClose: () => void }> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-4 rounded-lg shadow-md w-4/5">
        <h2 className="text-lg mb-2">Thông tin gia sư</h2>
        <div className="space-y-2">
          <p><strong>Họ và Tên:</strong> {student.StudentName}</p>
          <p><strong>Số điện thoại:</strong> {student.Phone}</p>
          <p><strong>Địa chỉ:</strong> {student.Address}</p>
          <p><strong>Kinh nghiệm:</strong> {student.Experience}</p>
          <p><strong>Thành tích:</strong> {student.Achievement}</p>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="bg-gray text-white">
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

const ClassDetailPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classItem = useRecoilValue(classState(String(id)));
  const studentID = getStudentID();
  const userType = useRecoilValue(userCurrentState);
  const [studentApplyList, setStudentApplyList] = useState<GSStudentBasicInfo[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<GSStudentBasicInfo | null>(null);

  // Fetch Student Apply List
  useEffect(() => {
    if (userType.userCurrentType === 0 && id) {
      studentApi.getStudentApplyList(id)
        .then((result) => {
          if (result.RespCode === 0) {
            setStudentApplyList(result.StudentList);
          } else {
            toast.error("Lỗi khi tải danh sách ứng tuyển");
          }
        })
        .catch((error) => {
          console.error("Error fetching student apply list:", error);
          toast.error("Có lỗi xảy ra khi tải danh sách ứng tuyển");
        });
    }
  }, [id, userType]);

  if (!classItem) {
    return <Box>Loading...</Box>;
  }

  const handleApply = async () => {
    try {
      if (studentID) {
        await studentApi.studentApplyClass(studentID, String(id));
          toast.success("Đăng ký lớp học thành công!");
        }
      } catch (error) {
        console.error("Error applying for class:", error);
        toast.error("Có lỗi xảy ra khi đăng ký lớp học");
      }
    };

  const handleStudentClick = (student: GSStudentBasicInfo) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  return (
    <Page className="flex flex-col h-screen">
      <Header title="Lớp đang tìm gia sư" />
      <Box className="flex-1 overflow-y-auto">
        <Box className="w-full px-4">
          <Box className="py-2">
            <h1 className="text-2xl font-bold">
              Tìm gia sư môn {classItem?.Subjects}
            </h1>
          </Box>
          <Box className="text-xl font-medium text-primary">
            Lớp: {classItem.ValueClass}
          </Box>
          <Box className="text-sm mt-1">Địa chỉ: {classItem.AddressParent}</Box>
          <Box className="py-2">
            <ShareButton key={classItem.ClassID} classItem={classItem} />
          </Box>
          <Box>
            <h2 className="text-lg font-semibold">Danh sách gia sư đã đăng ký</h2>
            {userType.userCurrentType === 0 ? (
              studentApplyList.length > 0 ? (
                <ul>
                  {studentApplyList.map((student) => (
                    <li key={student.StudentID}>
                      <Button
                        onClick={() => handleStudentClick(student)}
                        className="text-base text-gray-600 hover:text-gray-900 pl-4"
                        style={{ backgroundColor: 'transparent', border: 'none', padding: 0, color: "black", fontWeight: 'normal' }}
                      >
                        {student.StudentName}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Chưa có sinh viên đăng kí lớp</p>
              )
            ) : (
              <p>Bạn không có quyền được xem danh sách sinh viên đăng ký</p>
            )}
          </Box>

      {selectedStudent && (
        <StudentInfoModal student={selectedStudent} onClose={closeModal} />
      )}
        </Box>
        {classItem.InfoMore && (
          <>
            <Box className="bg-section h-2 w-full"></Box>
            <Box className="px-4 py-2">
              <h2 className="text-lg font-semibold">Mục tiêu học tập</h2>
              <p>{classItem.NameSupports}</p>
            </Box>
            <Box className="px-4 py-2">
              <h2 className="text-lg font-semibold">Thông tin bổ sung</h2>
              <p>{classItem.InfoMore}</p>
            </Box>
            <Box className="px-4 py-2">
              <h2 className="text-lg font-semibold">Hình thức học tập</h2>
              <p>{classItem.FormTeach}</p>
            </Box>
            <Box className="px-4 py-2">
              <h2 className="text-lg font-semibold">Học phí</h2>
              <p>{classItem.Money}</p>
            </Box>
          </>
        )}
      </Box>

      <Box className={`bg-white flex-none grid ${userType.userCurrentType === 0 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 py-3 px-4`}>
        {userType.userCurrentType !== 0 && (
          <Button onClick={handleApply}>
            Ứng tuyển
          </Button>
        )}
        <Button onClick={() => navigate("/message")}>
          Nhắn tin
        </Button>
      </Box>
    </Page>
  );
};

export default ClassDetailPage;