/* React, Next e React Flow */
import React from "react";
import Router from 'next/router';
import { Node, Edge, useNodesState, NodeChange } from 'react-flow-renderer';

/* Contexto */
import { useConfig } from './useConfig';
/* Tipagens */
import { Config } from '../Importacoes/Tipagens/Tipagem';

interface PropsConfig {
    id: string;
    type: string; 
    tipoCache?: string;
    idGrupo: string;
    config?: Config;
}

interface PropsEvento {
    idBotao: string;
    evento: string;
    nomeAlvo?: string;
    condicao: {
        par1: string;
        par2: string;
        par3: string;
    }
    acao: {
        id: string;
        tipo: string;
        alterado: string;
    },
    ativado: boolean;
}
interface ModalContextValue {
    queryEvento: PropsEvento[],
    
    nomeTooltip: string[];

    initialNodes: Node[],
    initialEdges: Edge[],
    
    quantidadeEventos: number,
    setQuantidadeEventos: (tamanho: number) => void,
    
    setQueryEvento: (data: PropsEvento[]) => void,
    setInitialNodes: (data: Node[]) => void,
    setInitialEdges: (data: Edge[]) => void,
    setNomeTooltip: (data: string[]) => void,
    onNodesChange: (nodes: NodeChange[]) => void,

    plataformaEvento: (idBotao: string, resto:PropsConfig[]) => void,

    renomearNode: (id: string, novoNome: string) => void,

    buscarQuery: (id: string | undefined, tipo: boolean) => PropsEvento,
    deletarQuery: (id: string | undefined, tipo: boolean) => void,
    removeEvento: (id: string, tipo: string) => void,
}
interface Props {
    children: React.ReactNode;
}

const listInitial: ModalContextValue = {
    queryEvento: [{
        idBotao: '',
        evento:  '',
        condicao: {
            par1: '',
            par2: '',
            par3: '',
        },
        acao: {
            id: '',
            tipo: '',
            alterado: '',
        },
        ativado: true,
    }],

    nomeTooltip: [],
    
    initialNodes: [],
    initialEdges: [],

    quantidadeEventos: 0,
    setQuantidadeEventos:  data => {},
    
    setQueryEvento:  data => {},
    setInitialNodes:  data => {},
    setInitialEdges:  data => {},
    setNomeTooltip:  data => {},
    onNodesChange:  data => {},

    plataformaEvento:  data => {},

    renomearNode:  data => {},
    removeEvento:  data => {},

    buscarQuery: data => listInitial.queryEvento[0],
    deletarQuery:  data => {},
};

const EventContext = React.createContext<ModalContextValue>(listInitial);

export function EventProvider({ children }: Props) {
    const [ initialNodes, setInitialNodes, onNodesChange ]  = useNodesState(listInitial.initialNodes);
    const [ initialEdges, setInitialEdges ]  = React.useState(listInitial.initialEdges);
    const [ nomeTooltip, setNomeTooltip ] = React.useState<string[]>([]);

    const [ queryEvento, setQueryEvento ] = React.useState<PropsEvento[]>(listInitial.queryEvento);

    const [ quantidadeEventos, setQuantidadeEventos ]  = React.useState<number>(listInitial.quantidadeEventos);

    const { configuracoes, setConfiguracoes } = useConfig();

    function buscarQuery (id: string | undefined, tipo: boolean) {
        let index = queryEvento.findIndex(elemento => elemento.idBotao === id && elemento.ativado === tipo);
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

    function removeEvento (id:string, tipo: string) {
        let index_1,index_2 = -1;
        index_1 = initialNodes.findIndex(elemento => elemento.id === id);

        if (index_1 !== -1) {
            initialNodes.splice(index_1, 1);   
            setInitialNodes([...initialNodes]);
        }

        if (index_2 !== -1) {
            index_2 = initialEdges.findIndex(elemento => elemento.source === id);
            initialEdges.splice(index_2, 1);    
            setInitialEdges([...initialEdges]);
            queryEvento.splice(index_2, 1);
            setQueryEvento([...queryEvento]);
        } else if (index_2 === -1) {
            index_2 = initialEdges.findIndex(elemento => elemento.target === id);
            initialEdges.splice(index_2, 1);    
            setInitialEdges([...initialEdges]);   
            queryEvento.splice(index_2, 1);
            setQueryEvento([...queryEvento]);         
        }
    }

    function renomearNode(id: string, novoNome: string) {
        let index = initialNodes.findIndex(elemento => elemento.id === id);
        if (index !== -1) {
            initialNodes[index].data.label = novoNome;
            setInitialNodes([...initialNodes]);
        }
    }

    function plataformaEvento (idBotao: string, resto:PropsConfig[]) {
        queryEvento.filter(elemento => elemento.idBotao === idBotao && elemento.evento !== 'Vazio').map(function(item){
            Acao(idBotao, item, resto);
        });
    }

    function Acao (id: string, elemento: PropsEvento, resto:PropsConfig[]) {
        let id_1 = elemento?.condicao.par1.replace(/\D+/g, ""); 
        let param_1 = elemento?.condicao.par1.replace(/-/g , "");

        let config_1:any = resto.find(elemento => elemento.id === id_1 && id_1 !== '')
        let resultado_1 = parametros(id_1, param_1, config_1.config);

        let cond = elemento?.condicao.par2;

        let id_2 = elemento?.condicao.par3.replace(/\D+/g, ""); 
        let param_2 = elemento?.condicao.par3.replace(/-/g , "");

        let config_2:any = resto.find(elemento => elemento.id === id_2 && id_2 !== '');
        let resultado_2  = (config_2 !== undefined) ? parametros(id_2, param_2, config_2.config) : 'vazio';

        if (condicao(resultado_1, cond, resultado_2)) {
            setarConfig(elemento?.acao.id, elemento?.acao.tipo, resto, elemento?.acao.alterado);
        }
    }

    function setarConfig (id:string | undefined, param: string | undefined, configs: PropsConfig[], valorAlterado: string | undefined) {
        let dado:any = configs.find(elemento => elemento.id === id);
        switch (param) {
            case 'width': dado.config.width = valorAlterado; break;
            case 'height': dado.config.height = valorAlterado; break;
            case 'bgColor': dado.config.bgColor = valorAlterado; break;
            case 'boxShadow': dado.config.boxShadow = valorAlterado; break;
            case 'borderRadius': dado.config.borderRadius = valorAlterado; break;
            case 'textoArea': dado.config.textoArea = valorAlterado; break;
            case 'fontColor': dado.config.fontColor = valorAlterado; break;
            case 'fontSize': dado.config.fontSize = valorAlterado; break;
            case 'fontFamily': dado.config.fontFamily = valorAlterado; break;
            case 'fontWeight': dado.config.fontWeight = valorAlterado; break;
            case 'svgColor': dado.config.svgColor = valorAlterado; break;
            case 'opacity': dado.config.opacity = valorAlterado; break;
            case 'zIndex': dado.config.zIndex = valorAlterado; break;
            case 'primeirapagina': Router.push('primeirapagina'); break;
            case 'segundapagina': Router.push('segundapagina'); break;
            case 'terceirapagina': Router.push('terceirapagina'); break;
            default: dado.config.textoArea = valorAlterado; break;
        }
        setConfiguracoes([...configuracoes]);
    }
    
    function parametros (id:string | undefined, param: string | undefined, config: Config) {
        if (id !== undefined) {
            switch (param) {
                case id+'  '+'width': return config.width;
                case id+'  '+'height': return config.height;
                case id+'  '+'bgColor': return config.bgColor;
                case id+'  '+'boxShadow': return config.boxShadow;
                case id+'  '+'borderRadius': return config.borderRadius;
                case id+'  '+'textoArea': return config.textoArea;
                case id+'  '+'fontColor': return config.fontColor;
                case id+'  '+'fontSize': return config.fontSize;
                case id+'  '+'fontFamily': return config.fontFamily;
                case id+'  '+'fontWeight': return config.fontWeight;
                case id+'  '+'svgColor': return config.svgColor;
                case id+'  '+'opacity': return config.opacity;
                case id+'  '+'zIndex': return config.zIndex;
                default: return config.textoArea;
            }
        }
    }

    function condicao (parametro1: string | undefined, parametro2: string | undefined, parametro3: string | undefined) {
        parametro1 = (parametro1 !== undefined) ? parametro1 : '';
        parametro2 = (parametro2 !== undefined) ? parametro2 : '';
        parametro3 = (parametro3 !== undefined) ? parametro3 : '';
        switch(parametro2) { 
          case 'Maior': return (parametro1 > parametro3);
          case 'Menor': return (parametro1 < parametro3);
          case 'Igual': return (parametro1 === parametro3);
          case 'Diferente': return (parametro1 !== parametro3);
          case 'Maior ou Igual': return (parametro1 >= parametro3);
          case 'Menor ou Igual': return (parametro1 <= parametro3);
          default: return false;
        }
    }

    return (
        <EventContext.Provider 
            value={{ 
                initialNodes, initialEdges, onNodesChange,
                setInitialNodes, setInitialEdges, nomeTooltip, setNomeTooltip,
                quantidadeEventos, setQuantidadeEventos,
                queryEvento, setQueryEvento, buscarQuery,
                deletarQuery, removeEvento, renomearNode,plataformaEvento 
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
        setInitialNodes, setInitialEdges, nomeTooltip, setNomeTooltip,
        quantidadeEventos, setQuantidadeEventos,
        queryEvento, setQueryEvento, buscarQuery,
        deletarQuery, removeEvento, renomearNode,plataformaEvento
    } = context;
    return { 
        initialNodes, initialEdges, onNodesChange,
        setInitialNodes, setInitialEdges, nomeTooltip, setNomeTooltip,
        quantidadeEventos, setQuantidadeEventos,
        queryEvento, setQueryEvento, buscarQuery,
        deletarQuery, removeEvento, renomearNode,plataformaEvento
    };
}