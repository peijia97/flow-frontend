import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import "./CardBody.scss";

const CardBody = props => {
  const [showMore, setShowMore] = useState(false);
  const { listItems, ...rest } = props;
  return (
    <>
      <div
        className={`CardBody ${listItems.length > 3 ? "has-show-more" : ""} ${
          showMore ? "show-all" : ""
        }`}
        {...rest}
      >
        {listItems.map(item => (
          <Button
            onClick={() => {}}
            disableRipple
            variant="text"
            className="btn-card-item"
            startIcon={<AddBoxOutlinedIcon />}
          >
            {item.name}
          </Button>
        ))}
      </div>
      {listItems.length > 3 && (
        <div className="btn-show-more">
          <Button
            onClick={() => setShowMore(!showMore)}
            variant="text"
            disableRipple
            endIcon={
              showMore ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )
            }
          >
            Show {showMore ? "less" : "more"}
          </Button>
        </div>
      )}
    </>
  );
};

export { CardBody };
