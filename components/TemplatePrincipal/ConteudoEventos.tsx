/* React */
import React, { useCallback, useEffect, useState } from 'react';

/* React Flow */
import ReactFlow, { addEdge, Background, useEdgesState } from 'react-flow-renderer';

/* Componente */
import ModalEvento from '../Topicos/Modal/ModalEvento';

/* Contexto */
import { useEvent } from '../../contexts/useEvent';

/* Tipagens */
import { DadoEvtProps } from '../../Importacoes/Tipagens/Tipagem';

type Props = {
  nomePagina: string;
}

const ConteudoEventos = ({ nomePagina }:Props) => {
  const { initialNodes, initialEdges, onNodesChange, setInitialEdges, queryEvento, setQueryEvento } = useEvent();

  const [dadoEvt, setDadoEvt] = useState<DadoEvtProps>();
  const [statusModal, setStatusModal] = useState(false);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const defaultEdgeOptions = { animated: true, style: { stroke: 'red' } };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    if(edges.length !== initialEdges.length) {
       setInitialEdges(edges);

       let grupoEstatico:string[] = [];
       edges.map(elemento => (elemento.source === edges.slice(-1)[0].source) && grupoEstatico.push(elemento.target));

       let copia = Object.assign({}, dadoEvt);
       copia = {
                idBotao: edges.slice(-1)[0].source, 
                idOutro: edges.slice(-1)[0].target, 
                relacionados: grupoEstatico
              };
       setDadoEvt(copia);

       queryEvento.push({
          idBotao: edges.slice(-1)[0].source,
          evento: 'Vazio',
          condicao: {
              par1: '',
              par2: 'Maior',
              par3: '',
          },
          acao: {
              raiz: '',
              alvo: '',
          },
          ativado: false,
       });
       setQueryEvento([...queryEvento]);
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
          dadoEvento={dadoEvt}
      /> 
    </ReactFlow> 
  );
};

export default ConteudoEventos;