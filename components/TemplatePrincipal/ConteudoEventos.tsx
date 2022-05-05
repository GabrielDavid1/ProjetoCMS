/* React */
import React, { useCallback, useEffect, useState } from 'react';

/* React Flow */
import ReactFlow, {  addEdge, Background, useNodesState, useEdgesState, applyNodeChanges } from 'react-flow-renderer';

/* Componente */
import ModalEvento from '../Topicos/Modal/ModalEvento';

import { useEvent } from '../../contexts/useEvent';

type Props = {
  nomePagina: string;
}

const ConteudoEventos = ({ nomePagina }:Props) => {
  const { initialNodes, onNodesChange, initialEdges, setInitialEdges } = useEvent();

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [statusModal, setStatusModal] = useState(false);
  
  const defaultEdgeOptions = { animated: true, style: { stroke: 'red' } };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    if(edges.length !== initialEdges.length) {
       setInitialEdges(edges);
       setStatusModal(true);
    }
  }, [edges]);

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Background color="#ffffff" />
      <ModalEvento 
          nomePagina={nomePagina} 
          statusModal={statusModal}
          setStatusModal={setStatusModal}
      /> 
    </ReactFlow>
  );
};

export default ConteudoEventos;