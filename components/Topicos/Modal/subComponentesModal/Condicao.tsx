/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* Contexto */
import { useEvent } from '../../../../contexts/useEvent';

type ObjPadrao = {
    id: string;
    tipo: string;
}

type Props = {
    parametro: string;
    condicao?: ObjPadrao[];
    idBotao: string | undefined;
}

export default function Condicao ({ parametro, condicao, idBotao }:Props) {
    const [valor, setValor] = React.useState('0');
    const { buscarQuery, queryEvento, setQueryEvento } = useEvent();
    
    const handleChange = (event: SelectChangeEvent) => {
        const index = Number(event.target.value);
        if(condicao !== undefined) {
           let dado = buscarQuery(idBotao, false);
           dado.condicao.par2 = condicao[index]?.tipo;
           setQueryEvento([...queryEvento]);
        }
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
                  <MenuItem key={index} value={index+''} >
                    {item.tipo} 
                  </MenuItem>
                 )
              })): null
         }
        </Select>
        </FormControl>
    )
}
