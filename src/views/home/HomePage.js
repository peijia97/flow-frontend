import React, { useState, useRef } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Background } from "components/common/Background/Background";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import { CardBody } from "components/common/CardBody/CardBody";
import ButtonSelectorNode from "components/ButtonSelectorNode/ButtonSelectorNode";
import { ACTIONS, CONDITIONS, EVENTS } from "constants/constants";

import "./HomePage.scss";

const nodeTypes = {
  btnSelectorNode: ButtonSelectorNode
};

function HomePage() {
  const [showDrawer, setShowDrawer] = useState("events");
  const [selectedNode, setSelectedNode] = useState("1");
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState({});
  const [selectedAction, setSelectedAction] = useState({});
  const [clickedAction, setClickedAction] = useState(null);

  const initialElements = [
    {
      id: "1",
      type: "btnSelectorNode",
      data: {
        label: "When",
        type: "event",
        btnLabel: "Select event trigger",
        focusNodeAction: () => {
          setShowDrawer("events");
          setSelectedNode("1");
        },
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
  const selectedNodeStateRef = useRef();
  selectedNodeStateRef.current = selectedNode;
  const selConditionStateRef = useRef();
  selConditionStateRef.current = selectedCondition;
  const selActionStateRef = useRef();
  selActionStateRef.current = selectedAction;

  const generateNextStepNodeObj = (nodeId, position) => {
    return {
      label: `Next Step`,
      type: "choice",
      btnLabel: "Add condition",
      focusNodeAction: () => {
        setShowDrawer(null);
        setSelectedNode(nodeId);
      },
      btnAction: () => {
        setShowDrawer("conditions");
        setSelectedNode(nodeId);

        let tempElems = Object.assign([], elementsStateRef.current);
        tempElems = tempElems.filter(
          t =>
            t.id !== nodeId &&
            t.id !== `edges-${(Number(nodeId) - 1).toString()}-${nodeId}`
        );
        tempElems.push(
          {
            id: nodeId, // 2
            type: "btnSelectorNode",
            data: {
              label: `If...`,
              type: "condition",
              btnLabel: "Add condition",
              focusNodeAction: () => {
                setShowDrawer("conditions");
                setSelectedNode(nodeId);
              },
              btnAction: () => {
                setShowDrawer("conditions");
                setSelectedNode(nodeId);
              },
              handleDeleteCondition: itemId =>
                handleDeleteCondition(nodeId, itemId)
            },
            position: position
          },
          {
            id: (Number(nodeId) + 1).toString(), // 3
            type: "btnSelectorNode",
            data: {
              label: `Then...`,
              type: "action-yes",
              btnLabel: "Add action",
              focusNodeAction: () => {
                setShowDrawer("actions");
                setSelectedNode((Number(nodeId) + 1).toString());
              },
              btnAction: () => {
                setShowDrawer("actions");
                setSelectedNode((Number(nodeId) + 1).toString());
              },
              handleDeleteAction: itemId =>
                handleDeleteAction((Number(nodeId) + 1).toString(), itemId)
            },
            position: { x: position.x, y: position.y + 400 }
          },
          {
            id: (Number(nodeId) + 2).toString(), // 4
            type: "btnSelectorNode",
            data: generateNextStepNodeObj((Number(nodeId) + 2).toString(), {
              x: position.x + 300,
              y: position.y + 150
            }),
            position: { x: position.x + 300, y: position.y + 150 }
          },
          ...(nodeId === "2"
            ? [
                {
                  id: `edges-${(Number(nodeId) - 1).toString()}-${nodeId}`, // edges-1-2
                  source: (Number(nodeId) - 1).toString(),
                  target: nodeId,
                  type: "smoothstep"
                }
              ]
            : []),
          {
            id: `edges-${nodeId}-${(Number(nodeId) + 1).toString()}`, // edges-2-3
            source: nodeId,
            target: (Number(nodeId) + 1).toString(),
            type: "smoothstep",
            label: "yes"
          },
          {
            id: `edges-${nodeId}-${(Number(nodeId) + 2).toString()}`, // edges-2-4
            source: nodeId,
            target: (Number(nodeId) + 2).toString(),
            type: "smoothstep",
            label: "no"
          }
        );
        setElements(tempElems);
      },
      btnLabel2: "Add Action",
      btnAction2: () => {
        setShowDrawer("actions");
        setSelectedNode(nodeId);

        let tempElems = Object.assign([], elementsStateRef.current);
        tempElems = tempElems.filter(
          t =>
            t.id !== nodeId &&
            t.id !== `edges-${(Number(nodeId) - 1).toString()}-${nodeId}` // edges-1-2
        );
        tempElems.push(
          {
            id: nodeId,
            type: "btnSelectorNode",
            data: {
              label: `Then...`,
              type: "action",
              btnLabel: "Add action",
              focusNodeAction: () => {
                setShowDrawer("actions");
                setSelectedNode(nodeId);
              },
              btnAction: () => {
                setShowDrawer("actions");
                setSelectedNode(nodeId);
              },
              handleDeleteAction: itemId => handleDeleteAction(nodeId, itemId)
            },
            position: position
          },
          ...(nodeId === "2"
            ? [
                {
                  id: `edges-${(Number(nodeId) - 1).toString()}-${nodeId}`, // edges-1-2
                  source: (Number(nodeId) - 1).toString(),
                  target: nodeId,
                  type: "smoothstep"
                }
              ]
            : [])
        );

        setElements(tempElems);
      },
      handleDeleteCondition: itemId => handleDeleteCondition(nodeId, itemId)
    };
  };

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
        focusNodeAction: () => {
          setShowDrawer("events");
          setSelectedNode("1");
        },
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
          data: generateNextStepNodeObj("2", { x: 250, y: 200 }),
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
    setSelectedCondition(prev => ({
      ...prev,
      [selectedNode]: [...(selectedCondition[selectedNode] || []), id]
    }));
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
    setSelectedAction(prev => ({
      ...prev,
      [selectedNode]: [
        ...(selectedAction[selectedNode] || []),
        clickedAction.id
      ]
    }));
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
    setSelectedCondition({
      ...selConditionStateRef.current,
      [selectedNodeStateRef.current]: (
        selConditionStateRef.current[selectedNodeStateRef.current] || []
      ).filter(c => c !== itemId)
    });
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
    setSelectedAction({
      ...selActionStateRef.current,
      [selectedNodeStateRef.current]: (
        selActionStateRef.current[selectedNodeStateRef.current] || []
      ).filter(a => a !== itemId)
    });
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
        case "action":
          outputArr.push({ [node.data.type]: [...node.data.actions] });
          break;
        default:
          break;
      }
    });
    console.log("output", outputArr);
  };

  // Handle lose focus on node to hide drawer
  const handleOnSelectionChange = e => {
    if (!e) {
      setShowDrawer(null);
    }
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
                type="events"
                nodeId={selectedNode}
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
                type="conditions"
                nodeId={selectedNode}
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
                type="actions"
                nodeId={selectedNode}
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
            onSelectionChange={handleOnSelectionChange}
          />
        </div>
      </div>
    </Background>
  );
}

export default HomePage;
