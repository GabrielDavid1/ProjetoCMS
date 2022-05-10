/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import AppsIcon from '@mui/icons-material/Apps';

/* React Flow */
import { Edge } from 'react-flow-renderer';
import { DadoEvtProps } from '../../Importacoes/Tipagens/Tipagem';
  
const icon = <AppsIcon />;

interface Propriedades {
    nome: string[];
    edges: Edge[];
    dadoEvento?: DadoEvtProps;
    setDadoEvt: React.Dispatch<React.SetStateAction<DadoEvtProps | undefined>>;
    setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
    statusQuery: boolean;
    setStatusQuery: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AcessoRapido({
   nome, 
   edges, 
   dadoEvento, 
   setDadoEvt,
   setStatusModal,
   setStatusQuery,
}:Propriedades) { 
   function setarModal(source: string, target:string, idTooltip: number) {
        let grupoEstatico:string[] = [];
        edges.map(elemento => (elemento.source === source) && grupoEstatico.push(elemento.target));
    
        let copia = Object.assign({}, dadoEvento);
            copia = { idBotao: source,
                      idOutro: target,
                      idTooltip: idTooltip,
                      relacionados: grupoEstatico, };
        setDadoEvt(copia);
        setStatusModal(true);
        setStatusQuery(true);
   }

   return (
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 100, 
          }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
          {edges.map((action, index) => (
            <SpeedDialAction
              key={index}
              icon={icon}
              tooltipTitle={nome[index]}
              onClick={() => setarModal(action.source, action.target, index)}
            />
          ))}
        </SpeedDial>
      </Box>
   );
}
