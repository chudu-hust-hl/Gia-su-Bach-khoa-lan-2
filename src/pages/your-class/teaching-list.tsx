// src/pages/your-class/teaching-list.tsx
import TeachingItem from "./teaching-item";
import {  useRecoilValue } from "recoil";
import { classesState, userState } from "@/state"; // Assuming this state contains all classes
import TeachingGrid from "@/components/teaching-grid";
import { useParams } from "react-router-dom";

export default function TeachingList() {
  const classes =  useRecoilValue(classesState); // Get the classes from the state
  const user =  useRecoilValue(userState);

  // Filter for classes that the tutor is teaching
  const teachingClasses = classes.filter(classItem => 
    user.Teaching.includes(classItem.id.toString())
  );

  return (
    <div className="grid grid-cols-1 px-4 py-2 gap-4">
      {teachingClasses && teachingClasses.length > 0 ? (
          <TeachingGrid classes={teachingClasses} className="pt-4 pb-[13px]" />
      ) : (
        <p className="text-gray-500">Bạn chưa dạy lớp nào.</p> // Message for no teaching classes
      )}
    </div>
  );
}