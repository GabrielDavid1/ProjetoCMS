/* React */
import React from "react";

/* Contextos */
import { useConfig } from './useConfig';

/* Tipagem */
import { List } from '../Importacoes/Tipagens/Tipagem';

type lateral = {
  principal: boolean;
  configs: boolean;
  eventos: boolean;
}

interface ListContextValue {
  idTotal: string;

  list: List[];

  toggleLateral: lateral;

  nomeAlterado: string;
  nomeSelecionado: string;

  selectedAll: boolean;
  grupo: boolean;
  
  copiaGrupo: List[];
  adicionaGrupo: boolean;
  
  selected: string[];
  expanded: string[];
  
  tamanho: number;

  setIdTotal: (data: string) => void;

  setList: (data: List[]) => void;
  removerDaLista: ( id: string, nodes:List ) => void;
  renomearElemento: ( id: string, nodes:List, nome:string ) => void;
  buscarElemento: ( id: string, nodes:List ) => void;

  setNomeSelecionado: (data: string) => void;
  
  setGrupo: (data: boolean) => void;
  setCopiaGrupo: (data: List[]) => void;
  setAdicionaGrupo: (data: boolean) => void;

  ativarToggleLateral: ( tipo: string ) => void;

  setSelected: (data: string[]) => void;
  setSelectedAll: (data: boolean) => void;
  deletarTudo: (nomePagina: string) => void;
  marcarTudo: () => void;
  onToggleMarcarTudo: () => void;
  setExpanded: (data: string[]) => void;

  setTamanho: (data: number) => void;
}
interface Props {
  children: React.ReactNode;
}

const listInitial: ListContextValue = {
  idTotal: '',

  list: [
    {
      id: 'root',
      name: "Sua árvore de tópicos adicionados",
      tipoCache: "padrao",
      children: [
        {
          id: '0.9',
          tipoCache: "padrao",
          name: '',
          children: [],
        }, 
      ]
    }
  ],

  toggleLateral: {
    principal: true,
    configs: false,
    eventos: false,
  },

  nomeAlterado: '',
  nomeSelecionado: '',

  grupo: false,
  copiaGrupo: [{
    id: '0',
    tipoCache: "padrao",
    name: "",
    children: []
  }],
  adicionaGrupo: false,
  
  selected: [],
  selectedAll: true,
  expanded: ['root'],
  
  tamanho: 0,

  setIdTotal: data => {},

  setList: data => {},
  removerDaLista: data => {},
  renomearElemento: data => {},
  buscarElemento: data => {},

  setNomeSelecionado: data => {},

  setGrupo: data => {},
  setCopiaGrupo: data => {},
  setAdicionaGrupo: data => {},

  ativarToggleLateral: data => {},

  setSelected: data => {},
  setSelectedAll: data => {},
  marcarTudo: () => {},
  deletarTudo: () => {},
  onToggleMarcarTudo: () => {},
  setExpanded: data => {},

  setTamanho: data => {}
};

const ListContext = React.createContext<ListContextValue>(listInitial);

export function ListProvider({ children }: Props) {
  let nomeAlterado = '';
  const [idTotal, setIdTotal] = React.useState<string>(listInitial.idTotal);
  const [nomeSelecionado, setNomeSelecionado] = React.useState('');
  const [list, setList] = React.useState<List[]>([listInitial.list[0]]);
  const [toggleLateral, setToggleLateral] = React.useState(listInitial.toggleLateral);
  const [copiaGrupo, setCopiaGrupo] = React.useState<List[]>([]);
  const [adicionaGrupo, setAdicionaGrupo] = React.useState(false);
  const [grupo, setGrupo] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [selectedAll, setSelectedAll] = React.useState(listInitial.selectedAll);
  const [expanded, setExpanded] = React.useState<string[]>([listInitial.expanded[0]]);
  const [tamanho, setTamanho] = React.useState(0);

  const { configuracoes, removerDeGrupo, removerConfigs } = useConfig();

  /********************* Lista de Tópicos *******************/
  const removerDaLista = ( id: string, nodes:List ) => {
    let copiaExpanded = expanded;
    let index = nodes.children.findIndex(elemento => elemento.id === id);

    if (index === -1) {
        Array.isArray(nodes.children)
          ? nodes.children.map((node) => removerDaLista(id, node))
          : null  
    } else {
        removerDeGrupo(nodes.children[index].id, nodes.children[index].children.length);
        delete nodes.children[index];
        nodes.children.splice(index, 1);
        setList({...list});
    }
    setExpanded(copiaExpanded);
  }

  function renomearElemento ( id: string, nodes:List, name: string ) {
    let copiaExpanded = expanded;
    let index = nodes.children.findIndex(elemento => elemento.id === id);

    if (index === -1) {
        Array.isArray(nodes.children)
          ? nodes.children.map((node) => renomearElemento(id, node, name))
          : null  
    } else {
        nodes.children[index].name = name;
        setList({...list});
        setNomeSelecionado(name);
        setExpanded(copiaExpanded);
    }
  }

  function buscarElemento ( id: string, nodes:List) {
    let index = nodes.children.findIndex(elemento => elemento.id === id);

    if (index === -1) {
        Array.isArray(nodes.children)
          ? nodes.children.map((node) => buscarElemento(id, node))
          : null  
    } else {
        return nodes.children[index]
    }
  }

  /********************* Botões Inferiores *******************/
  function deletarTudo (nomePagina: string) {
    if (selected.length > 0) {
        let grupoEstatico:string[] = [];
        list[0].children.map(elemento => elemento.tipoCache === nomePagina && grupoEstatico.push(elemento.id) );
        grupoEstatico.map(elemento => removerDaLista(elemento, list[0])); 
      
        configuracoes.map(elemento => elemento.tipoCache === nomePagina && grupoEstatico.push(elemento.id) );
        grupoEstatico.map(elemento => removerConfigs(elemento)); 

        setAdicionaGrupo(false);
        setSelected([]);
    }
  }

  function marcarTudo () {
      setSelected(['root']);
      let grupoEstatico:string[] = [];
      list[0].children.map((node) => {
          grupoEstatico.push(node.id);      
      })
      setSelected(grupoEstatico);  
      setAdicionaGrupo(false);
  }

  function onToggleMarcarTudo () {
      if(selectedAll === true || selected.length === 0) {
          setSelectedAll(false);
          marcarTudo();
      } else {
          setSelectedAll(true);
          setSelected([]);
      }
  }

  /********************* Área Lateral *******************/
  function ativarToggleLateral ( tipo: string ) {
      switch (tipo) {
        case 'principal':
          toggleLateral.principal = true;
          toggleLateral.configs = false;
          toggleLateral.eventos = false;
          setToggleLateral({...toggleLateral});
        break;
        case 'configs':
          toggleLateral.principal = false;
          toggleLateral.configs = true;
          toggleLateral.eventos = false;
          setToggleLateral({...toggleLateral});
        break;
        case 'eventos':
          toggleLateral.principal = false;
          toggleLateral.configs = false;
          toggleLateral.eventos = true;
          setToggleLateral({...toggleLateral});
        break;
      }
  }

  return (
    <ListContext.Provider 
      value={{
        nomeAlterado, renomearElemento,
        idTotal, setIdTotal,
        nomeSelecionado, setNomeSelecionado,
        list, setList, removerDaLista,
        toggleLateral,ativarToggleLateral,
        tamanho, setTamanho,
        copiaGrupo, setCopiaGrupo,
        adicionaGrupo, setAdicionaGrupo, 
        grupo, setGrupo, 
        selected, setSelected,
        selectedAll, setSelectedAll,
        marcarTudo, deletarTudo, 
        onToggleMarcarTudo,
        expanded, setExpanded,
        buscarElemento
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
    const context = React.useContext(ListContext);

    const { 
      nomeAlterado, renomearElemento,
      idTotal, setIdTotal,
      nomeSelecionado, setNomeSelecionado,
      list, setList,  removerDaLista,
      toggleLateral,ativarToggleLateral,
      tamanho, setTamanho,
      copiaGrupo, setCopiaGrupo,
      adicionaGrupo, setAdicionaGrupo, 
      grupo, setGrupo, 
      selected, setSelected,
      selectedAll, setSelectedAll,
      marcarTudo, deletarTudo, 
      onToggleMarcarTudo,
      expanded, setExpanded,
      buscarElemento
    } = context;
    
    return { 
      nomeAlterado, renomearElemento,
      idTotal, setIdTotal,
      nomeSelecionado, setNomeSelecionado,
      list, setList,  removerDaLista,
      toggleLateral,ativarToggleLateral,
      tamanho, setTamanho,
      copiaGrupo, setCopiaGrupo,
      adicionaGrupo, setAdicionaGrupo, 
      grupo, setGrupo, 
      selected, setSelected,
      selectedAll, setSelectedAll,
      marcarTudo, deletarTudo, 
      onToggleMarcarTudo,
      expanded, setExpanded, 
      buscarElemento
    };
}