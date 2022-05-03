/* Componente Framework Material-UI */
import Button from '@mui/material/Button';

/* Contextos */ 
import { useList } from '../../../contexts/useTopicos';
import { useConfig } from '../../../contexts/useConfig';
import { useCache } from '../../../contexts/useCache';

/* Variaveis e Tipagens Padrões */
import { ButtonList } from '../../../Importacoes/Variaveis/Variaveis';
import { List } from '../../../Importacoes/Tipagens/Tipagem';

/* Componentes  */
import { ButtonTopic } from '../Button';
import { BootstrapTooltip } from './BootstrapTooltip';

type Props = {
  nomePagina: string;
}

export function PainelDeBotoes ({ nomePagina }:Props) {
    const { idTotal, list, setList, 
            tamanho, setTamanho, setSelected,
            adicionaGrupo, copiaGrupo 
          } = useList();
    const { addConfig } = useConfig();

    const addElementoSolo = (name: string, type:string) => {
      let id = tamanho+1;
      list[0].children.push({
        id: String(id),
        tipoCache: nomePagina,
        name: name,
        children: [],
      });
      setList({...list});
      addConfig(String(id), type, '0', nomePagina);
      setTamanho(id);

      if (adicionaGrupo === false) setSelected([]);
    }

    const addElementoSoloNoGrupo = ( nome: string, nodes:List, type:string ) => {
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
            tipoCache: nomePagina,
            name: nome,
            children: [],
          });
          setList({...list});
          addConfig(String(id), type, idTotal, nomePagina);
          setTamanho(id);
      }
      if (adicionaGrupo === false) setSelected([]);
    }

    const plataformaElemento = ( nome: string, nodes:List, type: string ) => {
        if (adicionaGrupo === false) {
            addElementoSolo(nome, type);
        } else {
            addElementoSoloNoGrupo(nome, nodes, type);
        }
    }

    return (
      <>
      {ButtonList.map(({ name, path, type }, index) => {
          return (
              <div key={index}>
              <BootstrapTooltip key={index} title={name}>
                  <Button onClick={() => plataformaElemento(name, copiaGrupo[0], type) } variant="contained" >
                      <ButtonTopic name={name} path={path}  />
                  </Button>
              </BootstrapTooltip>
              </div>
          )
      })}
      </>
    )
}