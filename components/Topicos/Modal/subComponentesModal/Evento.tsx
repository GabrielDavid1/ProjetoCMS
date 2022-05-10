/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
    id: string | undefined;
    setEventoParam: React.Dispatch<React.SetStateAction<string>>;
}

export default function Evento ({ id, setEventoParam }:Props) {
    const [valor, setValor] = React.useState('1');

    const handleChange = (event: SelectChangeEvent) => {
        let numero = event.target.value as string;
        if(numero === '1') {
            setEventoParam('Vazio');
        } else {
            setEventoParam('Click');
        }
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
         <MenuItem value={'1'}> Vazio </MenuItem>
         <MenuItem value={'2'}> Click </MenuItem>
        </Select>
        </FormControl>
    )
}
