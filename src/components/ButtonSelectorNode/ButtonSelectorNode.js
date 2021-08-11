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
      onClick={() => data.focusNodeAction(id)}
    >
      <div>
        <Typography variant="body1">{data.label}</Typography>
      </div>

      {data.type === "event" &&
        (data.item ? (
          <Button variant="contained" disabled className="lbl-event">
            {data.item?.eventDisplay}
          </Button>
        ) : (
          data.btnLabel && (
            <Button
              onClick={e => {
                data.btnAction(id);
                e.stopPropagation();
              }}
              variant="contained"
            >
              {data.btnLabel}
            </Button>
          )
        ))}

      {(data.type === "condition" || data.type === "choice") &&
        (data.item ? (
          <Button variant="contained" disabled className="lbl-event">
            {Object.keys(data.item)[0].includes("Fn::")
              ? Object.values(data.item)[0]
                  .map(
                    cond =>
                      `${cond.conditionKey} ${cond.operator} ${cond.value.join(
                        ", "
                      )}`
                  )
                  .join(` ${Object.keys(data.item)[0].replace("Fn::", "")} `)
              : `${data.item.conditionKey} ${
                  data.item.operator
                } ${data.item.value.join(", ")}`}
          </Button>
        ) : (
          // data.conditions.map((c, i) => (
          //     <React.Fragment key={c.id}>
          //       <div className="label-div">
          //         <Button
          //           variant="contained"
          //           disabled
          //           className="lbl-condition"
          //         >
          //           {c.name}
          //         </Button>
          //         <IconButton
          //           disableRipple
          //           onClick={() => data.handleDeleteCondition(id, c.id)}
          //         >
          //           <HighlightOffIcon />
          //         </IconButton>
          //         {i !== data.conditions.length - 1 && (
          //           <Typography variant="h6">AND</Typography>
          //         )}
          //       </div>
          //     </React.Fragment>
          //   ))
          data.btnLabel && (
            <Button
              onClick={e => {
                data.btnAction(id);
                e.stopPropagation();
              }}
              variant="contained"
            >
              {data.btnLabel}
            </Button>
          )
        ))}

      {/* type === 'action' || type === 'action-yes' */}
      {data.type.includes("action") &&
        (data.item
          ? data.item.map((a, i) => (
              <React.Fragment key={a.id}>
                <div className="label-div">
                  <Button variant="contained" disabled className="lbl-action">
                    {`${a.actionKey} 
                    ${a.actionInputs
                      .map(ai => `${ai.key} - ${ai.value}`)
                      .join(", ")}`}
                  </Button>
                  <IconButton
                    disableRipple
                    onClick={() => data.handleDeleteAction(a.id)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                  {i !== data.item.length - 1 && (
                    <Typography variant="h6">AND</Typography>
                  )}
                </div>
              </React.Fragment>
            ))
          : data.btnLabel && (
              <Button
                onClick={e => {
                  data.btnAction(id);
                  e.stopPropagation();
                }}
                variant="contained"
              >
                {data.btnLabel}
              </Button>
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
