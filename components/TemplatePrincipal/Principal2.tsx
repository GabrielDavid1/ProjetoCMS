import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection
} from 'react-flow-renderer';

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5   } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [];

const fitViewOptions: FitViewOptions = {
  padding: 0.2
}

export function Principal2() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    console.log(edges);
  }, [edges])
  

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
    />
  )
}

/* 
import ReactFlow from 'react-flow-renderer';

const defaultNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 },
  },

  {
    id: '2',
    data: { label: 'Default Node' },
    position: { x: 0, y: 100 },
    // when you don't pass a type, the default one gets used
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 0, y: 200 },
  },
  {
    id: '4',
    type: 'group',
    data: null,
    position: { x: 0, y: 300 },
  },
];

const defaultEdges:any = [];

export function Principal2() {
  return <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView />;
}

*/