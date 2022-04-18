/* Contexto */ 
import { useList } from '../../../contexts/useTopicos';
import { useConfig } from '../../../contexts/useConfig';

/* Botõse */
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ButtonTopic } from '../Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

/* Grupo de Botões Estaticos */
const ButtonList = [
	{
    id: '1',
		name: "Retangulo",
    type: "Retangulo",
    path: "M2 4h20v16H2z"
	},
	{
    id: '2',
		name: "Text",
    type: "Text",
    path: "M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"
	},
	{
    id: '3',
		name: "Input",
    type: "Input",
    path: "M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"
	},
	{ id: '4',
		name: "Check Box",
    type: "Check Box",
    path: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
	},	
  { id: '5',
		name: "Text Área",
    type: "Text Área",
    path: "M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"
	},
  { id: '6',
		name: "Divisor",
    type: "Divisor",
    path: "M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"
	},
  { id: '7',
		name: "Calendário",
    type: "Calendário",
    path: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
	},
  { id: '8',
		name: "Graficos",
    type: "Graficos",
    path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
	},
  { id: '9',
		name: "Link",
    type: "Link",
    path: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
	},
  { id: '10',
		name: "Imagem",
    type: "Imagem",
    path: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
	},
  { id: '11',
		name: "Opções",
    type: "Opções",
    path: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
	},
  { id: '12',
		name: "Api",
    type: "off",
    path: "M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"
	},
]

/* Estilização dos tooltips */
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

interface Config {
  width?: string;
  height?: string;

  bgColor?: string;
  
  fontSize?: string;
  fontColor?: string;

  typeBorder?: string;
  colorBorder?: string;
  
  boxShadow?: string;

  positionX?: string;
  positionY?: string;
}

/* Tipagem */
interface RenderTree {
    id: string;
    name: string;
    children: RenderTree[];
}

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
                }
            });
            setConfiguracoes([...configuracoes]);
        }

        setTamanho(id);
    }

    const addElementoSoloNoGrupo = ( nome: string, nodes:RenderTree, type:string )  =>  {
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
                }
            });
            setConfiguracoes([...configuracoes]);
          }
      }
      setTamanho(id);
    }

    const plataformaElemento = ( nome: string, nodes:RenderTree, type: string ) => {
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