import { GSClass } from "types";
import React ,{ FC} from "react";
import { Box } from "zmp-ui";
import TransitionLink from "./transition-link";

export const TeachingItem: FC<{propClass: GSClass}> = ({propClass}) => {
  return (
    <TransitionLink
      className="flex flex-col cursor-pointer group bg-white p-4 rounded-lg shadow-md"
      to={`/teaching-detail/${propClass.ClassID}`}
    >
      <div className="text-lg font-semibold mb-2">
        Bạn đang có lớp gia sư {propClass.Subjects}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Môn học: {propClass.Subjects}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Lớp: {propClass.ValueClass}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Học phí: {propClass.Money}
      </div>
      <div className="text-sm text-gray-600">
        Địa chỉ: {propClass.AddressParent}
      </div>
    </TransitionLink>
  );
}

export const TeachingGrid : FC<{classes: GSClass[]}> = ({classes}) => {
  return (
    <Box
      className={"grid grid-cols-1 px-4 py-2 gap-4 "}
    >
      {classes.map((classItem) => (
        <TeachingItem key={classItem.ClassID} propClass={classItem}/>
      ))}
    </Box>
  );
}
