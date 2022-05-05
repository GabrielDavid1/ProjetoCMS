/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
    parametro: string;
}

export default function Evento ({ parametro }:Props) {
    const [valor, setValor] = React.useState('1');

    const handleChange = (event: SelectChangeEvent) => {
        setValor(event.target.value as string);
    };

    return (
        <FormControl fullWidth>
        <InputLabel
           id="demo-simple-select-label"
           style={{ marginBottom: '20px' }}
        >
           Tipos de eventos
        </InputLabel> 
        <Select
          className="controleIconesModal"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valor}
          label="Tipos de eventos"
          onChange={handleChange}
          style={{width:'99%', 
                  height: '60px', 
                  textAlign:'center', 
                  marginBottom: '10px'}}
        >
         <MenuItem value={1}> Click </MenuItem>
         <MenuItem value={2}> Hover </MenuItem>
        </Select>
        </FormControl>
    )
}
