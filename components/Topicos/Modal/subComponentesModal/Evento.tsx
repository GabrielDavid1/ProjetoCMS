/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* Contexto */
import { useEvent } from '../../../../contexts/useEvent';

type Props = {
    id: string | undefined;
}

export default function Evento ({ id }:Props) {
    const [valor, setValor] = React.useState('1');
    const { queryEvento, setQueryEvento } = useEvent();

    const handleChange = (event: SelectChangeEvent) => {
        let param = 'click';
        if (event.target.value === '2') param = 'hover';

        queryEvento.push({
            id: (id !== undefined) ? id : '',
            idElemento: '',
            evento: param,
            condicao: {
                par1: '',
                par2: '',
                par3: '',
            },
            acao: {
                raiz: '',
                alvo: '',
            },
        });
        setQueryEvento([...queryEvento]);
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
