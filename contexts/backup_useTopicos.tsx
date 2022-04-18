import React from "react";

  interface List {
    id: string;
    name: string;
    children: List[]
  }

  interface ListContextValue {
    list: List[];
    tamanho: number;
    setList: (data: List[]) => void;
    setTamanho: (data: number) => void;
  }
  
  interface Props {
    children: React.ReactNode;
  }
  
  const listInitial: ListContextValue = {
    list: [
      {
        id: 'root',
        name: "",
        children: []
      }
    ],
    setList: data => {},
    tamanho: 0,
    setTamanho: data => {}
  };
  
  const ListContext = React.createContext<ListContextValue>(listInitial);
  
  export function ListProvider({ children }: Props) {
    const [list, setList] = React.useState<List[]>([]);
    const [tamanho, setTamanho] = React.useState(0);

    React.useEffect(() => { 
       setList([
        {
          id: 'root',
          name: 'Elementos do projeto',
          children: [],
        }, 
       ]);
    }, []);
  
    return (
      <ListContext.Provider value={{ list, setList, tamanho, setTamanho }}>
        {children}
      </ListContext.Provider>
    );
  }
  
  export function useList() {
      const context = React.useContext(ListContext);
      const  { list, setList, tamanho, setTamanho } = context;
      return { list, setList, tamanho, setTamanho };
  }