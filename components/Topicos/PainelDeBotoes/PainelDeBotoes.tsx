/* Componente Framework Material-UI */
import Button from '@mui/material/Button';

/* Contexto */ 
import { useList } from '../../../contexts/useTopicos';
import { useConfig } from '../../../contexts/useConfig';

/* Variaveis e Tipagens Padrões */
import { ButtonList } from '../../../Importacoes/Variaveis/Variaveis';
import { List } from '../../../Importacoes/Tipagens/Tipagem';

/* Componentes  */
import { ButtonTopic } from '../Button';
import { BootstrapTooltip } from './BootstrapTooltip';

export function PainelDeBotoes () {
    const { idTotal, list, setList, 
            tamanho, setTamanho, setSelected,
            adicionaGrupo, copiaGrupo 
          } = useList();
    const { addConfig } = useConfig();

    const addElementoSolo = (name: string, type:string) => {
      let id = tamanho+1;
      list[0].children.push({
        id: String(id),
        name: name,
        children: [],
      });
      setList({...list});
      addConfig(String(id), type, '0');
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
            name: nome,
            children: [],
          });
          setList({...list});
          addConfig(String(id), type, idTotal);
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