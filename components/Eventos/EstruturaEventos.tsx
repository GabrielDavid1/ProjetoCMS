/* Framework Material-UI */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

/* Tipagens */
import { Config, Event } from '../../Importacoes/Tipagens/Tipagem';

/* Contextos */
import { useConfig } from '../../contexts/useConfig';
import { useList } from '../../contexts/useTopicos';
import { useEvent } from '../../contexts/useEvent';

interface List {
    id: string;
    name: string;
    tipoCache: string,
    evt?: Event,
    config?: Config;
    children: List[];
}

type Props = {
    nomePagina: string;
}

export default function EstruturaEventos ({ nomePagina }:Props) {
    const { list, nomesAgrupados } = useList();
    const { retornarTipoElemento } = useConfig();
    const { initialNodes, setInitialNodes, nomeTooltip } = useEvent();

    const [expanded, setExpanded] = React.useState<string[]>(['root']);
    const [selected, setSelected] = React.useState<string[]>([]);

    const [expanded2, setExpanded2] = React.useState<string[]>([]);
    const [selected2, setSelected2] = React.useState<string[]>(['root']);
    
    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
      setExpanded(nodeIds);
    };
  
    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
      setSelected(nodeIds);
    };

    const handleToggle2 = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded2(nodeIds);
    };
    
    const handleSelect2 = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected2(nodeIds);
    };

    function plataformaBotoes (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string, nodes:List) {
        if (event.detail === 2 && id !== 'root' && nodes.children.length === 0) {
            setInitialNodes([...initialNodes,
              { id: id,
                data: { label: nodes.name }, 
                style: {backgroundColor: '#1976d2', color: 'white'}, 
                type: 'input',position: { x: 500, y: 100   } 
              }]);
        }
    }

    function plataformaOutros (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string, nodes:List) {
        if (event.detail === 2 && id !== 'root' && nodes.children.length === 0) {
            setInitialNodes([...initialNodes,
              { id: id,
                data: { label: nodes.name }, 
                type: 'output',position: { x: 500, y: 200   } 
              }]);
        }
    }

    /************************************************** [SUB COMPONENTES] ***************************************************************/
    const renderTreeBotoes = (nodes:List) => (      
      ((nodes !== undefined && nodes.tipoCache === nomePagina && 
        retornarTipoElemento(nodes.id) === 'Botao' && 
        nomesAgrupados.find(elemento => elemento.id === nodes.id)?.evt !== undefined) 
        || nodes.id === 'root') ? ( 

        <TreeItem onClick={(e) => plataformaBotoes(e, nodes.id, nodes)} key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {
            Array.isArray(nodes.children)
              ? nodes.children.map((node) => renderTreeBotoes(node)) 
              : null
          }
        </TreeItem>
      ):( <div key={nodes.id}> </div> )
    );

    const renderTreeOutros = (nodes:List) => (      
      ((nodes !== undefined && nodes.tipoCache === nomePagina && retornarTipoElemento(nodes.id) !== 'Botao') || nodes.id === 'root') ? (    
        <TreeItem onClick={(e) => plataformaOutros(e, nodes.id, nodes)} key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {
            Array.isArray(nodes.children)
              ? nodes.children.map((node) => renderTreeOutros(node)) 
              : null
          }
        </TreeItem>
      ):( <div key={nodes.id}> </div> )
    );

    return (
        <div className="blocoEventos"> 
          <div className="blocoBotoesEvento">
            <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
              <div className="subTituloEventos">
                <h3>BOTÕES</h3>
              </div>
              <TreeView
                    aria-label="controlled"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                    multiSelect
              >
                {renderTreeBotoes(list[0])}
              </TreeView>
            </Box>
            </div>
            <div className="blocoOutrosEventos">
            <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
              <div className="subTituloEventos">
                <h3>OUTROS ELEMENTOS</h3>
              </div>
              <TreeView
                    aria-label="controlled"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded2}
                    selected={selected2}
                    onNodeToggle={handleToggle2}
                    onNodeSelect={handleSelect2}
                    multiSelect
              >
                {renderTreeOutros(list[0])}
              </TreeView>
            </Box>
          </div>
        </div>
    )
}