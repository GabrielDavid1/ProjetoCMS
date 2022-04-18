import {ButtonTopic} from './Button';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { useState, useCallback, useEffect } from 'react';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaPen,FaRegWindowRestore} from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {useList} from '../../../contexts/useTopicos';

interface RenderTree {
  id: string;
  name: string;
  children: RenderTree[];
}

interface tipagemProps {
  grupo: boolean;
}

const ButtonList = [
	{
    id: '1',
		name: "Retangulo",
    path: "M2 4h20v16H2z"
	},
	{
    id: '2',
		name: "Text",
    path: "M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"
	},
	{
    id: '3',
		name: "Input",
    path: "M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"
	},
	{ id: '4',
		name: "Check Box",
    path: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
	},	
  { id: '5',
		name: "Text Área",
    path: "M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"
	},
  { id: '6',
		name: "Divisor",
    path: "M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"
	},
  { id: '7',
		name: "Calendário",
    path: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
	},
  { id: '8',
		name: "Graficos",
    path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
	},
  { id: '9',
		name: "Link",
    path: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
	},
  { id: '10',
		name: "Imagem",
    path: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
	},
  { id: '11',
		name: "Opções",
    path: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
	},
  { id: '12',
		name: "Api",
    path: "M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"
	},
]

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
}));

/* Estilização do Modal Renomear */
const styleRenomear = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '91.1%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/* Estilização do Modal Deletar */
const styleDeletar = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '91.1%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Config () {

  const {list, setList, tamanho, setTamanho} = useList();
  
  let nomeAlterado = '';
  const [nomeSelecionado, setNomeSelecionado] = useState('');

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [grupo, setGrupo] = useState(false);

  const [copiaGrupo, setCopiaGrupo] = useState<RenderTree[]>([]);
  const [adicionaGrupo, setAdicionaGrupo] = useState(false);

  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>(['root']);

  const [idTotal, setIdTotal] = useState<string>('0');

  const [botaoAtivado, setBotaoAtivado] = useState([{id: 1, status: false},
                                                    {id: 2, status: false},
                                                    {id: 3, status: false}]);
  /*****************************  Funções *************************************/
  const handleOpen = () => { setOpen(true);}
  const handleClose = () => { setOpen(false);}

  const handleOpen2 = () => { setOpen2(true);}
  const handleClose2 = () => { setOpen2(false);}

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  function handleSelect (event: React.SyntheticEvent, nodeIds: string[])  {

    let idBuscado = nodeIds+'';

    if( selected[0] !== idBuscado && adicionaGrupo === false ){ 
      setSelected(nodeIds);
    }else {
      setSelected([idTotal]); 
    }

  };

  function handleExpandClick (id: string)  {
    
      let index = expanded.findIndex(elemento => elemento === id);

      if (index !== -1) {
        expanded.splice(index, 1);
        setExpanded({...expanded}); 
      } else if(index === -1) {
        expanded.push(id);
        setExpanded({...expanded}); 
      }

  };

  function toggleBotoesInferiores (id: number, status: boolean) {
     if(id === 1) {
        setBotaoAtivado([{id: 1, status: !botaoAtivado[0].status}, {id: 2, status: false}, {id: 3, status: false}]);   
        addGrupo();  
     }
    
     if(id === 2) { 
        setBotaoAtivado([{id: 2, status: false}, {id: 2, status: !botaoAtivado[1].status}, {id: 3, status: false}]);
        
        if(botaoAtivado[1].status === false) {
          marcarTudo();
        } else {
          setSelected([]);
        }
     }

     if(id === 3) {
        setBotaoAtivado([{id: 3, status: false}, {id: 2, status: false}, {id: 3, status: !botaoAtivado[2].status}]); 
        deletarTudo(); 
     }   
  }

  function renomearElemento ( id: string, nodes:RenderTree, name: string ) {

    let copiaExpanded = expanded;
    let index = nodes.children.findIndex(elemento => elemento.id === id);

    if (index === -1) {
      Array.isArray(nodes.children)
      ? nodes.children.map((node) => renomearElemento(id, node, name))
      : null  
    } else {
      nodes.children[index].name = name;
      setList({...list});
      setExpanded(copiaExpanded);
    }

  }

  function removerDaLista ( id: string, nodes:RenderTree ) {
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
    handleClose2();
    setExpanded(copiaExpanded);
  }

  function acionarToggles () {
    let copiaExpanded = expanded;
    setSelected([idTotal]);
    setAdicionaGrupo(!adicionaGrupo);
    filhosDoGrupo(copiaGrupo[0]);
    setExpanded(copiaExpanded);
  }

  function handleSubmit(Event: React.FormEvent<HTMLFormElement>) {
    setOpen(false);
    renomearElemento(idTotal, list[0], nomeAlterado);
    Event.preventDefault();
  }

  function addGrupo ( ) {
    let id = String(tamanho+1);
    list[0].children.push({
      id: id,
      name: 'Novo Grupo',
      children: [{
        id: String(tamanho+2),
        name: '',
        children: [],
      }],
    });
    setList({...list});
    setTamanho(tamanho+2);
  }

  function addElementoSolo (name: string) {
    let id = tamanho+1;

    list[0].children.push({
      id: String(id),
      name: name,
      children: [],
    });
    setList({...list});
    setTamanho(id);
  }

  function addSoloEmGrupo ( nome: string, nodes:RenderTree ) {

    let grupoEstatico:string[] = [];
    let id = tamanho+1;

    nodes.children.map((node) => {
      if(node.id === String(id)) {
        grupoEstatico.push(node.id);
      }
    });

    let index = grupoEstatico.findIndex(element => element === String(id));

    if (index === -1) {
      nodes.children.push({
        id: String(id),
        name: nome,
        children: [],
      });
      setList({...list});
    }
    setTamanho(id);
  }

  function plataformaElemento ( nome: string, nodes:RenderTree ) {
    if (adicionaGrupo === false) 
        addElementoSolo(nome);
    else 
        addSoloEmGrupo(nome, nodes);
  }

  function deletarTudo () {
      if (selected.length > 0) {
        list[0].children = [];
        setList({...list});
      }
  }

  /* impede ações nos elementos filhos do grupo escolhido */
  function filhosDoGrupo( nodes:RenderTree ) {

    nodes.children.map((node) => { 
      if(node.children.length > 0) {
        let index = expanded.findIndex(elemento => elemento === node.id);

        if(index !== -1 && node.id !== idTotal){
          expanded.splice(index, 1);
          setExpanded({...expanded}); 
        }
      }
    });

  }

  function addNoGrupo( id:string, nodes:RenderTree, elemento:RenderTree ) {
    let copiaExpanded = expanded;
    let grupoEstatico:string[] = [];

    nodes.children.map((node) => {
      if(node.id === id) {
        grupoEstatico.push(node.id);
      }
    });

    let index = grupoEstatico.findIndex(element => element === id);
    if (index === -1) {
      nodes.children.push(elemento);
      setList({...list});
      removerDaLista(id, list[0]);
    }
    setExpanded(copiaExpanded);
  }

  function change (event: React.ChangeEvent<HTMLInputElement>) {
    nomeAlterado = event.target.value;
  }

  function marcarTudo () {
      setSelected(['root']);
      let grupoEstatico:string[] = [];
      list[0].children.map((node) => {
          grupoEstatico.push(node.id);      
      })
      setSelected(grupoEstatico);  
  } 

  /*****************************  Sub-Componentes *************************************/

  const ModalDeletar = (() => {
    return (
      <div>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleDeletar}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               {"Tem certeza que deseja deletar o elemento: "+nomeSelecionado+"?"}
            </Typography>
            <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => removerDaLista(idTotal,list[0])}>Sim</Button>
            <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => handleClose2()}>Não</Button>
          </Box>
        </Modal>
      </div>
    );
  });

  const ModalRenomear = (() => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleRenomear}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Renomear elemento
            </Typography>
              <form onSubmit={handleSubmit}>
                  <input onChange={change} type="text" />    
              </form>
          </Box>
        </Modal>
      </div>
    );
  });

  const MenuContexto = (( {grupo} : tipagemProps) => {
    return (
      <> 
        <ContextMenu id="contextmenu">

          {grupo && 
            <MenuItem onClick={() => acionarToggles()}>
              <FaRegWindowRestore className="addgrupo"/>
              <span> {adicionaGrupo ? 'Parar de adicionar' :  'Adicionar no Grupo' } </span>
            </MenuItem> 
          } 

          <MenuItem onClick={handleOpen}>
            <FaPen className="renomear"/>
            <span>Renomear</span>
          </MenuItem>

          <MenuItem onClick={handleOpen2}>
            <RiDeleteBin6Line className="remover"/>
            <span>Remover</span>
          </MenuItem>

        </ContextMenu>
      </>
    );

  });
  
  const Arvore = useCallback(() => {
    
    function plataforma (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string, nodes:RenderTree) {
      let copiaExpanded = expanded;
      setNomeSelecionado(nodes.name);

      if (adicionaGrupo && id !== selected[0]) {
          addNoGrupo(id, copiaGrupo[0], nodes);
      } else {
        setIdTotal(id);
        setCopiaGrupo([nodes]);
        
        if ( nodes.children.length > 0 ) {
          setGrupo(true);
          handleExpandClick(id);
        } else {
          setGrupo(false);
        }

      } 
      setExpanded(copiaExpanded);
    }

    const renderTree = (nodes:RenderTree) => (      
        (nodes !== undefined) ? (   
          <TreeItem onClick={(e) => plataforma(e, nodes.id, nodes)} key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
              ? nodes.children.map((node) => renderTree(node)) 
              : null}
          </TreeItem>
        ) : ( <> </> )
    );
    
    return (
      <TreeView
        aria-label="controlled"
        onNodeToggle={handleToggle}
        expanded={expanded}
        defaultCollapseIcon={<ExpandMoreIcon />}
        selected={selected}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleSelect}
        sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}> 

        <ContextMenuTrigger id="contextmenu">
          {renderTree(list[0])}
        </ContextMenuTrigger>

        <MenuContexto grupo={grupo} />
      </TreeView>
    );

    } , [list, expanded, copiaGrupo, nomeSelecionado, selected]); 

  const TopicosConfig = () => {
      return (
          <>
          <div className="topics">
            <div className="control">
                {
                  ButtonList.map(({ name, path }, index) => {
                    return (
                      <div key={index}>
                      <BootstrapTooltip key={index} title={name}>
                          <Button onClick={() => plataformaElemento(name, copiaGrupo[0]) } variant="contained" >
                              <ButtonTopic name={name} path={path}  />
                          </Button>
                      </BootstrapTooltip>
                      </div>
                    )
                  })
                }
            </div>

            <div className="opcoes">           
                <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => toggleBotoesInferiores(1, true)}>  Grupo </Button>
                <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => toggleBotoesInferiores(2, false)}> Marcar Tudo </Button> 
                <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => toggleBotoesInferiores(3, false)}> Deletar Tudo </Button>  
            </div>

          </div>
              
          <div className="todo">
              <Arvore /> 
          </div>
          </>
      )
  }

  return (
      <> 
        <ModalDeletar />
        <ModalRenomear />
        <TopicosConfig /> 
      </>
  )

}






