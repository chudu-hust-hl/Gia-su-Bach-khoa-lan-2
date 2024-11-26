// src/pages/your-class/applying-list.tsx
import {  useRecoilValue } from "recoil";
import { classesState, userState } from "@/state";
import ClassItem from "@/components/class-item";
import ClassGrid from "@/components/class-grid";

export default function ApplyingList() {
  const classes =  useRecoilValue(classesState); // Get the classes from the state
  const user =  useRecoilValue(userState);

  // Filter for classes that the tutor has applied to
  const appliedClasses = classes.filter(classItem => 
    user.Apply.includes(classItem.id.toString())
  );

  return (
    <div className="grid grid-cols-1 px-4 py-2 gap-4">
      {appliedClasses.length > 0 ? (
          <ClassGrid classes={appliedClasses} className="pt-4 pb-[13px]" />
      ) : (
        <p className="text-gray-500">Bạn chưa ứng tuyển vào lớp nào.</p> // Message for no applied classes
      )}
    </div>
  );
}