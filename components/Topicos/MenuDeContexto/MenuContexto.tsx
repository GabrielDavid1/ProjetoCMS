/* Contexto */
import { useList } from '../../../contexts/useTopicos';
import { useModal } from '../../../contexts/useModal';

/* Menu de Contexto e icones */
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaPen,FaRegWindowRestore} from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'

interface tipagemProps {
    grupo: boolean;
}
interface List {
    id: string;
    name: string;
    children: List[];
  }

export const MenuContexto = (( {grupo} : tipagemProps) => {
    const {
        idTotal, 
        adicionaGrupo, copiaGrupo,
        setSelected, setAdicionaGrupo,
        expanded, setExpanded
    } = useList();

    const { handleOpen, handleOpen2 } = useModal();

    /* impede ações nos elementos filhos do grupo escolhido */
    const filhosDoGrupo = ( nodes:List ) => {
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

    const acionarToggles = () => {
        let copiaExpanded = expanded;
        setSelected([idTotal]);
        setAdicionaGrupo(!adicionaGrupo);
        filhosDoGrupo(copiaGrupo[0]);
        setExpanded(copiaExpanded);
    }

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