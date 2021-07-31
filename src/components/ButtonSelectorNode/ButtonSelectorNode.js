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
        <Button variant="contained" disabled className="lbl-event">
          {data.eventLabel}
        </Button>
      )}

      {data.conditions?.length > 0 &&
        data.conditions.map((c, i) => (
          <React.Fragment key={c.id}>
            <div className="label-div">
              <Button variant="contained" disabled className="lbl-condition">
                {c.name}
                {/* {data.conditionLabel.join(" AND ")} */}
              </Button>
              <IconButton
                disableRipple
                onClick={() => data.handleDeleteCondition(c.id)}
              >
                <HighlightOffIcon />
              </IconButton>
              {i !== data.conditions.length - 1 && (
                <Typography variant="h6">AND</Typography>
              )}
            </div>
          </React.Fragment>
        ))}

      {data.actions?.length > 0 &&
        data.actions.map((a, i) => (
          <React.Fragment key={a.id}>
            <div className="label-div">
              <Button variant="contained" disabled className="lbl-action">
                {a.name}
                {/* {data.actionLabel.join(" AND ")} */}
              </Button>
              <IconButton
                disableRipple
                onClick={() => data.handleDeleteAction(a.id)}
              >
                <HighlightOffIcon />
              </IconButton>
              {i !== data.actions.length - 1 && (
                <Typography variant="h6">AND</Typography>
              )}
            </div>
          </React.Fragment>
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
