import React, { useState } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";

import Typography from "@material-ui/core/Typography";
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

  const initialElements = [
    {
      id: "1",
      type: "btnSelectorNode",
      data: {
        label: "When",
        type: "event",
        btnLabel: "Select event trigger",
        btnAction: () => setShowDrawer("events")
      },
      position: { x: 250, y: 25 }
    }
  ];
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els));
  const onConnect = params => setElements(els => addEdge(params, els));

  const handleEventChange = id => {
    setSelectedEvent([id]);
    let tempElems = Object.assign([], elements);
    tempElems[0] = {
      id: "1",
      type: "btnSelectorNode",
      data: {
        label: "When",
        type: "event",
        eventLabel: EVENTS.find(e => e.id === id).name,
        btnLabel: "Select event trigger",
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
            label: `If...`,
            type: "condition",
            btnLabel: "Add condition",
            btnAction: () => {
              setShowDrawer("conditions");
              setSelectedNode("2");
            }
          },
          position: { x: 250, y: 200 }
        },
        {
          id: "3",
          type: "btnSelectorNode",
          data: {
            label: `Next Step`,
            type: "condition",
            // btnLabel: "Add condition",
            // btnAction: () => {
            //   setShowDrawer("conditions");
            //   setSelectedNode("3");
            // },
            btnLabel2: "Add action",
            btnAction2: () => {
              setShowDrawer("actions");
              setSelectedNode("3");
            }
          },
          position: { x: 250, y: 600 }
        },
        {
          id: "4",
          type: "btnSelectorNode",
          data: {
            label: `Next Step`,
            type: "condition",
            // btnLabel: "Add condition",
            // btnAction: () => {
            //   setShowDrawer("conditions");
            //   setSelectedNode("4");
            // },
            btnLabel2: "Add action",
            btnAction2: () => {
              setShowDrawer("actions");
              setSelectedNode("4");
            }
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
    }
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
        conditionLabel: [
          ...(tempElems[tempElemIndex].data?.conditionLabel || []),
          CONDITIONS.find(e => e.id === id).name
        ]
      }
    };
    setElements(tempElems);
  };

  const handleActionChange = id => {
    setSelectedAction([...selectedAction, id]);
    let tempElems = Object.assign([], elements);
    let tempElemIndex = tempElems.findIndex(t => t.id === selectedNode);
    tempElems[tempElemIndex] = {
      ...tempElems[tempElemIndex],
      data: {
        ...tempElems[tempElemIndex].data,
        actionLabel: [
          ...(tempElems[tempElemIndex].data?.actionLabel || []),
          ACTIONS.find(e => e.id === id).name
        ]
      }
    };
    setElements(tempElems);
  };

  return (
    <Background fullHeight color="HomePage grey100">
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
              handleSelect={handleActionChange}
            />
          </>
        )}
      </div>

      <div className="home-section">
        <CardHeader>
          <Typography variant="h3">Map your automation</Typography>
        </CardHeader>
        <div className="flow-body">
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
