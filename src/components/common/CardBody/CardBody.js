import React from "react";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import "./CardBody.scss";

const CardBody = props => {
  const { children, ...rest } = props;
  return (
    <>
      <div className={`CardBody has-show-more`} {...rest}>
        {children}
      </div>
      <div className="btn-show-more">
        <Button
          variant="text"
          disableRipple
          endIcon={<KeyboardArrowDownOutlinedIcon />}
        >
          Show more
        </Button>
      </div>
    </>
  );
};

export { CardBody };
