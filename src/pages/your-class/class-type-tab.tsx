import { useRecoilValue } from "recoil";
import Tabs from "@/components/tabs";
import { selectedTabIndexState, tabsState } from "@/state";

interface ClassTypeTabsProps {
    selectedIndex: number;
    onChange: (index: number) => void;
  }

export default function ClassTypeTabs({ selectedIndex, onChange }: ClassTypeTabsProps) {
  const tabs =  useRecoilValue(tabsState);
  return (
    <Tabs
      items={tabs}
      value={tabs[selectedIndex]}
      onChange={(tab) => onChange(tabs.indexOf(tab))}
      renderLabel={(item) => item}
    />
  );
}
