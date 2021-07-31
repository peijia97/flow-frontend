import React, { useState, useRef } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Background } from "components/common/Background/Background";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import { CardBody } from "components/common/CardBody/CardBody";
import ButtonSelectorNode from "components/ButtonSelectorNode/ButtonSelectorNode";

import "./HomePage.scss";
import { ACTIONS, CONDITIONS, EVENTS } from "constants/constants";

const nodeTypes = {
  btnSelectorNode: ButtonSelectorNode
};

function HomePage() {
  const [showDrawer, setShowDrawer] = useState("events");
  const [selectedNode, setSelectedNode] = useState("1");
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedAction, setSelectedAction] = useState([]);
  const [clickedAction, setClickedAction] = useState(null);

  const initialElements = [
    {
      id: "1",
      type: "btnSelectorNode",
      data: {
        label: "When",
        type: "event",
        btnLabel: "Select event trigger",
        btnAction: () => {
          setShowDrawer("events");
          setSelectedNode("1");
        }
      },
      position: { x: 250, y: 25 }
    }
  ];
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els));
  const onConnect = params => setElements(els => addEdge(params, els));
  const elementsStateRef = useRef();
  elementsStateRef.current = elements;
  const selConditionStateRef = useRef();
  selConditionStateRef.current = selectedCondition;
  const selActionStateRef = useRef();
  selActionStateRef.current = selectedCondition;

  const handleEventChange = id => {
    setSelectedEvent([id]);
    let tempElems = Object.assign([], elements);
    tempElems[0] = {
      id: "1",
      type: "btnSelectorNode",
      data: {
        label: "When",
        type: "event",
        event: EVENTS.find(e => e.id === id),
        btnAction: () => {
          setShowDrawer("events");
          setSelectedNode("1");
        }
      },
      position: { x: 250, y: 25 }
    };

    if (tempElems.length === 1) {
      tempElems.push(
        {
          id: "2",
          type: "btnSelectorNode",
          data: {
            label: `Next Step`,
            type: "condition",
            btnLabel: "Add condition",
            btnAction: () => {
              setShowDrawer("conditions");
              setSelectedNode("2");

              let tempElems = Object.assign([], elementsStateRef.current);
              tempElems = tempElems.filter(
                t => t.id !== "2" && t.id !== "edges-1-2"
              );
              tempElems.push(
                {
                  id: "2",
                  type: "btnSelectorNode",
                  data: {
                    label: `If...`,
                    type: "condition",
                    btnLabel: "Add condition",
                    btnAction: () => {
                      setShowDrawer("conditions");
                      setSelectedNode("2");
                    },
                    handleDeleteCondition: itemId =>
                      handleDeleteCondition("2", itemId)
                  },
                  position: { x: 250, y: 200 }
                },
                {
                  id: "3",
                  type: "btnSelectorNode",
                  data: {
                    label: `Then...`,
                    type: "action-yes",
                    // btnLabel: "Add condition",
                    // btnAction: () => {
                    //   setShowDrawer("conditions");
                    //   setSelectedNode("3");
                    // },
                    btnLabel: "Add action",
                    btnAction: () => {
                      setShowDrawer("actions");
                      setSelectedNode("3");
                    },
                    handleDeleteAction: itemId =>
                      handleDeleteAction("3", itemId)
                  },
                  position: { x: 250, y: 600 }
                },
                {
                  id: "4",
                  type: "btnSelectorNode",
                  data: {
                    label: `Then...`,
                    type: "action-no",
                    // btnLabel: "Add condition",
                    // btnAction: () => {
                    //   setShowDrawer("conditions");
                    //   setSelectedNode("4");
                    // },
                    btnLabel: "Add action",
                    btnAction: () => {
                      setShowDrawer("actions");
                      setSelectedNode("4");
                    },
                    handleDeleteAction: itemId =>
                      handleDeleteAction("4", itemId)
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
              );
              setElements(tempElems);
            },
            btnLabel2: "Add Action",
            btnAction2: () => {
              setShowDrawer("actions");
              setSelectedNode("2");

              let tempElems = Object.assign([], elementsStateRef.current);
              tempElems = tempElems.filter(
                t => t.id !== "2" && t.id !== "edges-1-2"
              );
              tempElems.push(
                {
                  id: "2",
                  type: "btnSelectorNode",
                  data: {
                    label: `Then...`,
                    type: "action",
                    // btnLabel: "Add condition",
                    // btnAction: () => {
                    //   setShowDrawer("conditions");
                    //   setSelectedNode("3");
                    // },
                    btnLabel: "Add action",
                    btnAction: () => {
                      setShowDrawer("actions");
                      setSelectedNode("2");
                    },
                    handleDeleteAction: itemId =>
                      handleDeleteAction("2", itemId)
                  },
                  position: { x: 250, y: 200 }
                },
                {
                  id: "edges-1-2",
                  source: "1",
                  target: "2",
                  type: "smoothstep"
                }
              );

              setElements(tempElems);
            },
            handleDeleteCondition: itemId => handleDeleteCondition("2", itemId)
          },
          position: { x: 250, y: 200 }
        },
        {
          id: "edges-1-2",
          source: "1",
          target: "2",
          type: "smoothstep"
        }
      );
    }
    setShowDrawer(null);
    setElements(tempElems);
  };

  const handleConditionChange = id => {
    setSelectedCondition([...selectedCondition, id]);
    let tempElems = Object.assign([], elements);
    let tempElemIndex = tempElems.findIndex(t => t.id === selectedNode);
    tempElems[tempElemIndex] = {
      ...tempElems[tempElemIndex],
      data: {
        ...tempElems[tempElemIndex].data,
        conditions: [
          ...(tempElems[tempElemIndex].data?.conditions || []),
          CONDITIONS.find(e => e.id === id)
        ]
      }
    };
    setElements(tempElems);
  };

  const handleActionChange = id => {
    setClickedAction(ACTIONS.find(a => a.id === id));
  };

  const handleAddAction = () => {
    setSelectedAction([...selectedAction, clickedAction.id]);
    let tempElems = Object.assign([], elements);
    let tempElemIndex = tempElems.findIndex(t => t.id === selectedNode);
    tempElems[tempElemIndex] = {
      ...tempElems[tempElemIndex],
      data: {
        ...tempElems[tempElemIndex].data,
        actions: [
          ...(tempElems[tempElemIndex].data?.actions || []),
          clickedAction
        ]
      }
    };
    setElements(tempElems);
  };

  const handleDeleteCondition = (nodeId, itemId) => {
    let tempElems = Object.assign([], elementsStateRef.current);
    let tempElemIndex = tempElems.findIndex(t => t.id === nodeId);
    tempElems[tempElemIndex] = {
      ...tempElems[tempElemIndex],
      data: {
        ...tempElems[tempElemIndex].data,
        conditions: (tempElems[tempElemIndex].data?.conditions || []).filter(
          t => t.id !== itemId
        )
      }
    };
    setSelectedCondition(
      selConditionStateRef.current.filter(c => c !== itemId)
    );
    setElements(tempElems);
  };

  const handleDeleteAction = (nodeId, itemId) => {
    let tempElems = Object.assign([], elementsStateRef.current);
    let tempElemIndex = tempElems.findIndex(t => t.id === nodeId);
    tempElems[tempElemIndex] = {
      ...tempElems[tempElemIndex],
      data: {
        ...tempElems[tempElemIndex].data,
        actions: (tempElems[tempElemIndex].data?.actions || []).filter(
          t => t.id !== itemId
        )
      }
    };
    setSelectedAction(selActionStateRef.current.filter(a => a !== itemId));
    setElements(tempElems);
  };

  const handleSave = () => {
    const nodes = elements.filter(el => el.type === "btnSelectorNode");
    const outputArr = [];
    nodes.forEach(node => {
      switch (node.data.type) {
        case "event":
          outputArr.push({ event: node.data.event });
          break;
        case "condition":
          outputArr.push({ condition: node.data.conditions });
          break;
        case "action-yes":
        case "action-no":
        case "action":
          outputArr.push({ [node.data.type]: [...node.data.actions] });
          break;
        default:
          break;
      }
    });
    console.log("output", outputArr);
  };

  return (
    <Background fullHeight color="HomePage grey100">
      {showDrawer && (
        <div className="drawer">
          {showDrawer === "events" && (
            <>
              <CardHeader>
                <Typography variant="h3">Events</Typography>
              </CardHeader>
              <CardBody
                listItems={EVENTS}
                selectedId={selectedEvent}
                handleSelect={handleEventChange}
              />
            </>
          )}

          {showDrawer === "conditions" && (
            <>
              <CardHeader>
                <Typography variant="h3">Conditions</Typography>
              </CardHeader>
              <CardBody
                listItems={CONDITIONS}
                selectedId={selectedCondition}
                handleSelect={handleConditionChange}
              />
            </>
          )}

          {showDrawer === "actions" && (
            <>
              <CardHeader>
                <Typography variant="h3">Actions</Typography>
              </CardHeader>
              <CardBody
                listItems={ACTIONS}
                selectedId={selectedAction}
                onFocusId={clickedAction?.id}
                handleSelect={handleActionChange}
              />
              {clickedAction && (
                <>
                  <CardHeader>
                    <Typography variant="h3">Action Details</Typography>
                  </CardHeader>
                  <div className="card-body">
                    <TextField
                      fullWidth
                      margin="dense"
                      onChange={e =>
                        setClickedAction(prev => ({
                          ...prev,
                          value: e.target.value
                        }))
                      }
                      type={clickedAction.type}
                      value={clickedAction.value || ""}
                      label={clickedAction.label}
                    />
                    <Button
                      variatn="text"
                      disableRipple
                      onClick={handleAddAction}
                    >
                      Add
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      <div className="home-section">
        <CardHeader handleSave={handleSave}>
          <Typography variant="h3">Map your automation</Typography>
        </CardHeader>
        <div className="flow-body">
          <ReactFlow
            elementsSelectable={true}
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
