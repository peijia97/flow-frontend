import React, { useEffect, useState, useRef } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";

import Typography from "@material-ui/core/Typography";
import { Events } from "components/sidePanel/Events/Events";
import { Conditions } from "components/sidePanel/Conditions/Conditions";
import { Actions } from "components/sidePanel/Actions/Actions";
import { Background } from "components/common/Background/Background";
import { CardHeader } from "components/common/CardHeader/CardHeader";
import ButtonSelectorNode from "components/ButtonSelectorNode/ButtonSelectorNode";
import { SAMPLE_EVENT_TRIGGERS, SAMPLE_FLOW } from "constants/constants";
import { setModalState } from "states/modalState";

import "./HomePage.scss";

const nodeTypes = {
  btnSelectorNode: ButtonSelectorNode
};
let totalConditionsCount = 0;

function HomePage() {
  useEffect(() => {
    if (window.innerWidth < 768) {
      setModalState({
        title: "Warning",
        subtitle: "Device must be larger than 768px x 1024px to support flow",
        persistent: true
      });
    }
  }, []);

  const initEventNodeElement = (
    item,
    nodeId = 1,
    position = { x: 250, y: 50 }
  ) => ({
    id: nodeId.toString(),
    position,
    type: "btnSelectorNode",
    data: {
      item,
      type: "event",
      label: "When...",
      btnLabel: "Select Event Trigger",
      focusNodeAction: id => {
        setShowDrawer("events");
        setSelectedNode(id);
      },
      btnAction: id => {
        setShowDrawer("events");
        setSelectedNode(id);
      }
    }
  });

  const initConditionNodeElement = (
    item,
    nodeId = 1,
    position = { x: 250, y: 50 }
  ) => ({
    id: nodeId.toString(),
    position,
    type: "btnSelectorNode",
    data: {
      item,
      type: "condition",
      label: "If...",
      btnLabel: "Add condition",
      focusNodeAction: id => {
        setShowDrawer("conditions");
        setSelectedNode(id);
      },
      handleSwapConditionArrows: id => handleSwapConditionArrows(id),
      handleDeleteCondition: id => handleDeleteCondition(id),
      btnAction: id => {
        setShowDrawer("conditions");
        setSelectedNode(id);
      }
    }
  });

  const initActionNodeElement = (
    item,
    nodeId = 1,
    position = { x: 250, y: 50 }
  ) => ({
    id: nodeId.toString(),
    position,
    type: "btnSelectorNode",
    data: {
      item,
      type: "action",
      label: "Then...",
      btnLabel: "Add action",
      focusNodeAction: id => {
        setShowDrawer(null);
        setSelectedActionIndex(null);
        setSelectedNode(id);
      },
      btnAction: id => {
        setShowDrawer("actions");
        setSelectedActionIndex(null);
        setSelectedNode(id);
      },
      handleSelectAction: (id, itemIndex) => {
        setShowDrawer("actions");
        setSelectedNode(id);
        handleSelectAction(itemIndex);
      },
      handleDeleteAction: (id, itemIndex, actionKey) => {
        setSelectedNode(id);
        handleDeleteAction(id, itemIndex);
      }
    }
  });

  const initChoiceNodeElement = (nodeId = 1, position = { x: 250, y: 50 }) => ({
    id: nodeId.toString(),
    position,
    type: "btnSelectorNode",
    data: {
      type: "choice",
      label: "Next Step",
      btnLabel: "Add condition",
      btnLabel2: "Add action",
      focusNodeAction: id => {
        setShowDrawer(null);
        setSelectedNode(id);
      },
      btnAction: id => {
        setShowDrawer("conditions");
        totalConditionsCount += 1;
        setSelectedNode(id);

        let tempElems = Object.assign([], elementsStateRef.current);
        tempElems = tempElems.filter(
          t =>
            t.id !== nodeId &&
            t.id !== `edges-${(Number(nodeId) - 1).toString()}-${nodeId}`
        );
        tempElems.push(
          initConditionNodeElement(null, nodeId, position), // 2
          initActionNodeElement(null, Number(nodeId) + 1, {
            // 3 = yes
            x: position.x - 250,
            y: position.y + 150
          }),
          totalConditionsCount + 1 > 3 // reached max 3 conditions limit
            ? initActionNodeElement(null, Number(nodeId) + 2, {
                x: position.x + 300,
                y: position.y + 150
              })
            : initChoiceNodeElement((Number(nodeId) + 2).toString(), {
                x: position.x + 300,
                y: position.y + 150
              }),
          ...(nodeId === "2"
            ? [
                initNodeEdge({
                  source: (Number(nodeId) - 1).toString(),
                  target: nodeId
                })
              ]
            : []),
          initNodeEdge({
            source: nodeId,
            target: (Number(nodeId) + 1).toString(), // edges-2-3
            label: "yes",
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 13,
            labelStyle: { fill: "#3b8dd6", fontWeight: 700 },
            labelBgStyle: { fill: "#f1f7fb" }
          }),
          initNodeEdge({
            source: nodeId,
            target: (Number(nodeId) + 2).toString(), // edges-2-4
            label: "no",
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 13,
            labelStyle: { fill: "#4a5568", fontWeight: 700 },
            labelBgStyle: { fill: "#ececec" }
          })
        );
        setElements(tempElems);
      },
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
          initActionNodeElement(null, nodeId, position),
          ...(nodeId === "2"
            ? [
                initNodeEdge({
                  source: (Number(nodeId) - 1).toString(),
                  target: nodeId
                })
              ]
            : [])
        );

        setElements(tempElems);
      }
    }
  });

  const initNodeEdge = ({ source, target, ...rest }) => ({
    id: `edges-${source}-${target}`, // edges-1-2
    source: source.toString(),
    target: target.toString(),
    type: "default",
    ...rest
  });

  const [showDrawer, setShowDrawer] = useState("events");
  const [selectedNode, setSelectedNode] = useState("1");
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);
  const [elements, setElements] = useState([initEventNodeElement()]);
  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els));
  const onConnect = params => setElements(els => addEdge(params, els));

  const elementsStateRef = useRef();
  elementsStateRef.current = elements;
  const selectedNodeStateRef = useRef();
  selectedNodeStateRef.current = selectedNode;

  const handleEventChange = event => {
    // setFlow({ ...flow, eventKey: event.eventKey });
    let tempElems = Object.assign([], elementsStateRef.current);
    tempElems[0] = initEventNodeElement(event);

    if (tempElems.length === 1) {
      tempElems.push(
        initChoiceNodeElement("2", { x: 250, y: 180 }),
        initNodeEdge({
          source: "1",
          target: "2"
        })
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

  const handleDeleteAction = (nodeId, itemIndex) => {
    let tempElems = Object.assign([], elementsStateRef.current);
    let tempElemIndex = tempElems.findIndex(t => t.id === nodeId);
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

  const handleDeleteCondition = nodeId => {
    let tempElems = Object.assign([], elementsStateRef.current);
    const targetNode = tempElems.find(e => e.id === nodeId);

    totalConditionsCount = tempElems.filter(
      e =>
        e.type === "btnSelectorNode" &&
        e.data.type === "condition" &&
        e.id < nodeId
    ).length;

    setElements([
      ...tempElems.filter(
        e =>
          e.type !== "btnSelectorNode" &&
          !new RegExp(
            tempElems
              .filter(e => e.type === "btnSelectorNode" && e.id > nodeId)
              .map(e => e.id)
              .join("|")
          ).test(e.id)
      ),
      ...tempElems.filter(e => e.id < nodeId),
      initChoiceNodeElement(nodeId, targetNode.position)
    ]);
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
      "Fn::If": [
        tempElems.find(el => el.id === nodeId).data?.item
          ? [tempElems.find(el => el.id === nodeId).data?.item]
          : []
      ]
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
      obj["Fn::If"].push(
        tempElems.find(el => el.id === yesNodeId).data?.item || []
      );
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
      obj["Fn::If"].push(
        tempElems.find(el => el.id === noNodeId).data?.item || []
      );
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

    // Incomplete flow
    if (
      tempElems.filter(el => el.type === "btnSelectorNode" && !el.data.item)
        .length
    ) {
      setModalState({
        title: "Warning",
        subtitle: "Please complete the flow first before saving",
        btnLabel: "OK"
      });
      return;
    }

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
          "Fn::If": [[{ noCondition: true }], tempElems[i].data?.item || [], []]
        });
        // Delete node and edge
        tempElems = tempElems.filter(
          el => el.id !== nodeId && el.target !== nodeId
        );
      } else if (tempElems[i].data?.type === "choice") {
        return;
      } else {
        i++;
      }
    }

    console.log("output", output);
  };

  const recursionFromElement = (conditionObj, nodeId, position) => {
    return [
      initConditionNodeElement(
        Object.values(conditionObj[0])[0],
        nodeId,
        position
      ), // 2
      initActionNodeElement(conditionObj[2], nodeId + 1, {
        // 3
        x: position.x - 250,
        y: position.y + 150
      }),
      ...(Object.keys(conditionObj[1][0])[0].includes("Fn::")
        ? recursionFromElement(
            Object.values(conditionObj[1][0])[0],
            nodeId + 2, // 4
            {
              x: position.x + 300,
              y: position.y + 150
            }
          )
        : [
            initActionNodeElement(conditionObj[1], nodeId + 2, {
              // 3
              x: position.x + 300,
              y: position.y + 150
            })
          ]),
      initNodeEdge({
        source: nodeId,
        target: Number(nodeId) + 1,
        label: "yes",
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 13,
        labelStyle: { fill: "#3b8dd6", fontWeight: 700 },
        labelBgStyle: { fill: "#f1f7fb" }
      }),
      initNodeEdge({
        source: nodeId,
        target: Number(nodeId) + 2,
        label: "no",
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 13,
        labelStyle: { fill: "#4a5568", fontWeight: 700 },
        labelBgStyle: { fill: "#ececec" }
      })
    ];
  };

  const handlePreview = () => {
    let nodeId = 1;
    let position = { x: 250, y: 200 };
    let initialElements = [];
    const sampleFlowConditions = Object.assign(
      [],
      SAMPLE_FLOW.conditions[0]["Fn::If"]
    );

    // Event
    initialElements.push(
      initEventNodeElement(
        SAMPLE_EVENT_TRIGGERS.find(t => t.eventKey === SAMPLE_FLOW.eventKey)
      )
    );

    // Condition + Action
    let i = 0;
    while (i < 3) {
      nodeId += 1;
      if (
        Object.keys(sampleFlowConditions[i]).includes("Fn::") ||
        Object.keys(sampleFlowConditions[i].includes("conditionKey"))
      ) {
        // Condition
        initialElements = [
          ...initialElements,
          ...recursionFromElement(sampleFlowConditions, nodeId, position),
          initNodeEdge({
            source: "1",
            target: "2"
          })
        ];
        // i += 2 because both yes and no actions for the condition already pushed into array
        // to complete / stop the loop
        i += 2;
      } else if (sampleFlowConditions[i + 1]) {
        // Action
        initialElements.push(
          initActionNodeElement(sampleFlowConditions[i + 1], nodeId, {
            x: 250,
            y: 50
          }),
          initNodeEdge({
            source: (Number(nodeId) - 1).toString(),
            target: nodeId
          })
        );
      }
      i++;
    }
    setElements(initialElements);
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
              selectedEventKey={
                elements.find(e => e.data?.type === "event").data?.item
                  ?.eventKey
              }
              handleSelect={handleEventChange}
            />
          )}

          {showDrawer === "conditions" && (
            <Conditions
              selectedEventKey={
                elements.find(e => e.data?.type === "event").data?.item
                  ?.eventKey
              }
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
        <CardHeader
          hasPreviewButton
          handlePreview={handlePreview}
          handleSave={handleSave}
        >
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
