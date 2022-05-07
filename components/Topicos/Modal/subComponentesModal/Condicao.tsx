/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type ObjPadrao = {
    id: string;
    tipo: string;
}

type Props = {
    parametro: string;
    condicao?: ObjPadrao[],
}

export default function Condicao ({ parametro, condicao }:Props) {
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
           {parametro}
        </InputLabel> 
        <Select
          className="controleIconesModal"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valor}
          label={parametro}
          onChange={handleChange}
        
          style={{width:'99%', 
                  height: '60px', 
                  textAlign:'center',
                  padding: '10px',
                  marginBottom: '0px',
                 }}
        >
         {
           Array.isArray(condicao) 
              ? (condicao.map((item, index) => { 
                 return (
                  <MenuItem key={index} value={item.id} >
                    {item.tipo} 
                  </MenuItem>
                 )
              })): null
         }
        </Select>
        </FormControl>
    )
}
