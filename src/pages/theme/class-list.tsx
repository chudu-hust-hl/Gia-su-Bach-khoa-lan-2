import React, {FC} from "react";
import {  useRecoilValue } from "recoil";
import { 
  classesState, 
  selectedDistrictsState, 
  selectedLevelsState,
  selectedFormTeachState,
  selectedSubjectsState,
  loadingState} from "state";
import { ClassGrid } from "components/class-grid";
import ClassFilter from "./class-filter";
import { Header, Page } from "zmp-ui";
import { TextSkeleton } from "components/skeletons";

const mapValueClassToLevel = (ValueClass: string) => {
  const classNum = parseInt(ValueClass.replace(/\D/g, ''));
  if (classNum >= 1 && classNum <= 5) return "Tiểu học";
  if (classNum >= 6 && classNum <= 9) return "THCS";
  if (classNum >= 10 && classNum <= 12) return "THPT";
  return "Đại học";
};

const ClassListPage: FC = () => {
  const classes =  useRecoilValue(classesState);
  // const isLoading = useRecoilValue(loadingState);
  const selectedDistricts =  useRecoilValue(selectedDistrictsState);
  const selectedLevels =  useRecoilValue(selectedLevelsState);
  const selectedSubjects =  useRecoilValue(selectedSubjectsState);
  const selectedFormTeach =  useRecoilValue(selectedFormTeachState);

  // Filter classes to show only those matching the selected subject
  const filteredClasses = classes.filter((classItem) => {
    //const subjectMatch = id ? classItem.subject.id === Number(id) : true;
    const districtMatch = selectedDistricts.length === 0 || 
      selectedDistricts.some(district => 
        district === classItem.District || 
        (district === "Khác" && classItem.District !== "Thành phố Hà Nội")
      );

    const levelMatch = selectedLevels.length === 0 || 
    selectedLevels.includes(mapValueClassToLevel(classItem.ValueClass));
  
    const formTeachMatch = selectedFormTeach.length === 0 || 
    selectedFormTeach.some(form => 
      classItem.FormTeach === form || 
      (classItem.FormTeach === "Cả 2") // Include classes that are "Cả 2" for both filters
    );  
    return  districtMatch  && levelMatch  && formTeachMatch;
  });

  // if (isLoading) {
  //   return (
  //     <Page className='bg-gradient-to-b from-[#bbc7ff] to-[#2F529B]'>
  //       <div className="sticky top-0 bg-white z-10">
  //         <Header title="Danh sách lớp mới" showBackIcon={false} />
  //         <ClassFilter />
  //       </div>
  //       <div className="pt-5">
  //         <TextSkeleton>Loading...</TextSkeleton>
  //       </div>
  //     </Page>
  //   );
  // }

  return (
    <Page className='bg-gradient-to-b from-[#bbc7ff] to-[#2F529B]'>
      <div className="sticky top-0 bg-white z-10">
      <Header title="Danh sách lớp mới" showBackIcon={false}/>
       {/* Fixed positioning */}
        <ClassFilter />
      </div>
      <div className="pt-5"> {/* Add padding to prevent overlap */}
        <ClassGrid classes={filteredClasses}/>
      </div>
    </Page>
  );
};

export default ClassListPage;
