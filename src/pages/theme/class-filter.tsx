import { Select } from "zmp-ui";
import { SelectSkeleton } from "components/skeletons";
import { useRecoilState, useRecoilValue } from "recoil";
import React,{ Suspense } from "react";
import {
  districtsState,
  selectedDistrictsState,
  levelsState,
  selectedLevelsState,
  subjectsState,
  selectedSubjectsState,
  selectedFormTeachState,
} from "state";

const { OtpGroup, Option } = Select;

const mapValueClassToLevel = (ValueClass: string) => {
  const classNum = parseInt(ValueClass);
  if (classNum >= 1 && classNum <= 5) return "Tiểu học";
  if (classNum >= 6 && classNum <= 9) return "THCS";
  if (classNum >= 10 && classNum <= 12) return "THPT";
  return "Đại học";
};

const formTeachOptions = [
  { label: "Online", value: "Online" },
  { label: "Offline", value: "Offline" },
];

export default function ClassFilter() {
  const districts =  useRecoilValue(districtsState);
  const [selectedDistricts, setSelectedDistricts] = useRecoilState(selectedDistrictsState);

  const levels =  useRecoilValue(levelsState);
  const [selectedLevels, setSelectedLevels] = useRecoilState(selectedLevelsState);

  const subjects =  useRecoilValue(subjectsState);
  const [selectedSubjects, setSelectedSubjects] = useRecoilState(selectedSubjectsState);

  const [selectedFormTeach, setSelectedFormTeach] = useRecoilState(selectedFormTeachState);

  const handleDistrictChange = (selected: string[]) => {
    setSelectedDistricts(selected);
  };

  const handleLevelChange = (selected: string[]) => {
    setSelectedLevels(selected);
  };

  const handleSubjectChange = (selected: number[]) => {
    setSelectedSubjects(selected);
  };

  const handleFormTeachChange = (selected: string[]) => {
    setSelectedFormTeach(selected);
  };

  const handleClearFilters = () => {
    setSelectedDistricts([]);
    setSelectedLevels([]);
    setSelectedSubjects([]);
    setSelectedFormTeach([]);
  };

  return (
    <div className="flex px-4 py-3 space-x-2 overflow-x-auto">
      <Suspense fallback={<SelectSkeleton width={110} />}>
        <Select
          label="Khu vực"
          placeholder="Chọn khu vực"
          multiple
          closeOnSelect
          value={selectedDistricts}
          onChange={handleDistrictChange}
        >
          {districts.map((district) => (
            <Option 
              key={district} 
              value={district} 
              title={district} 
            />
          ))}
        </Select>
      </Suspense>

      <Suspense fallback={<SelectSkeleton width={110} />}>
        <Select
          label="Cấp học"
          placeholder="Chọn cấp học"
          multiple
          closeOnSelect
          value={selectedLevels}
          onChange={handleLevelChange}
        >
          {levels.map((level) => (
            <Option 
              key={level} 
              value={level} 
              title={level} 
            />
          ))}
        </Select>
      </Suspense>

      <Suspense fallback={<SelectSkeleton width={110} />}>
        <Select
          label="Hình thức dạy"
          placeholder="Chọn hình thức dạy"
          multiple
          closeOnSelect
          value={selectedFormTeach}
          onChange={handleFormTeachChange}
        >
          {formTeachOptions.map((option) => (
            <Option 
              key={option.label} 
              value={option.value} 
              title={option.label} 
            />
          ))}
        </Select>
      </Suspense>

      <Suspense fallback={<SelectSkeleton width={110} />}>
        <Select
          label="Môn học"
          placeholder="Chọn môn học"
          multiple
          closeOnSelect
          value={selectedSubjects}
          onChange={handleSubjectChange}
        >
          {subjects.map((subject) => (
            <Option 
              key={subject} 
              value={subject} 
              title={subject} 
            />
          ))}
        </Select>
      </Suspense>

      {(selectedDistricts.length > 0 || selectedLevels.length > 0 || selectedSubjects.length > 0 || selectedFormTeach.length > 0) && (
        <button
          className="bg-primary text-white rounded-full h-8 flex-none px-3"
          onClick={handleClearFilters}
        >
          Xoá bộ lọc
        </button>
      )}
    </div>
  );
}