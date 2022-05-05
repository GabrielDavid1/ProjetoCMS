import React, { useCallback, useEffect } from 'react';
import ReactFlow, {  addEdge, Background, useNodesState, useEdgesState } from 'react-flow-renderer';

import { useEvent } from '../../contexts/useEvent';

const ConteudoEventos = () => {
  const { initialNodes, setInitialNodes, initialEdges, setInitialEdges } = useEvent();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const defaultEdgeOptions = { animated: true, style: { stroke: 'red' } };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
     setNodes(initialNodes);
  }, [initialNodes]);

  useEffect(() => {
 //   if(nodes.length !== initialNodes.length) {
       setInitialNodes(nodes);
 //   }
  }, [nodes]);

  useEffect(() => {
    if(edges.length !== initialEdges.length) {
       setInitialEdges(edges);
    }
  }, [edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Background color="#ffffff" />
    </ReactFlow>
  );
};

export default ConteudoEventos;