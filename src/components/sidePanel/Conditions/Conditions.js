import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import ClearIcon from "@material-ui/icons/Clear";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { setModalState } from "states/modalState";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import {
  SAMPLE_EVENT_TRIGGERS,
  CONDITION_OPERATORS
} from "constants/constants";

import "./Conditions.scss";

const Conditions = props => {
  const { selectedEventKey, selectedConditionObj, handleSelect, ...rest } =
    props;

  useEffect(() => {
    setConditions(
      Object.keys(selectedConditionObj)[0]?.includes("Fn::")
        ? Object.values(selectedConditionObj)[0]
        : [
            {
              conditionKey: selectedConditionObj.conditionKey || "",
              value: selectedConditionObj.value || [],
              operator: selectedConditionObj.operator || ""
            }
          ]
    );
    setMustMeet(
      Object.keys(selectedConditionObj)[0]?.includes("Fn::")
        ? Object.keys(selectedConditionObj)[0]
        : ""
    );
  }, [selectedConditionObj]);

  const initialConditionObj = {
    conditionKey: "",
    value: [],
    operator: ""
  };

  const selectedEventFields = SAMPLE_EVENT_TRIGGERS.find(
    t => t.eventKey === selectedEventKey
  ).fields;

  const [mustMeet, setMustMeet] = useState("");
  const [conditions, setConditions] = useState([
    {
      conditionKey: "",
      value: [],
      operator: ""
    }
  ]);

  const handleOnAdd = () => {
    if (!mustMeet) {
      setMustMeet("Fn::And");
    }
    setConditions([...conditions, initialConditionObj]);
  };

  const handleOnSave = () => {
    // Empty field validation
    if (
      conditions.find(
        c => !c.conditionKey || !c.operator || c.value.filter(v => !v).length
      )
    ) {
      setModalState({
        title: "Warning",
        subtitle: "Please complete the condition fields before saving",
        btnLabel: "OK"
      });
      return;
    }
    let tempConditions = Object.assign([], conditions)
    while (tempConditions.length > 0) {
      const firstCondition = tempConditions[0];
      const groupedConditions = tempConditions.filter(c => c.conditionKey === firstCondition.conditionKey);
      // groupedConditions.filter(g=>g.value.includes())

      tempConditions = tempConditions.filter(c=>groupedConditions.includes(c.conditionKey))
    }
    console.log(conditions)
    const result = mustMeet ? { [mustMeet]: conditions } : conditions[0];
    handleSelect(result);
  };

  const handleOnRemove = index => {
    if (conditions.length === 2) {
      setMustMeet("");
    }
    const tempConditions = Object.assign([], conditions);
    tempConditions.splice(index, 1);
    setConditions(tempConditions);
  };

  const handleOnChange = (value, index, keyName) => {
    const tempConditions = Object.assign([], conditions);
    if (keyName === "value") {
      tempConditions[index].value = value.split(",");
    } else {
      tempConditions[index][keyName] = value;
    }
    setConditions(tempConditions);
  };

  return (
    <div className={`Conditions`} {...rest}>
      <CardHeader>
        <Typography variant="h3">Conditions</Typography>
      </CardHeader>

      <div className={`content-body`} {...rest}>
        {conditions.length > 1 && (
          <FormControl className="mb-1-5">
            <InputLabel id={`label-must-meet`}>
              All conditions must meet
            </InputLabel>
            <Select
              labelId={`label-must-meet`}
              id="must-meet"
              value={mustMeet}
              onChange={e => setMustMeet(e.target.value)}
            >
              <MenuItem value="Fn::And">AND</MenuItem>
              <MenuItem value="Fn::Or">OR</MenuItem>
            </Select>
          </FormControl>
        )}

        {conditions.map((c, i) => (
          <React.Fragment key={i}>
            {i !== 0 && (
              <Button
                className="btn-clear"
                variant="text"
                startIcon={<ClearIcon />}
                disableRipple
                onClick={() => handleOnRemove(i)}
              >
                Remove
              </Button>
            )}
            <FormControl>
              <InputLabel id={`label-condition-${i}`}>
                Condition {i + 1}
              </InputLabel>
              <Select
                labelId={`label-condition-${i}`}
                id={`condition-${i}`}
                value={c.conditionKey || ""}
                onChange={e =>
                  handleOnChange(e.target.value, i, "conditionKey")
                }
              >
                {selectedEventFields.map(item => (
                  <MenuItem key={item.conditionKey} value={item.conditionKey}>
                    {item.conditionDisplay}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id={`label-operator-${i}`}>
                Operator {i + 1}
              </InputLabel>
              <Select
                labelId={`label-operator-${i}`}
                id={`operator-${i}`}
                value={c.operator || ""}
                onChange={e => handleOnChange(e.target.value, i, "operator")}
              >
                {selectedEventFields.find(
                  f => f.conditionKey === c.conditionKey
                )?.type === "option"
                  ? selectedEventFields
                      .find(f => f.conditionKey === c.conditionKey)
                      .options.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))
                  : CONDITION_OPERATORS.filter(
                      o =>
                        o.type ===
                        selectedEventFields.find(
                          f => f.conditionKey === c.conditionKey
                        )?.type
                    )?.map(operator => (
                      <MenuItem key={operator.value} value={operator.value}>
                        {operator.name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>

            <FormControl>
              <TextField
                fullWidth
                margin="dense"
                onChange={e => handleOnChange(e.target.value, i, "value")}
                type={"text"}
                value={c.value.join(",") || ""}
                label={`Value ${i + 1}`}
              />
              <FormHelperText>
                Please separate multiple values by comma
              </FormHelperText>
            </FormControl>

            {conditions.length - 1 !== i && (
              <Typography variant="h6" className="must-meet-separator">
                {mustMeet === "Fn::And" ? "AND" : "OR"}
              </Typography>
            )}
          </React.Fragment>
        ))}

        <Button
          variant="text"
          startIcon={<AddBoxOutlinedIcon />}
          disableRipple
          className="btn-add"
          onClick={handleOnAdd}
        >
          Add Condition
        </Button>
        <Button variant="contained" disableRipple onClick={handleOnSave}>
          Save Condition
        </Button>
      </div>
    </div>
  );
};

Conditions.propTypes = {
  selectedEventKey: PropTypes.string,
  selectedConditionObj: PropTypes.object,
  handleSelect: PropTypes.func
};
export { Conditions };
