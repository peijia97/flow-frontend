import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import "./CardHeader.scss";

const CardHeader = props => {
  const { children, ...rest } = props;
  return (
    <div className={`CardHeader`} {...rest}>
      {children}
      <IconButton disableRipple>
        <InfoOutlinedIcon />
      </IconButton>
    </div>
  );
};

export { CardHeader };
