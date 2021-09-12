import React, { memo } from "react";

import { Handle, useStoreState } from "react-flow-renderer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
// import LoopIcon from "@material-ui/icons/Loop";

import "./ButtonSelectorNode.scss";

export default memo(({ id, data, isConnectable }) => {
  const selectedElements = useStoreState(store => store.selectedElements);

  return (
    <div
      className={`ButtonSelectorNode ${
        selectedElements && selectedElements[0].id === id ? "is-selected" : ""
      }`}
      onClick={() => data.focusNodeAction(id)}
    >
      <Typography variant="body1" className="node-label">
        {data.label}
      </Typography>

      {/* Event type */}
      {data.type === "event" &&
        (data.item ? (
          <Button variant="text" disabled className="lbl-event">
            {data.item?.eventDisplay}
          </Button>
        ) : (
          data.btnLabel && (
            <Button
              onClick={e => {
                data.btnAction(id);
                e.stopPropagation();
              }}
              variant="text"
            >
              {data.btnLabel}
            </Button>
          )
        ))}

      {/* Condition or Choice type */}
      {(data.type === "condition" || data.type === "choice") && (
        <>
          {data.type === "condition" && (
            <>
              {/* <IconButton
                disableRipple
                className="btn-swap"
                onClick={e => {
                  data.handleSwapConditionArrows(id);
                  e.stopPropagation();
                }}
              >
                <LoopIcon />
              </IconButton> */}
              <IconButton
                disableRipple
                className="btn-delete"
                onClick={e => {
                  data.handleDeleteCondition(id);
                  e.stopPropagation();
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </>
          )}
          {data.item ? (
            <Button variant="text" disabled className="lbl-condition">
              {Object.keys(data.item)[0].includes("Fn::")
                ? Object.values(data.item)[0]
                    .map(
                      cond =>
                        `${cond.conditionKey} ${
                          cond.operator
                        } ${cond.value.join(", ")}`
                    )
                    .join(` ${Object.keys(data.item)[0].replace("Fn::", "")} `)
                : `${data.item.conditionKey} ${
                    data.item.operator
                  } ${data.item.value.join(", ")}`}
            </Button>
          ) : (
            data.btnLabel && (
              <Button
                onClick={e => {
                  data.btnAction(id);
                  e.stopPropagation();
                }}
                variant="text"
              >
                {data.btnLabel}
              </Button>
            )
          )}
        </>
      )}

      {/* Action Type */}
      {data.type === "action" &&
        (data.item?.length ? (
          <>
            {data.item.map((a, i) => (
              <React.Fragment key={i}>
                <div className="label-div">
                  <Button
                    variant="text"
                    onClick={e => {
                      data.handleSelectAction(id, i);
                      e.stopPropagation();
                    }}
                    className="lbl-action"
                  >
                    {`Action: ${a.actionKey}
                    ${a.actionInputs
                      .map(ai => `${ai.key} - ${ai.value}`)
                      .join(", ")}`}
                  </Button>
                  <IconButton
                    disableRipple
                    onClick={e => {
                      data.handleDeleteAction(id, i, a.actionKey);
                      e.stopPropagation();
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                  {i !== data.item.length - 1 && (
                    <Typography variant="h6">AND</Typography>
                  )}
                </div>
              </React.Fragment>
            ))}

            <Button
              onClick={e => {
                data.btnAction(id);
                e.stopPropagation();
              }}
              variant="text"
            >
              Add Action
            </Button>
          </>
        ) : (
          data.btnLabel && (
            <Button
              onClick={e => {
                data.btnAction(id);
                e.stopPropagation();
              }}
              variant="text"
            >
              {data.btnLabel}
            </Button>
          )
        ))}

      {data.type === "choice" && (
        <Typography variant="h6" className="text-or">
          OR
        </Typography>
      )}

      {data.btnLabel2 && (
        <Button
          onClick={e => {
            data.btnAction2(id);
            e.stopPropagation();
          }}
          variant="text"
        >
          {data.btnLabel2}
        </Button>
      )}

      <Handle
        type="source"
        position="bottom"
        style={{ bottom: 10, top: "auto", background: "transparent" }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
