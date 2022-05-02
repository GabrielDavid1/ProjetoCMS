/* React */
import { useState } from 'react';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

/* Componente Framework Material-UI */
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export function Opacidade () {
    const [opacidade, setOpacidade] = useState('10');

    const { idTotal, configuracoes, setConfiguracoes, buscarConfigs } = useConfig();

    let elementoGuardado: any = buscarConfigs(idTotal);
    
    const handleChange = (event: SelectChangeEvent) => {
      event.preventDefault();
      let valor = event.target.value;
      setOpacidade(valor as string);
      elementoGuardado.opacity = (Number(valor) > 0) ? String(Number(valor)/10) : '0';
      setConfiguracoes([...configuracoes]); 
    };

    return (
      <li> 
        <b>Opacidade: </b> 
            <div className="blocoSombra">    
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={opacidade}
                sx={{width: "115px", height:"40px"}}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={0}>0%</MenuItem>
                <MenuItem value={1}>10%</MenuItem>
                <MenuItem value={2}>20%</MenuItem>
                <MenuItem value={4}>50%</MenuItem>
                <MenuItem value={10}>100%</MenuItem>
              </Select>
            </FormControl>
            </div>
      </li>
    )
}