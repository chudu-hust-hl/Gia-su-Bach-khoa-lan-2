import { GSClass } from "types";
import React ,{ FC} from "react";
import { Box } from "zmp-ui";
import TransitionLink from "./transition-link";

export const ClassItem: FC<{propClass: GSClass}> = ({propClass}) => {
  return (
    <TransitionLink
      className="flex flex-col cursor-pointer group bg-white p-4 rounded-lg shadow-md"
      to={`/class/${propClass.ClassID}`}
    >
      <div className="text-lg font-bold mb-2 text-center border rounded-md bg-[#AD493A] text-white p-1">
        Tìm gia sư môn {propClass.Subjects} 
      </div>
      <hr className='my-1'/>
      <div className="text-sm text-gray-600 mb-1">
        Môn học: {propClass.Subjects}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Lớp: {propClass.ValueClass}
      </div>
      <div className="text-sm text-gray-600">
        Địa chỉ: {propClass.AddressParent}
      </div>
      <div className="text-sm text-gray-600">
        Yêu cầu: {propClass.InfoMore}
      </div>
    </TransitionLink>
  );
}

export const ClassGrid : FC<{classes: GSClass[]}> = ({classes}) => {
  return (
    <Box
      className={"grid grid-cols-1 px-4 py-2 gap-4 "}
    >
      {classes.map((classItem) => (
        <ClassItem key={classItem.ClassID} propClass={classItem}/>
      ))}
    </Box>
  );
}
