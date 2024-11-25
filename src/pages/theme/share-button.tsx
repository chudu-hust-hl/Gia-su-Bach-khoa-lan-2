import { ChevronRight, ShareDecor } from "components/vectors";
import { GSClass } from "types"; // Assuming you have a Class type defined
import React, {FC} from "react";
import { openShareSheet } from "zmp-sdk";

export const ShareButton: FC<{classItem: GSClass}> =({classItem}) => {
  const share = () => {
    openShareSheet({
      type: "zmp_deep_link",
      data: {
        title: `Tìm gia sư môn ${classItem.Subjects}`,
        thumbnail: classItem.Subjects, // Assuming classItem has an image property
        path: `/class/${classItem.id}`, // Adjust the path to match your routing
      },
    });
  };

  return (
    <button
      className="relative p-4 w-full flex space-x-1 bg-[#016BD9] rounded-lg text-white text-sm font-medium cursor-pointer"
      onClick={share}
    >
      <div>Chia sẻ ngay cho bạn bè</div>
      <ChevronRight />
      <div className="absolute right-5 top-[11px]">
        <ShareDecor />
      </div>
    </button>
  );
}