import React from "react";
import "./Background.scss";

const Background = props => {
  const { fullHeight, color, children, ...rest } = props;
  return (
    <div
      className={`Background ${color} ${!!fullHeight && "h-screen"}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export { Background };
