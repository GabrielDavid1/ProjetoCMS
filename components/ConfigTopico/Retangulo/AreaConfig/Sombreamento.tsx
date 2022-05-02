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
    shadow: string;
    boxShadow: propsConfig;
    boxShadowVisibilidade: string;
    add: (id:string, parametro:boolean) => void;
    handleChange3: (event: SelectChangeEvent) => void
}

export function Sombreamento ({
    shadow,
    boxShadow,
    boxShadowVisibilidade,
    handleChange3,
    add
}:PropsBoxShadow) {
    return (
      <li> 
        <b>Sombreamento </b> 
        <Button 
          sx={{':hover': {
            bgcolor: 'white',
            color: 'white',
          }, textAlign: 'right', width:"10px"}}
          onClick={() => add('2', !boxShadow.status)}
        >
         <ButtonTopic name="add" path={boxShadow.svg} />
        </Button>
        
      
        {boxShadowVisibilidade !== '0px 0px 0px' &&
            (   
            <div className="blocoSombra">    
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={shadow}
                sx={{width: "115px", height:"40px"}}
                onChange={handleChange3}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={1}>1px</MenuItem>
                <MenuItem value={2}>2px</MenuItem>
                <MenuItem value={3}>3px</MenuItem>
                <MenuItem value={4}>4px</MenuItem>
                <MenuItem value={5}>5px</MenuItem>
              </Select>
            </FormControl>
            </div>
            ) 
        }
      </li>
    )
}