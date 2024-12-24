// src/components/ButtonGroup.tsx
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/button';

export const MoreInfoGroup: FC=() => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around h-11">
      <Button
        className="w-1/3 bg-[#0056B3] border-r-white text-white rounded-none"
        onClick={() => navigate("/app-info")}
      >
        Thông tin
      </Button>
      <Button
        className="w-1/3 !border-r-white bg-[#0056B3] text-white rounded-none"
        onClick={() => navigate("/app-standards")}
      >
        Tiêu chuẩn
      </Button>
      <Button
        className="w-1/3 bg-[#0056B3] text-white rounded-none"
        onClick={() => navigate("/download-app")}
      >
        Cài đặt
      </Button>
    </div>
  );
};
