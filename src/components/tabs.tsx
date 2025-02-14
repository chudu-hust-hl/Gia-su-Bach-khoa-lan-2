import React, { ReactNode } from "react";

export interface TabsProps<T> {
  items: T[];
  value: T;
  onChange: (item: T) => void;
  renderLabel: (item: T) => ReactNode;
}

export default function Tabs<T>(props: TabsProps<T>) {
  return (
    <div
      className="grid h-11 border-b-[0.5px] border-black/10 overflow-x-auto"
      style={{
        gridTemplateColumns: `repeat(${props.items.length}, minmax(0, 1fr))`,
      }}
    >
      {props.items.map((item, i) => (
        <div
          key={i}
          className="h-full flex flex-col px-3 cursor-pointer focus:bg-inactive focus:rounded-br-[16px] focus:rounded-bl-[16px]"
          tabIndex={0}
          onClick={() => props.onChange(item)}
        >
          <div className="flex-1 flex items-center justify-center">
            <span
              className={"truncate font-medium ".concat(
                item === props.value ? "" : "text-inactive"
              )}
            >
              {props.renderLabel(item)}
            </span>
          </div>
          {props.value === item && (
            <div className="bg-tabIndicator h-[1.5px] rounded-t-sm -mt-px " />
          )}
        </div>
      ))}
    </div>
  );
}
