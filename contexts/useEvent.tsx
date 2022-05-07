/* React e React Flow */
import React from "react";
import { Node, Edge, useNodesState, useEdgesState, OnNodesChange, NodeChange } from 'react-flow-renderer';

/* Contexto */
import { useConfig } from "./useConfig";

interface PropsEvento {
    idBotao: string;
    idOutro: string;
    evento: string;
    condicao: {
        par1: string;
        par2: string;
        par3: string;
    }
    acao: {
        raiz: string;
        alvo: string;
    },
    ativado: boolean;
}
interface ModalContextValue {
    queryEvento: PropsEvento[],
    
    initialNodes: Node[],
    initialEdges: Edge[],
    
    quantidadeEventos: number,
    setQuantidadeEventos: (tamanho: number) => void,
    
    setQueryEvento: (data: PropsEvento[]) => void,
    setInitialNodes: (data: Node[]) => void,
    setInitialEdges: (data: Edge[]) => void,
    onNodesChange: (nodes: NodeChange[]) => void,

    buscarQuery: (id: string | undefined, tipo: boolean, idElemento?: string) => PropsEvento,
    deletarQuery: (id: string | undefined, tipo: boolean) => void,
}
interface Props {
    children: React.ReactNode;
}

const listInitial: ModalContextValue = {
    queryEvento: [{
        idBotao: '',
        idOutro: '',
        evento: '',
        condicao: {
            par1: '',
            par2: '',
            par3: '',
        },
        acao: {
            raiz: '',
            alvo: '',
        },
        ativado: true,
    }],
    
    initialNodes: [],
    initialEdges: [],

    quantidadeEventos: 0,
    setQuantidadeEventos:  data => {},
    
    setQueryEvento:  data => {},
    setInitialNodes:  data => {},
    setInitialEdges:  data => {},
    onNodesChange:  data => {},
    buscarQuery: data => listInitial.queryEvento[0],
    deletarQuery:  data => {},
};

const EventContext = React.createContext<ModalContextValue>(listInitial);

export function EventProvider({ children }: Props) {
    const [ initialNodes, setInitialNodes, onNodesChange ]  = useNodesState(listInitial.initialNodes);
    const [ initialEdges, setInitialEdges ]  = React.useState(listInitial.initialEdges);

    const [ queryEvento, setQueryEvento ] = React.useState<PropsEvento[]>([]);

    const [ quantidadeEventos, setQuantidadeEventos ]  = React.useState<number>(listInitial.quantidadeEventos);

    function buscarQuery (id: string | undefined, tipo: boolean, idElemento = '' as string) {
        let index = queryEvento.findIndex(elemento => elemento.idBotao === id && elemento.ativado === tipo);

        console.log(queryEvento.find(elemento => elemento.idBotao === id && elemento.idOutro === idElemento))

        if (index !== -1) {
           return queryEvento[index];           
        } else {
            return listInitial.queryEvento[0];
        }
    }

    function deletarQuery (id: string | undefined, tipo: boolean) {
        const index = queryEvento.findIndex(elemento => elemento.idBotao === id && elemento.ativado === tipo);
        if (index !== -1) {
           queryEvento.splice(index, 1); 
           setQueryEvento([...queryEvento]);         
        } 
    } 
    
    return (
        <EventContext.Provider 
            value={{ 
                initialNodes, initialEdges, onNodesChange,
                setInitialNodes, setInitialEdges,
                quantidadeEventos, setQuantidadeEventos,
                queryEvento, setQueryEvento, buscarQuery,
                deletarQuery,
            }}
        >
        {children}
        </EventContext.Provider>
    );
}

export function useEvent() {
    const context = React.useContext(EventContext);
    const  { 
        initialNodes, initialEdges, onNodesChange,
        setInitialNodes, setInitialEdges,
        quantidadeEventos, setQuantidadeEventos,
        queryEvento, setQueryEvento, buscarQuery,
        deletarQuery,
    } = context;
    return { 
        initialNodes, initialEdges, onNodesChange,
        setInitialNodes, setInitialEdges,
        quantidadeEventos, setQuantidadeEventos,
        queryEvento, setQueryEvento, buscarQuery,
        deletarQuery,
    };
}