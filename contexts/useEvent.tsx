/* React e React Flow */
import React from "react";
import { Node, Edge } from 'react-flow-renderer';

interface ModalContextValue {
    initialNodes: Node[],
    initialEdges: Edge[],

    quantidadeEventos: number,
    setQuantidadeEventos: (tamanho: number) => void,

    setInitialNodes: (data: Node[]) => void,
    setInitialEdges: (data: Edge[]) => void,
}
interface Props {
    children: React.ReactNode;
}

const listInitial: ModalContextValue = {
    initialNodes: [],
    initialEdges: [],

    quantidadeEventos: 0,
    setQuantidadeEventos:  data => {},
    
    setInitialNodes:  data => {},
    setInitialEdges:  data => {},
};

const EventContext = React.createContext<ModalContextValue>(listInitial);

export function EventProvider({ children }: Props) {
    const [ initialNodes, setInitialNodes ]  = React.useState<Node[]>(listInitial.initialNodes);
    const [ initialEdges, setInitialEdges ]  = React.useState<Edge[]>(listInitial.initialEdges);
    const [ quantidadeEventos, setQuantidadeEventos ]  = React.useState<number>(listInitial.quantidadeEventos);

    return (
        <EventContext.Provider 
            value={{ 
                initialNodes, initialEdges, 
                setInitialNodes, setInitialEdges,
                quantidadeEventos, setQuantidadeEventos
            }}
        >
        {children}
        </EventContext.Provider>
    );
}

export function useEvent() {
    const context = React.useContext(EventContext);
    const  { 
        initialNodes, initialEdges, 
        setInitialNodes, setInitialEdges,
        quantidadeEventos, setQuantidadeEventos
    } = context;
    return { 
        initialNodes, initialEdges, 
        setInitialNodes, setInitialEdges,
        quantidadeEventos, setQuantidadeEventos
    };
}