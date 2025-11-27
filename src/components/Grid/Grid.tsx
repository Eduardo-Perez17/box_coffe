import { ReactNode } from "react";

const Grid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-[20px_1fr_20px] my-4 lg:my-8 sm:grid-cols-[60px_1fr_60px] lg:grid-cols-[150px_1fr_150px]">
      <div className="grid col-start-2 col-end-3 gap-8 sm:gap-12 lg:gap-16">
        {children}
      </div>
    </div>
  );
};

export default Grid;
