import React, { memo } from "react";

import { Handle } from "react-flow-renderer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import "./ButtonSelectorNode.scss";

export default memo(({ data, isConnectable }) => {
  return (
    <div className="ButtonSelectorNode">
      <div>
        <Typography variant="body1">{data.label}</Typography>
      </div>
      {data.eventLabel && (
        <div className="label-div">
          <Button variant="contained" disabled className="lbl-event">
            {data.eventLabel}
          </Button>
          <IconButton disableRipple>
            <HighlightOffIcon />
          </IconButton>
        </div>
      )}

      {data.conditionLabel &&
        data.conditionLabel.map((c, i) => (
          <>
            <div className="label-div">
              <Button variant="contained" disabled className="lbl-condition">
                {c}
                {/* {data.conditionLabel.join(" AND ")} */}
              </Button>
              <IconButton disableRipple>
                <HighlightOffIcon />
              </IconButton>
              {i !== data.conditionLabel.length - 1 && (
                <Typography variant="h6">AND</Typography>
              )}
            </div>
          </>
        ))}

      {data.actionLabel &&
        data.actionLabel.map((c, i) => (
          <>
            <div className="label-div">
              <Button variant="contained" disabled className="lbl-action">
                {c}
                {/* {data.actionLabel.join(" AND ")} */}
              </Button>
              <IconButton disableRipple>
                <HighlightOffIcon />
              </IconButton>
              {i !== data.actionLabel.length - 1 && (
                <Typography variant="h6">AND</Typography>
              )}
            </div>
          </>
        ))}

      {data.btnLabel && (
        <Button onClick={() => data.btnAction()} variant="contained">
          {data.btnLabel}
        </Button>
      )}

      {data.btnLabel2 && (
        <Button onClick={() => data.btnAction2()} variant="contained">
          {data.btnLabel2}
        </Button>
      )}

      <Handle
        type="source"
        position="bottom"
        style={{ bottom: 10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
