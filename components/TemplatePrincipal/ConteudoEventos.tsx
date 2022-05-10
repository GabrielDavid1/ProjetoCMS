/* React */
import React, { useCallback, useEffect, useState, memo } from 'react';

/* React Flow */
import ReactFlow, { addEdge, Background, useEdgesState } from 'react-flow-renderer';

/* Componente */
import ModalEvento from '../Topicos/Modal/ModalEvento';
import { AcessoRapido } from '../Eventos/AcessoRapido';

/* Contexto */
import { useEvent } from '../../contexts/useEvent';
import { useList } from '../../contexts/useTopicos';

/* Tipagens */
import { DadoEvtProps } from '../../Importacoes/Tipagens/Tipagem';

type Props = {
  nomePagina: string;
}

function PadraoConteudoEventos ({ nomePagina }:Props)  {
  const { initialNodes, initialEdges, 
          onNodesChange, setInitialEdges, 
          nomeTooltip, setNomeTooltip,
        } = useEvent();
  const { list, retornarNome } = useList();

  const [dadoEvt, setDadoEvt] = useState<DadoEvtProps>();
  const [statusModal, setStatusModal] = useState(false);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [statusQuery, setStatusQuery] = useState(false); 

  const defaultEdgeOptions = { animated: true, style: { stroke: 'red' } };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    if(edges.length !== initialEdges.length) {  
       setInitialEdges(edges);
      
       /* Pegar elementos que pertencem a raiz*/
       let grupoEstatico:string[] = [];
       edges.map(elemento => (elemento.source === edges.slice(-1)[0].source) && grupoEstatico.push(elemento.target));
      
       /* Constroi um array para aparecer no tooltip do componente (AcessoRapido) */
       let nome = retornarNome(edges.slice(-1)[0].target, list[0]);
           nomeTooltip.push(nome);
           setNomeTooltip(nomeTooltip);

       /* Forma os dados que vão servir para mostragem em tela no modal */
       let copia = Object.assign({}, dadoEvt);
           copia = { idBotao: edges.slice(-1)[0].source,
                     idOutro: edges.slice(-1)[0].target,
                     nomeAlvo:nome, 
                     relacionados: grupoEstatico };
       setDadoEvt(copia);
       setStatusModal(true);
       setStatusQuery(false);
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
          edges={edges}
          setEdges={setEdges}
          nomeTooltip={nomeTooltip}
          setNomeTooltip={setNomeTooltip}
          statusQuery={statusQuery}
      /> 
      <AcessoRapido 
         nome={nomeTooltip}
         edges={edges} 
         dadoEvento={dadoEvt}
         setDadoEvt={setDadoEvt}
         setStatusModal={setStatusModal}
         statusQuery={statusQuery}
         setStatusQuery={setStatusQuery}
      />
    </ReactFlow> 
  );
};

export const ConteudoEventos = memo(PadraoConteudoEventos);