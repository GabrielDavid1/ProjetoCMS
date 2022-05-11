/* React */
import React from "react";
import Router from 'next/router';

/* Nookies */
import { setCookie } from 'nookies';

/* Contextos */
import { useList } from './useTopicos';
import { useConfig } from './useConfig';
import { useEvent } from './useEvent';

interface PropsPagina {
    identificador: string;
    nomePagina: string;
    iconeId: string;
}

interface ModalContextValue {
    configPagina: PropsPagina[],
    setConfigPagina: (data: PropsPagina[]) => void;
    salvarConfiguracoes: (rota: string) => void;
}
interface Props {
    children: React.ReactNode;
}

const listInitial: ModalContextValue = {
    configPagina: [
        {
          identificador: '1',
          nomePagina: 'Primeira Página',
          iconeId: '1',    
        },
        {
          identificador: '2',
          nomePagina: 'Segunda Página',
          iconeId: '2',    
        },
        {
          identificador: '3',
          nomePagina: 'Terceira Página',
          iconeId: '2',    
        },
    ],
    setConfigPagina:  data => {},
    salvarConfiguracoes:  data => {},
};

const CacheContext = React.createContext<ModalContextValue>(listInitial);

export function CacheProvider({ children }: Props) {
    const [ configPagina, setConfigPagina ]  = React.useState<PropsPagina[]>(listInitial.configPagina);

    const { initialNodes, initialEdges, nomeTooltip, queryEvento, quantidadeEventos } = useEvent();
    const { list, tamanho } = useList();
    const { configuracoes } = useConfig();


    function salvarConfiguracoes (rota: string) {
        setCookie(null, 'LISTA', JSON.stringify(list), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        setCookie(null, 'CONFIG', JSON.stringify(configuracoes), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        setCookie(null, 'TAMANHO', JSON.stringify(tamanho), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        setCookie(null, 'CONFIGPAGINA', JSON.stringify(configPagina), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        setCookie(null, 'INITIAL_NODES', JSON.stringify(initialNodes), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        setCookie(null, 'INITIAL_EDGES', JSON.stringify(initialEdges), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        setCookie(null, 'NOME_TOOLTIP', JSON.stringify(nomeTooltip), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        setCookie(null, 'QUERY_EVENTO', JSON.stringify(queryEvento), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        setCookie(null, 'QUANTIDADE_EVENTOS', JSON.stringify(quantidadeEventos), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        Router.push(rota);
      }

    return (
        <CacheContext.Provider 
            value={{ configPagina, setConfigPagina, salvarConfiguracoes }}
        >
        {children}
        </CacheContext.Provider>
    );
}

export function useCache() {
    const context = React.useContext(CacheContext);
    const  { configPagina, setConfigPagina, salvarConfiguracoes } = context;
    return { configPagina, setConfigPagina, salvarConfiguracoes };
}