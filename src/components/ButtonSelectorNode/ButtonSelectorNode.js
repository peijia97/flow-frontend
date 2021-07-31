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
      {data.conditionLabel && (
        <Button
          onClick={() => {}}
          variant="contained"
          disabled
          className="selected"
        >
          {data.conditionLabel}
        </Button>
      )}
      {data.btnLabel && (
        <Button onClick={() => {}} variant="contained">
          {data.btnLabel}
        </Button>
      )}
      {data.btnLabel2 && (
        <Button onClick={() => {}} variant="contained">
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
