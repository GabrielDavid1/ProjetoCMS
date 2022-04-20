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
    const { list, setList, 
            tamanho, setTamanho, 
            adicionaGrupo, copiaGrupo 
          } = useList();
    const { configuracoes, setConfiguracoes } = useConfig();

    const addElementoSolo = (name: string, type:string) => {
        let id = tamanho+1;
        list[0].children.push({
          id: String(id),
          name: name,
          children: [],
        });
        setList({...list});

        if (type !== "off") {
            configuracoes.push({
                id: String(id),
                type: type,
                config: {
                    width: "150px",
                    height: "150px",
                    bgColor: "orange",
                    pxBorder: "1px",
                    typeBorder: "solid",
                    colorBorder: "transparent",
                    boxShadow: "0px 0px 0px",
                    borderRadius: "0px",
                }
            });
            setConfiguracoes([...configuracoes]);
        }

        setTamanho(id);
    }

    const addElementoSoloNoGrupo = ( nome: string, nodes:List, type:string )  =>  {
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
  
          if (type !== "off") {
            configuracoes.push({
                id: String(id),
                type: type,
                config: {
                    width: "150px",
                    height: "150px",
                    bgColor: "orange",
                    pxBorder: "1px",
                    typeBorder: "solid",
                    colorBorder: "transparent",
                    boxShadow: "0px 0px 0px",
                    borderRadius: "0px",
                }
            });
            setConfiguracoes([...configuracoes]);
          }
      }
      setTamanho(id);
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