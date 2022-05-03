/* React */
import React from "react";

interface PropsPagina {
    identificador: string;
    nomePagina: string;
    iconeId: string;
}

interface ModalContextValue {
    configPagina: PropsPagina[],
    setConfigPagina: (data: PropsPagina[]) => void;
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
};

const CacheContext = React.createContext<ModalContextValue>(listInitial);

export function CacheProvider({ children }: Props) {
    const [ configPagina, setConfigPagina ]  = React.useState<PropsPagina[]>(listInitial.configPagina);

    return (
        <CacheContext.Provider 
            value={{ configPagina, setConfigPagina }}
        >
        {children}
        </CacheContext.Provider>
    );
}

export function useCache() {
    const context = React.useContext(CacheContext);
    const  { configPagina, setConfigPagina } = context;
    return { configPagina, setConfigPagina };
}