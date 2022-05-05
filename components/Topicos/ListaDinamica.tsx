/* Contextos */
import { useList } from '../../contexts/useTopicos';
import { useConfig } from '../../contexts/useConfig';
import { useEvent } from '../../contexts/useEvent';

/* Icones para Elemento */
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

/* importação para aplicar menu de contexto */
import { ContextMenuTrigger } from "react-contextmenu";
import { MenuContexto } from './MenuDeContexto/MenuContexto';

/* Tipagens */
import { Config } from '../../Importacoes/Tipagens/Tipagem';
interface List {
    id: string;
    name: string;
    tipoCache: string,
    config?: Config;
    children: List[];
}

type Props = {
    nomePagina: string;
}

export function ListaDinamica ({ nomePagina }:Props) {
    const {
         list, setList, removerDaLista,
         setIdTotal, idTotal,
         adicionaGrupo, 
         grupo, setGrupo, 
         copiaGrupo, setCopiaGrupo,
         setNomeSelecionado,
         selected, setSelected,
         expanded, setExpanded
    } = useList();
    const { addConfigNoGrupo, setarIdConfig } = useConfig();
    const { quantidadeEventos } = useEvent();

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };
    
    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        let idBuscado = nodeIds+'';
        if (idBuscado !== 'root') {
            if( selected[0] !== idBuscado && adicionaGrupo === false ) { 
                setSelected(nodeIds);
            } else {
                setSelected([idTotal]); 
            }
        }
    };

    const handleExpandClick = (id: string)  =>  {
        let index = expanded.findIndex(elemento => elemento === id);
        if (index !== -1) {
            expanded.splice(index, 1);
            setExpanded({...expanded}); 
        } else if(index === -1) {
            expanded.push(id);
            setExpanded({...expanded}); 
        }
    };

    const addNoGrupo = ( id:string, nodes:List, elemento:List ) => {
        let copiaExpanded = expanded;
        let grupoEstatico:string[] = [];
    
        nodes.children.map((node) => {
            if(node.id === id) {
               grupoEstatico.push(node.id);
            }
        });

        let index = grupoEstatico.findIndex(element => element === id);
        if (index === -1) {
            removerDaLista(id, list[0]);
            nodes.children.push(elemento);
            setList({...list});
        }
        setExpanded(copiaExpanded);
    }

    const plataforma = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string, nodes:List) => {
        console.log(nodes);
        let copiaExpanded = expanded;
        setNomeSelecionado(nodes.id);
        if (adicionaGrupo && id !== selected[0] && id !== 'root') {
            addNoGrupo(id, copiaGrupo[0], nodes);
            addConfigNoGrupo(id, idTotal);
            setExpanded(copiaExpanded);
        } else if(id !== 'root') {
            setIdTotal(id);
            setCopiaGrupo([nodes]);
            if (nodes.children.length > 0) {
                setGrupo(true);
                handleExpandClick(id);
            } else {
                setGrupo(false);
                setarIdConfig(id);
            }
            setExpanded(copiaExpanded);
        } 
    }
    
    const renderTree = (nodes:List) => (      
        ((nodes !== undefined && nodes.tipoCache === nomePagina) || nodes.id === 'root') ? (    
        <TreeItem onClick={(e) => plataforma(e, nodes.id, nodes)} key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node)) 
            : null}
        </TreeItem>
        ) : ( <div key={nodes.id}> </div> )
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
}