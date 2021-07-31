import React, { useState } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Background } from "components/common/Background/Background";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import { CardBody } from "components/common/CardBody/CardBody";
import ButtonSelectorNode from "components/ButtonSelectorNode/ButtonSelectorNode";

import "./HomePage.scss";

const nodeTypes = {
  btnSelectorNode: ButtonSelectorNode
};

const initialElements = [
  {
    id: "1",
    type: "btnSelectorNode",
    data: { label: "When", type: "event", btnLabel: "Select event trigger" },
    position: { x: 250, y: 25 }
  },
  {
    id: "2",
    type: "btnSelectorNode",
    data: {
      label: `If...`,
      type: "condition",
      conditionLabel: "Amount > 100 AND Product is Coffee"
    },
    position: { x: 200, y: 180 }
  },
  {
    id: "3",
    type: "btnSelectorNode",
    data: { label: `Next Step`, type: "condition", btnLabel: "Add condition" },
    position: { x: 250, y: 600 }
  },
  {
    id: "4",
    type: "btnSelectorNode",
    data: {
      label: `Next Step`,
      type: "condition",
      btnLabel: "Add condition",
      btnLabel2: "Add action"
    },
    position: { x: 500, y: 350 }
  },
  {
    id: "edges-1-2",
    source: "1",
    target: "2",
    type: "smoothstep"
  },
  {
    id: "edges-2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    label: "yes"
  },
  {
    id: "edges-2-4",
    source: "2",
    target: "4",
    type: "smoothstep",
    label: "no"
  }
];

function HomePage() {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els));
  const onConnect = params => setElements(els => addEdge(params, els));

  const [age, setAge] = useState("");

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <Background fullHeight color="HomePage grey100">
      <div className="drawer">
        <CardHeader>
          <Typography variant="h3">Event</Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="h3">Event</Typography>
        </CardBody>

        <CardHeader>
          <Typography variant="h3">Condition</Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="h3">Event</Typography>
        </CardBody>

        <CardHeader>
          <Typography variant="h3">Action</Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="h3">Event</Typography>
        </CardBody>
        {/* <Typography variant="h5">Select conditions</Typography>
        <Typography variant="body1">
          Take different actions based on the condition you select
        </Typography>

        <div className="d-flex justify-space-between align-items-center mt-1">
          <Typography variant="h6">If</Typography>
          <Button onClick={() => {}} variant="text">
            Delete
          </Button>
        </div>

        <TextField
          variant="outlined"
          value="Testing"
          margin="dense"
          fullWidth
          readOnly
        />

        <FormControl variant="outlined" margin="dense" fullWidth>
          <InputLabel>Select</InputLabel>
          <Select value={age} onChange={handleChange} label="Select">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={() => {}}
          variant="contained"
          style={{ marginTop: "1rem" }}
        >
          Add another condition
        </Button> */}
      </div>
      <div className="home-section">
        <CardHeader>
          <Typography variant="h3">Map your automation</Typography>
        </CardHeader>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "white" }}
        >
          <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            deleteKeyCode={46} /* 'delete'-key */
          />
        </div>
      </div>
    </Background>
  );
}

export default HomePage;
