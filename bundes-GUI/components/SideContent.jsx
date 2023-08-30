import React from "react";

const SideContent = (props) => {
  return (
    <div className="flex flex-col">
      <div>{props.children}</div>
    </div>
  );
};

export default SideContent;
