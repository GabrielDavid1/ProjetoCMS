/* Componentes Framework Material-UI */
import Box from '@mui/material/Box';

/* React */
import React, {  useRef, useState } from 'react';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

type PropsConfig = { 
    elemento: any;
}

export function ModificarTexto ({ elemento }: PropsConfig) {
    const { configuracoes, setConfiguracoes } = useConfig();

    const [valor, setValor] = useState(elemento.textoArea);

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLTextAreaElement>) {
        elemento.textoArea = event.target.value;            
        setConfiguracoes([...configuracoes]);
        setValor(event.target.value);
    }

    return (
      <li>
        <p> Modificar Texto: </p>
        <div className="blocoPropriedades">
            <Box sx={{ width: 255, padding: 1 }}>
              <textarea
                value={valor}
                onChange={(e) => mudarPropriedades(e)}
              >
                {elemento.textoArea}
              </textarea>
            </Box>
        </div>
      </li>
    )
}