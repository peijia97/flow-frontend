import React, { memo } from "react";

import { Handle, useStoreState } from "react-flow-renderer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import "./ButtonSelectorNode.scss";

export default memo(({ id, data, isConnectable }) => {
  const selectedElements = useStoreState(store => store.selectedElements);

  return (
    <div
      className={`ButtonSelectorNode ${
        selectedElements && selectedElements[0].id === id ? "is-selected" : ""
      }`}
      onClick={() => data.btnAction()}
    >
      <div>
        <Typography variant="body1">{data.label}</Typography>
      </div>
      {data.event && (
        <Button variant="contained" disabled className="lbl-event">
          {data.event.name}
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
                {a.name} - {a.value}
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
        <Button
          onClick={e => {
            data.btnAction();
            e.stopPropagation();
          }}
          variant="contained"
        >
          {data.btnLabel}
        </Button>
      )}

      {data.btnLabel2 && (
        <Button
          onClick={e => {
            data.btnAction2();
            e.stopPropagation();
          }}
          variant="contained"
        >
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
