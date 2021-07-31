import React, { memo } from "react";

import { Handle } from "react-flow-renderer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "./ButtonSelectorNode.scss";

export default memo(({ data, isConnectable }) => {
  return (
    <div className="ButtonSelectorNode">
      <div>
        <Typography variant="body1">{data.label}</Typography>
      </div>
      {data.eventLabel && (
        <Button
          onClick={() => {}}
          variant="contained"
          disabled
          className="lbl-event"
        >
          {data.eventLabel}
        </Button>
      )}

      {data.conditionLabel && (
        <Button
          onClick={() => {}}
          variant="contained"
          disabled
          className="lbl-condition"
        >
          {data.conditionLabel.join(" AND ")}
        </Button>
      )}

      {data.actionLabel && (
        <Button
          onClick={() => {}}
          variant="contained"
          disabled
          className="lbl-action"
        >
          {data.actionLabel.join(" AND ")}
        </Button>
      )}

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
