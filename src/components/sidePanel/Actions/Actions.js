import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import TextField from "@material-ui/core/TextField";
import { SAMPLE_ACTIONS } from "constants/constants";

import "./Actions.scss";

const Actions = props => {
  const {
    handleSelect,
    handleAddAction,
    actionsArr,
    selectedActionObj,
    ...rest
  } = props;

  useEffect(() => {
    if (Object.keys(selectedActionObj).length) {
      setClickedAction(formatActionInputs(selectedActionObj));
    } else {
      setClickedAction({});
    }
  }, [selectedActionObj]);

  const formatActionInputs = onFocusObj => {
    const tempAction = Object.assign(
      {},
      SAMPLE_ACTIONS.find(f => f.actionKey === onFocusObj.actionKey)
    );
    tempAction.fields?.forEach(f => {
      f.value = onFocusObj.actionInputs.find(
        input => input.key === f.key
      )?.value;
    });
    return tempAction;
  };

  const [clickedAction, setClickedAction] = useState({});
  const [showMore, setShowMore] = useState(false);

  const handleOnClickAction = action => {
    setClickedAction(action);
  };

  const handleOnAddOrUpdate = () => {
    const result = {
      actionKey: clickedAction.actionKey,
      actionInputs: clickedAction.fields.map(f => ({
        key: f.key,
        value: f.value
      }))
    };
    handleSelect(
      result,
      Object.keys(selectedActionObj).length ? "update" : "add"
    );
  };

  const handleFieldInputChange = (e, field) => {
    const tempClickedAction = Object.assign({}, clickedAction);
    const fieldIndex = clickedAction.fields.findIndex(f => f.key === field.key);
    tempClickedAction.fields[fieldIndex].value = e.target.value;
    setClickedAction(tempClickedAction);
  };

  return (
    <>
      <div className={`Actions`} {...rest}>
        <CardHeader>
          <Typography variant="h3">Actions</Typography>
        </CardHeader>

        <div
          className={`content-body ${
            SAMPLE_ACTIONS.length > 3 ? "has-show-more" : ""
          } ${showMore ? "show-all" : ""}`}
          {...rest}
        >
          {SAMPLE_ACTIONS.map(item => (
            <Button
              key={item.actionKey}
              onClick={() => handleOnClickAction(item)}
              disableRipple
              variant="text"
              className={`btn-card-item ${
                clickedAction?.actionKey === item.actionKey ? "on-focus" : ""
              }`}
              startIcon={<AddBoxOutlinedIcon />}
            >
              {item.actionDisplay}
            </Button>
          ))}
        </div>

        {SAMPLE_ACTIONS.length > 3 && (
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

      {Object.keys(clickedAction).length > 0 && (
        <>
          <CardHeader>
            <Typography variant="h3">Action Details</Typography>
          </CardHeader>
          <div className="card-body">
            {clickedAction.fields.map(field =>
              field.type === "selection" ? (
                <FormControl key={field.key}>
                  <InputLabel id={`label-${field.key}`}>
                    {field.placeHolder}
                  </InputLabel>
                  <Select
                    labelId={`label-${field.key}`}
                    id={field.key}
                    value={field.value || ""}
                    onChange={e => handleFieldInputChange(e, field)}
                  >
                    {field.option.map(opt => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  key={field.key}
                  fullWidth
                  margin="dense"
                  onChange={e => handleFieldInputChange(e, field)}
                  type={"text"}
                  value={field.value || ""}
                  label={field.placeHolder}
                  placeholder={field.placeHolder}
                />
              )
            )}
            <Button variant="text" disableRipple onClick={handleOnAddOrUpdate}>
              {Object.keys(selectedActionObj).length ? "Update" : "Add"}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

Actions.propTypes = {
  handleSelect: PropTypes.func,
  handleAddAction: PropTypes.func,
  actionsArr: PropTypes.array,
  selectedActionObj: PropTypes.object
};
export { Actions };
