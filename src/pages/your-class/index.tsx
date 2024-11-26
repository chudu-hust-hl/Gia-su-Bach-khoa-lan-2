// src/pages/your-class/index.tsx
import TeachingList from "./teaching-list";
import { selectedTabIndexState, tabsState } from "state";
import 
import DoneList from "./done-list";
import { useRecoilState, useRecoilValue } from "recoil";
import React , {FC} from "react";
import Tabs from "components/tabs";

interface ClassTypeTabsProps {
  selectedIndex: number;
  onChange: (index: number) => void;
}

const ClassTypeTabs: FC<ClassTypeTabsProps> = ({ selectedIndex, onChange }) => {
  const tabs = useRecoilValue(tabsState);

  return (
    <Tabs
      items={tabs}
      value={tabs[selectedIndex]}
      onChange={(tab) => onChange(tabs.indexOf(tab))}
      renderLabel={(item) => item}
    />
  );
};


//Three class list for each Tabs

const ApplyingList: FC = () => {
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


export default function YourClassPage() {
  const [selectedTabIndex, setSelectedIndex] = useRecoilState(selectedTabIndexState); // State for selected tab index

  const renderList = () => {
    switch (selectedTabIndex) {
      case 0: // "Đang diễn ra"
        return <TeachingList />;
      case 1: // "Đang yêu cầu"
        return <ApplyingList />;
      case 2: // "Đã kết thúc"
        return <DoneList />; 
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <ClassTypeTabs selectedIndex={selectedTabIndex} onChange={setSelectedIndex} />
      {renderList()} {/* Render the corresponding list based on selected tab */}
    </div>
  );
}