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
    borderRadius: string;
    botaoRadius: propsConfig;
    borderRadiusVisibilidade: string;
    add: (id:string, parametro:boolean) => void;
    handleChange4: (event: SelectChangeEvent) => void
}

export function BorderRadius ({
    borderRadius,
    botaoRadius,
    borderRadiusVisibilidade,
    add,
    handleChange4
}:PropsBoxShadow) {
    return (
      <li> 
        <b>Modificar Borda</b> 

        <Button 
          className="botaoEspecifico"
          sx={{':hover': {
            bgcolor: 'white',
            color: 'white',
          }, width:"10px"}}
          onClick={() => add('3',!botaoRadius.status)}
        >
          <ButtonTopic name="add" path={botaoRadius.svg}  />
        </Button>

        {
          borderRadiusVisibilidade !== '0px' &&
          (                   
          <div className="blocoPropriedades">
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={borderRadius}
                sx={{width: "115px", height:"40px", marginLeft: "-10px"}}
                onChange={handleChange4}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={1}>5px</MenuItem>
                <MenuItem value={10}>10px</MenuItem>
                <MenuItem value={20}>20px</MenuItem>
                <MenuItem value={50}>50px</MenuItem>
                <MenuItem value={100}>100px</MenuItem>
              </Select>
            </FormControl>
          </div>
          ) 
        }
      </li>
    )
}