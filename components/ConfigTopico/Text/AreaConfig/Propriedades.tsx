/* Componentes Framework Material-UI */
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { SelectChangeEvent } from '@mui/material/Select';

/* React */
import React, {  useRef } from 'react';

/* Tipagens e Variaveis */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

interface marksProps {
    value: number;
    label: string;
}

type PropsConfig = {
    fontSize: string, 
    elemento: any;
    marks: marksProps[]

    handleChange: (event: SelectChangeEvent) => void
    getValue: (valor: number) => string;
    convertePixels: () => void;
    valueLabelFormat: (valor: number) => number;
}

export function Propriedades ({ 
    marks,
    elemento, 
    getValue, 
    convertePixels, 
    valueLabelFormat, 
}: PropsConfig) {
    const { configuracoes, setConfiguracoes } = useConfig();
    const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>) {
        elemento.fontSize = event.target.value;            
        setConfiguracoes([...configuracoes]);
    }

    return (
      <li>
        <p> Propriedades: </p>
        <div className="blocoPropriedades">
            <div className="blocoPropriedades-item">
            Tamanho da Fonte: <input value={elemento.fontSize} onChange={(e) => mudarPropriedades(e)} /> &ensp;
            </div>
            <Box sx={{ width: 255, padding: 1 }}>
              <Slider
                ref={ref}
                aria-label="Always visible"
                getAriaValueText={getValue}
                valueLabelFormat={valueLabelFormat}
                defaultValue={150}
                step={10}
                marks={marks}
                onMouseUp={convertePixels}
                valueLabelDisplay="off"
              />
            </Box>
        </div>
      </li>
    )
}