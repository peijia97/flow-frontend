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

import "./PreviewPage.scss";

const nodeTypes = {
  btnSelectorNode: ButtonSelectorNode
};

function PreviewPage() {
  const [showDrawer, setShowDrawer] = useState("events");
  const [selectedNode, setSelectedNode] = useState("1");
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState({});
  const [selectedAction, setSelectedAction] = useState({});
  const [clickedAction, setClickedAction] = useState(null);

  const inputArr = [
    {
      event: {
        id: 1,
        name: "New order placed"
      }
    },
    {
      conditions: [
        {
          id: 1,
          name: "Amount > 100"
        }
      ]
    },
    {
      "action-yes": [
        {
          id: 2,
          label: "Call Contact",
          name: "Call Contact",
          type: "tel",
          value: "888"
        }
      ]
    },
    {
      action: [
        {
          id: 2,
          label: "Contact Number",
          name: "Call Contact",
          type: "tel",
          value: "999"
        }
      ]
    }
  ];

  const generateInitialElements = () => {
    const initialElements = [];
    let nodeId = 1;
    let position = { x: 250, y: 25 };
    inputArr.forEach(input => {
      switch (Object.keys(input)[0]) {
        case "event":
          initialElements.push(
            {
              id: nodeId.toString(),
              type: "btnSelectorNode",
              data: {
                label: "When",
                type: "event",
                btnLabel: "Select event trigger",
                focusNodeAction: id => {
                  setShowDrawer("events");
                  setSelectedNode(id);
                },
                btnAction: id => {
                  setShowDrawer("events");
                  setSelectedNode(id);
                },
                ...input
              },
              position: position
            },
            {
              id: `edges-${nodeId.toString()}-${nodeId + 1}`, // edges-1-2
              source: nodeId.toString(),
              target: (Number(nodeId) + 1).toString(),
              type: "smoothstep"
            }
          );
          break;
        case "conditions":
          position = { x: position.x, y: position.y + 175 };
          ++nodeId;
          initialElements.push(
            {
              id: nodeId.toString(),
              type: "btnSelectorNode",
              data: {
                label: "If...",
                type: "condition",
                btnLabel: "Add condition",
                focusNodeAction: id => {
                  setShowDrawer("conditions");
                  setSelectedNode(id);
                },
                btnAction: id => {
                  setShowDrawer("conditions");
                  setSelectedNode(id);
                },
                handleDeleteCondition: (nodeId, itemId) =>
                  handleDeleteCondition(nodeId, itemId),
                ...input
              },
              position: position
            },
            {
              id: `edges-${nodeId.toString()}-${nodeId + 1}`, // edges-2-3
              source: nodeId.toString(),
              target: (Number(nodeId) + 1).toString(),
              type: "smoothstep",
              label: "yes"
            },
            {
              id: `edges-${nodeId.toString()}-${nodeId + 2}`, // edges-2-4
              source: nodeId.toString(),
              target: (Number(nodeId) + 2).toString(),
              type: "smoothstep",
              label: "no"
            }
          );
          break;
        case "action-yes":
          position = { x: position.x, y: position.y + 400 };
          ++nodeId;
          initialElements.push({
            id: nodeId.toString(),
            type: "btnSelectorNode",
            data: {
              label: `Then...`,
              type: "action-yes",
              btnLabel: "Add action",
              focusNodeAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              btnAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              handleDeleteCondition: (nodeId, itemId) =>
                handleDeleteCondition(nodeId, itemId),
              actions: input["action-yes"]
            },
            position: position
          });
          break;
        case "action":
          position = { x: position.x + 300, y: position.y };
          ++nodeId;
          initialElements.push({
            id: nodeId.toString(),
            type: "btnSelectorNode",
            data: {
              label: `Then...`,
              type: "action",
              btnLabel: "Add action",
              focusNodeAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              btnAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              handleDeleteCondition: (nodeId, itemId) =>
                handleDeleteCondition(nodeId, itemId),
              actions: input["action"]
            },
            position: position
          });
          break;
        default:
          break;
      }
    });
    return initialElements;
  };

  const [elements, setElements] = useState(generateInitialElements());
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
      focusNodeAction: id => {
        setShowDrawer(null);
        setSelectedNode(id);
      },
      btnAction: id => {
        setShowDrawer("conditions");
        setSelectedNode(id);

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
              focusNodeAction: id => {
                setShowDrawer("conditions");
                setSelectedNode(id);
              },
              btnAction: id => {
                setShowDrawer("conditions");
                setSelectedNode(id);
              },
              handleDeleteCondition: (nodeId, itemId) =>
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
              focusNodeAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              btnAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              handleDeleteAction: (nodeId, itemId) =>
                handleDeleteAction(nodeId, itemId)
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
      btnAction2: id => {
        setShowDrawer("actions");
        setSelectedNode(id);

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
              focusNodeAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              btnAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              handleDeleteAction: (nodeId, itemId) =>
                handleDeleteAction(nodeId, itemId)
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
      handleDeleteCondition: (nodeId, itemId) =>
        handleDeleteCondition(nodeId, itemId)
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
        focusNodeAction: id => {
          setShowDrawer("events");
          setSelectedNode(id);
        },
        btnAction: id => {
          setShowDrawer("events");
          setSelectedNode(id);
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
          outputArr.push({ [node.data.type]: [...(node.data.actions || [])] });
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
    <Background fullHeight color="PreviewPage grey100">
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
                      variant="text"
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

export default PreviewPage;
