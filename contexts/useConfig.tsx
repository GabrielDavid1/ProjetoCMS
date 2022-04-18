import React from "react";

/* Contexto */ 
import { useList } from './useTopicos';

interface Config {
    width?: string;
    height?: string;
  
    bgColor?: string;
    
    fontSize?: string;
    fontColor?: string;
  
    typeBorder?: string;
    colorBorder?: string;
    
    boxShadow?: string;
  
    positionX?: string;
    positionY?: string;
}

interface PropsConfig {
    id: string,
    type: string, 
    config?: Config;
}

interface ModalContextValue {
    configuracoes: PropsConfig[];
    buscarConfigs: (id:string) => void;
    setConfiguracoes: (data: PropsConfig[]) => void;
    removerConfigs: (id:string) => void;
}

interface Props {
    children: React.ReactNode;
}

const listInitial: ModalContextValue = {
    configuracoes: [{
         id: '0',
         type: 'off',
    }],
    buscarConfigs:  data => {},
    setConfiguracoes:  data => {},
    removerConfigs:  data => {},
};

const ConfigContext = React.createContext<ModalContextValue>(listInitial);

export function ConfigProvider({ children }: Props) {
    const { expanded, setExpanded } = useList();
    const [ configuracoes, setConfiguracoes ] = React.useState<PropsConfig[]>([]);

    const buscarConfigs  =  (id:string) => { 
        let copiaExpanded = expanded;
        let index = configuracoes.findIndex(elemento => elemento.id === id);
    
        if (index !== -1) {
           return configuracoes[index].config;           
        }
        setExpanded(copiaExpanded);
    }

    const removerConfigs  =  (id:string) => { 
        let copiaExpanded = expanded;
        let index = configuracoes.findIndex(elemento => elemento.id === id);
    
        if (index !== -1) {
            configuracoes.splice(index, 1); 
            setConfiguracoes([...configuracoes]);      
        } 
        setExpanded(copiaExpanded);
    }

    return (
        <ConfigContext.Provider value={{ configuracoes, buscarConfigs, setConfiguracoes, removerConfigs }} >
        {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    const context = React.useContext(ConfigContext);
    const {  configuracoes, buscarConfigs, setConfiguracoes, removerConfigs  } = context;
    return { configuracoes, buscarConfigs, setConfiguracoes, removerConfigs };
}