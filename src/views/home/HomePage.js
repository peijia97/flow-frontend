import React, { useState } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { Background } from "components/common/Background/Background";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import { CardBody } from "components/common/CardBody/CardBody";
import ButtonSelectorNode from "components/ButtonSelectorNode/ButtonSelectorNode";

import "./HomePage.scss";
import { ACTIONS, CONDITIONS, EVENTS } from "constants/constants";

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
          <Typography variant="h3">Events</Typography>
        </CardHeader>
        <CardBody listItems={EVENTS} />

        <CardHeader>
          <Typography variant="h3">Conditions</Typography>
        </CardHeader>
        <CardBody listItems={CONDITIONS} />

        <CardHeader>
          <Typography variant="h3">Actions</Typography>
        </CardHeader>
        <CardBody listItems={ACTIONS} />
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
