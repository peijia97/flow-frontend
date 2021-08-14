import React, { useState, useRef } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";

import Typography from "@material-ui/core/Typography";
import { Events } from "components/sidePanel/Events/Events";
import { Conditions } from "components/sidePanel/Conditions/Conditions";
import { Actions } from "components/sidePanel/Actions/Actions";
import { Background } from "components/common/Background/Background";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import ButtonSelectorNode from "components/ButtonSelectorNode/ButtonSelectorNode";

import "./HomePage.scss";

const nodeTypes = {
  btnSelectorNode: ButtonSelectorNode
};

function HomePage() {
  const [flow, setFlow] = useState({});
  const [showDrawer, setShowDrawer] = useState("events");
  const [selectedNode, setSelectedNode] = useState("1");
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);

  const initialElements = [
    {
      id: "1",
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
  const selActionStateRef = useRef();
  selActionStateRef.current = selectedActionIndex;

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
              handleSwapConditionArrows: id => handleSwapConditionArrows(id),
              btnAction: id => {
                setShowDrawer("conditions");
                setSelectedNode(id);
              }
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
                setSelectedActionIndex(null);
                setSelectedNode(id);
              },
              btnAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              handleSelectAction: (id, itemIndex) => {
                setShowDrawer("actions");
                setSelectedNode(id);
                handleSelectAction(itemIndex);
              },
              handleDeleteAction: (id, itemIndex) => {
                setSelectedNode(id);
                handleDeleteAction(itemIndex);
              }
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
                setSelectedActionIndex(null);
                setSelectedNode(id);
              },
              btnAction: id => {
                setShowDrawer("actions");
                setSelectedNode(id);
              },
              handleSelectAction: (id, itemIndex) => {
                setShowDrawer("actions");
                setSelectedNode(id);
                handleSelectAction(itemIndex);
              },
              handleDeleteAction: (id, itemIndex) => {
                setSelectedNode(id);
                handleDeleteAction(itemIndex);
              }
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
      }
    };
  };

  const handleEventChange = event => {
    setFlow({ ...flow, eventKey: event.eventKey });
    let tempElems = Object.assign([], elementsStateRef.current);
    tempElems[0] = {
      id: "1",
      type: "btnSelectorNode",
      data: {
        label: "When",
        type: "event",
        item: event,
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

  const handleConditionChange = conditionObj => {
    let tempElems = Object.assign([], elementsStateRef.current);
    let tempElemIndex = tempElems.findIndex(
      t => t.id === selectedNodeStateRef.current
    );
    tempElems[tempElemIndex] = {
      ...tempElems[tempElemIndex],
      data: {
        ...tempElems[tempElemIndex]?.data,
        item: conditionObj
      }
    };
    setElements(tempElems);
  };

  // type = add / update
  const handleActionChange = (actionObj, type) => {
    let tempElems = Object.assign([], elementsStateRef.current);
    let tempElemIndex = tempElems.findIndex(
      t => t.id === selectedNodeStateRef.current
    );
    tempElems[tempElemIndex] = {
      ...tempElems[tempElemIndex],
      data: {
        ...tempElems[tempElemIndex]?.data,
        item:
          type === "update"
            ? [
                ...tempElems[tempElemIndex]?.data?.item.slice(
                  0,
                  selectedActionIndex
                ),
                actionObj,
                ...tempElems[tempElemIndex]?.data?.item.slice(
                  selectedActionIndex + 1
                )
              ]
            : [...(tempElems[tempElemIndex]?.data?.item || []), actionObj]
      }
    };
    setElements(tempElems);
  };

  const handleSelectAction = itemIndex => {
    setSelectedActionIndex(itemIndex);
  };

  const handleDeleteAction = itemIndex => {
    let tempElems = Object.assign([], elementsStateRef.current);
    let tempElemIndex = tempElems.findIndex(
      t => t.id === selectedNodeStateRef.current
    );
    tempElems[tempElemIndex] = {
      ...tempElems[tempElemIndex],
      data: {
        ...tempElems[tempElemIndex]?.data,
        item: (tempElems[tempElemIndex]?.data?.item || []).filter(
          (x, i) => i !== itemIndex
        )
      }
    };
    setElements(tempElems);
    setShowDrawer(null);
  };

  const handleSwapConditionArrows = nodeId => {
    const tempElements = Object.assign([], elementsStateRef.current);
    const yesNodeIndex = tempElements.findIndex(
      el => el.source === nodeId && el.label === "yes"
    );
    const noNodeIndex = tempElements.findIndex(
      el => el.source === nodeId && el.label === "no"
    );
    tempElements[yesNodeIndex].label =
      tempElements[yesNodeIndex].label === "yes" ? "no" : "yes";
    tempElements[noNodeIndex].label =
      tempElements[noNodeIndex].label === "yes" ? "no" : "yes";
    setElements(tempElements);
  };

  const recursionFormObj = (tempElems, nodeId) => {
    let obj = {
      "Fn::If": [[tempElems.find(el => el.id === nodeId).data?.item]]
    };

    tempElems = tempElems.filter(
      el => el.target !== nodeId && el.id !== nodeId
    );

    // condition-yes-action
    const yesNodeId = tempElems.find(
      el => el.source === nodeId && el.label === "yes"
    ).target;
    if (tempElems.find(el => el.id === yesNodeId).data?.type === "condition") {
      // recursion and return object to be pushed in to second array
      obj["Fn::If"].push([recursionFormObj(tempElems, nodeId)]);
    } else {
      obj["Fn::If"].push(tempElems.find(el => el.id === yesNodeId).data?.item);
    }
    tempElems = tempElems.filter(
      el => el.target !== yesNodeId && el.id !== yesNodeId
    );

    // condition-no-action
    const noNodeId = tempElems.find(
      el => el.source === nodeId && el.label === "no"
    ).target;
    if (tempElems.find(el => el.id === noNodeId).data?.type === "condition") {
      // recursion and return object to be pushed in to third array
      obj["Fn::If"].push([recursionFormObj(tempElems, noNodeId)]);
    } else {
      obj["Fn::If"].push(tempElems.find(el => el.id === noNodeId).data?.item);
    }
    tempElems = tempElems.filter(
      el => el.target !== noNodeId && el.id !== noNodeId
    );

    return obj;
  };

  const handleSave = () => {
    let tempElems = Object.assign([], elements);
    const output = {
      eventKey: "",
      conditions: []
    };

    let i = 0;
    while (tempElems.length > 0) {
      let nodeId = tempElems[i].id;
      if (tempElems[i].data?.type === "event") {
        output.eventKey = tempElems[i].data?.item?.eventKey;
        tempElems.splice(i, 1);
      } else if (tempElems[i].data?.type === "condition") {
        output.conditions.push(recursionFormObj(tempElems, nodeId));
        break;
      } else if (
        tempElems.filter(el => el.type === "btnSelectorNode").length === 1 &&
        tempElems[i].data?.type === "action"
      ) {
        output.conditions.push({
          "Fn::If": [[{ noCondition: true }], tempElems[i].data?.item, []]
        });
        // Delete node and edge
        tempElems = tempElems.filter(
          el => el.id !== nodeId && el.target !== nodeId
        );
      } else {
        i++;
      }
    }

    console.log("output", output);
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
            <Events
              selectedEventKey={flow.eventKey}
              handleSelect={handleEventChange}
            />
          )}

          {showDrawer === "conditions" && (
            <Conditions
              selectedEventKey={flow.eventKey}
              selectedConditionObj={
                elementsStateRef.current.find(
                  el => el.id === selectedNodeStateRef.current
                )?.data?.item || {}
              }
              handleSelect={handleConditionChange}
            />
          )}

          {showDrawer === "actions" && (
            <Actions
              actionsArr={
                elementsStateRef.current.find(
                  el => el.id === selectedNodeStateRef.current
                )?.data?.item || []
              }
              selectedActionObj={
                (elementsStateRef.current.find(
                  el => el.id === selectedNodeStateRef.current
                )?.data?.item || [])[selectedActionIndex] || {}
              }
              handleSelect={handleActionChange}
            />
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
            // deleteKeyCode={46} /* 'delete'-key */
            onSelectionChange={handleOnSelectionChange}
          />
        </div>
      </div>
    </Background>
  );
}

export default HomePage;
