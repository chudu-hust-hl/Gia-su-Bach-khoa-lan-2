// src/components/ButtonGroup.tsx
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/button';

export const MoreInfoGroup: FC=() => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around h-11">
    <Button
      className="w-1/3 bg-[#AD493A] border-r-white text-white text-sm rounded-none"
      onClick={() => navigate("/app-info")}
    >
      Thông tin
    </Button>
    <div className="w-px bg-white" />
    <Button
      className="w-1/3 !border-r-white bg-[#AD493A] text-white text-sm rounded-none"
      onClick={() => navigate("/app-standards")}
    >
      Tiêu chuẩn
    </Button>
    <div className="w-px bg-white" />
    <Button
      className="w-1/3 bg-[#AD493A] text-white text-sm rounded-none"
      onClick={() => navigate("/download-app")}
    >
      Cài đặt
    </Button>
  </div>
  );
};
