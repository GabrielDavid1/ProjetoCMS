import React from "react";

import { useConfig } from './useConfig';

interface List {
  id: string;
  name: string;
  children: List[]
}

interface ListContextValue {
  idTotal: string;

  list: List[];

  toggleLateral: boolean;

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

  setToggleLateral: (data: boolean) => void;

  setList: (data: List[]) => void;
  removerDaLista: ( id: string, nodes:List ) => void;
  renomearElemento: ( id: string, nodes:List, nome:string ) => void;

  setNomeSelecionado: (data: string) => void;
  
  setGrupo: (data: boolean) => void;
  setCopiaGrupo: (data: List[]) => void;
  setAdicionaGrupo: (data: boolean) => void;

  setSelected: (data: string[]) => void;
  setSelectedAll: (data: boolean) => void;
  deletarTudo: () => void;
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
      children: [
        {
          id: '0.9',
          name: '',
          children: [],
        }, 
      ]
    }
  ],

  toggleLateral: false,

  nomeAlterado: '',
  nomeSelecionado: '',

  grupo: false,
  copiaGrupo: [{
    id: '0',
    name: "",
    children: []
  }],
  adicionaGrupo: false,
  
  selected: [],
  selectedAll: true,
  expanded: ['root'],
  
  tamanho: 0,

  setIdTotal: data => {},

  setToggleLateral: data => {},

  setList: data => {},
  removerDaLista: data => {},
  renomearElemento: data => {},

  setNomeSelecionado: data => {},

  setGrupo: data => {},
  setCopiaGrupo: data => {},
  setAdicionaGrupo: data => {},

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
  
  const { configuracoes, setConfiguracoes } = useConfig();

  const removerDaLista = ( id: string, nodes:List ) => {
    let copiaExpanded = expanded;
    let index = nodes.children.findIndex(elemento => elemento.id === id);

    if (index === -1) {
      Array.isArray(nodes.children)
      ? nodes.children.map((node) => removerDaLista(id, node))
      : null  
    } else {
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

  /********************* Botões Inferiores *******************/
  function deletarTudo () {
    if (selected.length > 0) {
        list[0].children = [];
        setList({...list});
        if (configuracoes.length > 0) {
            setConfiguracoes([]);
        }
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

  return (
    <ListContext.Provider 
      value={{
        nomeAlterado, renomearElemento,
        idTotal, setIdTotal,
        nomeSelecionado, setNomeSelecionado,
        list, setList, removerDaLista,
        toggleLateral, setToggleLateral,
        tamanho, setTamanho,
        copiaGrupo, setCopiaGrupo,
        adicionaGrupo, setAdicionaGrupo, 
        grupo, setGrupo, 
        selected, setSelected,
        selectedAll, setSelectedAll,
        marcarTudo, deletarTudo, 
        onToggleMarcarTudo,
        expanded, setExpanded
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
      toggleLateral, setToggleLateral,
      tamanho, setTamanho,
      copiaGrupo, setCopiaGrupo,
      adicionaGrupo, setAdicionaGrupo, 
      grupo, setGrupo, 
      selected, setSelected,
      selectedAll, setSelectedAll,
      marcarTudo, deletarTudo, 
      onToggleMarcarTudo,
      expanded, setExpanded
    } = context;
    
    return { 
      nomeAlterado, renomearElemento,
      idTotal, setIdTotal,
      nomeSelecionado, setNomeSelecionado,
      list, setList,  removerDaLista,
      toggleLateral, setToggleLateral,
      tamanho, setTamanho,
      copiaGrupo, setCopiaGrupo,
      adicionaGrupo, setAdicionaGrupo, 
      grupo, setGrupo, 
      selected, setSelected,
      selectedAll, setSelectedAll,
      marcarTudo, deletarTudo, 
      onToggleMarcarTudo,
      expanded, setExpanded
    };
}