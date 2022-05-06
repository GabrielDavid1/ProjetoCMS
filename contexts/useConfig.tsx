/* React */
import React from "react";

/* Tipagem e Variaveis*/
import { Config } from '../Importacoes/Tipagens/Tipagem';
import { propriedadeEstilo } from '../Importacoes/Variaveis/Variaveis';

interface PropsConfig {
    id: string;
    type: string; 
    tipoCache?: string;
    idGrupo: string;
    config?: Config;
}

type LargAltProps = {
    width: string;
    height: string;
}
interface ModalContextValue {
    idTotal: string,
    configuracoes: PropsConfig[];
    LargAlt: LargAltProps;

    setIdTotal: (data: string) => void;
    setLargAlt: (data: LargAltProps) => void;
    setConfiguracoes: (data: PropsConfig[]) => void;

    buscarConfigs: (id:string) => void;
    addConfig: (id:string, type:string, idGrupo:string, nomePagina: string) => void;
    addConfigNoGrupo: (id:string, text:string) => void;

    retornarQuantidade: (tipo:string) => number;
    retornarTipoElemento: (id:string) => string;

    setarIdConfig: (id:string) => void;

    removerTudo: () => void;
    removerConfigs: (id:string) => void;
    removerDeGrupo: (idGrupo:string, tamanho:number) => void;
}
interface Props {
    children: React.ReactNode;
}

const listInitial: ModalContextValue = {
    idTotal: '',

    LargAlt: {
        width: '150px',
        height: '150px'
    },

    configuracoes: [{
        id: '',
        type: 'padrao',
        idGrupo: '0',
        config: {
            width: "0px",
            height: "0px",
            bgColor: "white",
            pxBorder: "0px",
            typeBorder: "1",
            colorBorder: "#rrggbb",
            boxShadow: "0px 0px 0px", 
            borderRadius: "0px",
        }
    }],

    setIdTotal:  data => {},
    setLargAlt:  data => {},
    setConfiguracoes:  data => {},

    buscarConfigs:  data => {},

    addConfig:  data => {},
    addConfigNoGrupo:  data => {},
    retornarQuantidade:  data => 0,
    retornarTipoElemento:  data => '',

    setarIdConfig:  data => {},

    removerTudo: () => {},
    removerConfigs:  data => {},
    removerDeGrupo:  data => {},
};

const ConfigContext = React.createContext<ModalContextValue>(listInitial);

export function ConfigProvider({ children }: Props) {
    const [ idTotal, setIdTotal ] = React.useState<string>('');
    const [LargAlt, setLargAlt] = React.useState<LargAltProps>({ width: '100px', 
                                                                 height: '100px'});
    const [ configuracoes, setConfiguracoes ] = React.useState<PropsConfig[]>([listInitial.configuracoes[0]]);

    const buscarConfigs = (id:string) => { 
        let index = configuracoes.findIndex(elemento => elemento.id === id);
        if (index !== -1) {
           return configuracoes[index].config;           
        }
    }

    const retornarQuantidade = (tipo:string) => { 
        let tamanho = 0;
        let grupoEstatico:string[] = [];
        configuracoes.map(elemento => (elemento.tipoCache === tipo) && grupoEstatico.push(elemento.type));
        grupoEstatico.map(elemento => (elemento !== 'padrao') && tamanho++); 
        return tamanho;
    }
    
    const retornarTipoElemento = (id:string) => { 
        let grupoEstatico:string[] = [];
        configuracoes.map(elemento => (elemento.id === id) && grupoEstatico.push(elemento.type));
        return grupoEstatico[0];
    } 

    const removerDeGrupo = (idGrupo:string, tamanho: number) => { 
        let grupoEstatico:string[] = [];
        if (tamanho > 0) {
            configuracoes.map(elemento => elemento.idGrupo === idGrupo && grupoEstatico.push(elemento.id) );
            grupoEstatico.map(elemento => removerConfigs(elemento)); 
        }
    }

    const addConfigNoGrupo = (id:string, idGrupo:string) => { 
        setConfiguracoes(
            configuracoes.map(el => (el.id === id && el.config !== undefined
                ? {...el, idGrupo: idGrupo}
                : el
            ))
        )        
    }

    const filtrarTipos = (tipo: string) => {
        switch (tipo) {
            case 'Retangulo': return propriedadeEstilo.retangulo;
            case 'Text': return propriedadeEstilo.text;
            case 'Input': return propriedadeEstilo.input;
            case 'Tabela': return propriedadeEstilo.tabela;
            case 'Botao': return propriedadeEstilo.botao;
            case 'Grafico': return propriedadeEstilo.grafico;
            case 'TextArea': return propriedadeEstilo.textArea;
            case 'Imagem': return propriedadeEstilo.imagem;
            default: return {};
        }
    }

    const addConfig = ( id:string, type:string, idGrupo = '0' as string, nomePagina: string ) => {
        if (type !== "off") {
            let dado = ({
                id: String(id),
                type: type,
                tipoCache: nomePagina,
                idGrupo: idGrupo,
                config: filtrarTipos(type)
            });
            setIdTotal(id);
            setConfiguracoes(configuracoes => [...configuracoes, dado]);
        }
    }

    function setarIdConfig (id: string) {
        setIdTotal(id);
    }

    const removerConfigs = (id:string) => { 
        let index = configuracoes.findIndex(elemento => elemento.id === id);
        if (index !== -1) {
            delete configuracoes[index];
            configuracoes.splice(index, 1);
            setConfiguracoes([...configuracoes]);  
        }
    }
    
    const removerTudo = () => {
        configuracoes.splice(0, configuracoes.length);
        setConfiguracoes([]);
        setConfiguracoes([...configuracoes]); 
    }

    return (
        <ConfigContext.Provider 
            value={{ 
                idTotal, setIdTotal, addConfig, addConfigNoGrupo,
                configuracoes, buscarConfigs, LargAlt, setLargAlt,
                setConfiguracoes, removerConfigs, removerTudo,
                removerDeGrupo, setarIdConfig,retornarQuantidade,
                retornarTipoElemento
            }} 
        >
        {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    const context = React.useContext(ConfigContext);
    const {  
           idTotal, setIdTotal, addConfig, addConfigNoGrupo,
           configuracoes, buscarConfigs, LargAlt, setLargAlt,
           setConfiguracoes, removerConfigs, removerTudo,
           removerDeGrupo,setarIdConfig,retornarQuantidade,
           retornarTipoElemento
          } = context;
    return {  
        idTotal, setIdTotal, addConfig, addConfigNoGrupo,
        configuracoes, buscarConfigs, LargAlt, setLargAlt,
        setConfiguracoes, removerConfigs, removerTudo,
        removerDeGrupo, setarIdConfig,retornarQuantidade,
        retornarTipoElemento
    };
}