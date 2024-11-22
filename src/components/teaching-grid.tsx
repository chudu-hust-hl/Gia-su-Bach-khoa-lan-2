import { Class } from "types";
import { HTMLAttributes } from "react";
import TeachingItem from "./pages/your-class/teaching-item";

export interface TeachingGridProps extends HTMLAttributes<HTMLDivElement> {
  classes: Class[];
  replace?: boolean;
}

export default function TeachingGrid({
  classes,
  className,
  replace,
  ...props
}: TeachingGridProps) {
  return (
    <div
      className={"grid grid-cols-1 px-4 py-2 gap-4 ".concat(className ?? "")}
      {...props}
    >
      {classes.map((classItem) => (
        <TeachingItem key={classItem.id} class={classItem} replace={replace} />
      ))}
    </div>
  );
}
