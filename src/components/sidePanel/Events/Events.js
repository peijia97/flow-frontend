import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import { SAMPLE_EVENT_TRIGGERS } from "constants/constants";

import "./Events.scss";

const Events = props => {
  const { handleSelect, onFocusId, ...rest } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={`Events`} {...rest}>
      <CardHeader>
        <Typography variant="h3">Events</Typography>
      </CardHeader>

      <div
        className={`content-body ${
          SAMPLE_EVENT_TRIGGERS.length > 3 ? "has-show-more" : ""
        } ${showMore ? "show-all" : ""}`}
        {...rest}
      >
        {SAMPLE_EVENT_TRIGGERS.map(item => (
          <Button
            key={item.eventKey}
            onClick={() => handleSelect(item.eventKey)}
            disableRipple
            variant="text"
            className={`btn-card-item ${
              onFocusId === item.eventKey ? "on-focus" : ""
            }`}
            startIcon={<AddBoxOutlinedIcon />}
          >
            {item.eventDisplay}
          </Button>
        ))}
      </div>

      {SAMPLE_EVENT_TRIGGERS.length > 3 && (
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
    </div>
  );
};

Events.propTypes = {
  onFocusId: PropTypes.string,
  handleSelect: PropTypes.func
};
export { Events };
