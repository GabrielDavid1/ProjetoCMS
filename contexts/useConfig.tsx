/* React */
import React from "react";

/* Contexto */ 
import { useList } from './useTopicos';

/* Tipagem */
import { Config } from '../Importacoes/Tipagens/Tipagem';
interface PropsConfig {
    id: string,
    type: string, 
    config?: Config;
}

interface ModalContextValue {
    idTotal: string,
    configuracoes: PropsConfig[];
    buscarConfigs: (id:string) => void;
    setConfiguracoes: (data: PropsConfig[]) => void;
    setIdTotal: (data: string) => void;
    removerConfigs: (id:string) => void;
}

interface Props {
    children: React.ReactNode;
}

const listInitial: ModalContextValue = {
    idTotal: '',
    configuracoes: [{
         id: '0',
         type: 'off',
    }],
    buscarConfigs:  data => {},
    setConfiguracoes:  data => {},
    setIdTotal:  data => {},
    removerConfigs:  data => {},
};

const ConfigContext = React.createContext<ModalContextValue>(listInitial);

export function ConfigProvider({ children }: Props) {
    const { expanded, setExpanded } = useList();
    const [ configuracoes, setConfiguracoes ] = React.useState<PropsConfig[]>([]);
    const [ idTotal, setIdTotal ] = React.useState<string>('');

    const buscarConfigs  =  (id:string) => { 
        let copiaExpanded = expanded;
        let index = configuracoes.findIndex(elemento => elemento.id === id);
    
        if (index !== -1) {
           return configuracoes[index].config;           
        }
        setExpanded(copiaExpanded);
    }

    const removerConfigs  =  (id:string) => { 
        let index = configuracoes.findIndex(elemento => elemento.id === id);
        if (index !== -1) {
            configuracoes.splice(index, 1); 
            setConfiguracoes([...configuracoes]);      
        } 
    }

    return (
        <ConfigContext.Provider value={{ configuracoes, buscarConfigs, 
                                         setConfiguracoes, removerConfigs,
                                         idTotal, setIdTotal 
                                       }} >
        {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    const context = React.useContext(ConfigContext);
    const {  configuracoes, buscarConfigs,
             setConfiguracoes, removerConfigs, idTotal, setIdTotal  } = context;
    return { configuracoes, buscarConfigs,
             setConfiguracoes, removerConfigs, idTotal, setIdTotal };
}