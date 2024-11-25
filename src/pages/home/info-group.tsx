// src/components/ButtonGroup.tsx
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'zmp-ui';

export const MoreInfoGroup: FC=() => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around p-4">
      <Button
        className="rounded-full w-1/3 ml-2 bg-blue-500"
        onClick={() => navigate("/app-info")}
      >
        Thông tin ứng dụng
      </Button>
      <Button
        className="rounded-full w-1/3 ml-2 bg-blue-500"
        onClick={() => navigate("/app-standards")}
      >
        Tiêu chuẩn tìm lớp
      </Button>
      <Button
        className="rounded-full w-1/3 ml-2 bg-blue-500"
        onClick={() => navigate("/download-app")}
      >
        Cài ứng dụng về màn hình
      </Button>
    </div>
  );
};
