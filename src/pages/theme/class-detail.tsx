import { useRecoilValue } from "recoil";
import {useParams,useNavigate} from "react-router-dom";
import { classState } from "state";
import { ShareButton } from "./share-button";
import React, {FC} from "react";
import { Button, Header, Page } from "zmp-ui";
import toast from "react-hot-toast";

const ClassDetailPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classItem = useRecoilValue(classState(String(id)));

  if (!classItem) {
    return <div>Loading...</div>; // Handle loading state or if the classItem is not found
  }

  const handleApply = () => {
    // Implement the logic for applying to the class
    toast.success("Đã gửi yêu cầu ứng tuyển");
  };

  return (
    <Page>
    <Header title="Lớp đang tìm gia sư"/>
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4">
          <div className="py-2">
            <h1 className="text-2xl font-bold">
              Tìm gia sư môn {classItem?.Subjects}
            </h1>
          </div>
          <div className="text-xl font-medium text-primary">
            Lớp: {classItem.ValueClass}
          </div>
          <div className="text-sm mt-1">Địa chỉ: {classItem.AddressParent}</div>
          <div className="py-2">
            <ShareButton key={classItem.id} classItem={classItem} />
          </div>
        </div>
        {classItem.InfoMore && (
          <>
            <div className="bg-section h-2 w-full"></div>
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold">Mục tiêu học tập</h2>
              <p>{classItem.NameSupport}</p>
            </div>
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold">Thông tin bổ sung</h2>
              <p>{classItem.InfoMore}</p>
            </div>
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold">Hình thức học tập</h2>
              <p>{classItem.FormTeach}</p>
            </div>
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold">Học phí</h2>
              <p>{classItem.Money}</p>
            </div>
          </>
        )}
        <div className="bg-section h-2 w-full"></div>
        <div className="font-medium py-2 px-4">
          <div className="pt-2 pb-2.5">Các lớp tương tự</div>
          {/* You can add a component for related classes here */}
        </div>
      </div>

      <div className="flex-none grid grid-cols-2 gap-2 py-3 px-4">
        <Button
          onClick={handleApply}
        >
          Ứng tuyển
        </Button>
        <Button
          onClick={() => navigate("/message")} // Assuming you have a messaging page
        >
          Nhắn tin
        </Button>
      </div>
    </div>
    </Page>
  );
};

export default ClassDetailPage;