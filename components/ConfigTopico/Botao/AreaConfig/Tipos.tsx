/* React */
import React from 'react';

/* Componente Framework Material-UI */
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/* Componente Botão personalizado */
import { ButtonTopic } from '../../../Topicos/Button';

interface propsConfig {
    status: boolean;
    svg: string;
}

interface PropsBoxShadow {
    tipo: string;
    tiposBotao: propsConfig;
    tipoVisibilidade: string;
    add: (id:string, parametro:boolean) => void;
    handleChange3: (event: SelectChangeEvent) => void
}

export function Tipos ({
    tipo,
    tiposBotao,
    tipoVisibilidade,
    handleChange3,
    add
}:PropsBoxShadow) {
    return (
      <li> 
        <b>Tipos de Botão </b> 
        <Button 
          sx={{':hover': {
            bgcolor: 'white',
            color: 'white',
          }, textAlign: 'right', width:"10px", marginLeft: "-30px"}}
          onClick={() => add('2', !tiposBotao.status)}
        >
         <ButtonTopic name="add" path={tiposBotao.svg} />
        </Button>
        {tipoVisibilidade !== 'none' &&
            (   
            <div className="blocoSombra">    
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipo}
                sx={{width: "115px", height:"40px"}}
                onChange={handleChange3}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={1}>Padrão</MenuItem>
                <MenuItem value={2}>Circular</MenuItem>
              </Select>
            </FormControl>
            </div>
            ) 
        }
      </li>
    )
}