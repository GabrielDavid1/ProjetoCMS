/* React */
import React from 'react';

/* Componente Framework Material-UI */
import Button from '@mui/material/Button';

/* Componente Botão personalizado */
import { ButtonTopic } from '../../../Topicos/Button';

interface propsConfig {
    status: boolean;
    svg: string;
}

interface PropsBorda {
    bordaVisibilidade: propsConfig;
    add: (id:string, parametro:boolean) => void;
}

export function Borda ({
    bordaVisibilidade,
    add
}:PropsBorda) {
    return (
      <li> 
        <b>Borda </b> 
        <div className="corrige">
          <Button 
            sx={{':hover': {
              bgcolor: 'white',
              color: 'white',
            }, width:"10px"}}
            onClick={() => add('2', !bordaVisibilidade.status)}
          >
            <ButtonTopic name="add" path={bordaVisibilidade.svg} />
          </Button>
        </div>
      </li>
    )
}