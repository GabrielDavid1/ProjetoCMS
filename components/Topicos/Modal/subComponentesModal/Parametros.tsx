/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* Tipagens e Variaveis*/
import { tiposTamanho } from '../../../../Importacoes/Variaveis/Variaveis';

/* Contexto */
import { useEvent } from '../../../../contexts/useEvent';

type ObjPadrao = {
    id:string;
}

type Props = {
    parametro: string;
    dadoEvento?: ObjPadrao[];
    idBotao: string | undefined;
};

export default function Parametros ({ parametro, dadoEvento, idBotao }:Props) {
    const [valor, setValor] = React.useState('1');
    const { buscarQuery, queryEvento, setQueryEvento } = useEvent();

    const handleChange = (event: SelectChangeEvent) => {
        if(idBotao !== undefined) {
         //  let dado = buscarQuery(idBotao, false, dadoEvento);
      //     setQueryEvento([...queryEvento]); 
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
                  marginBottom: '40px'}}
        >
        {tiposTamanho.map((item, index) => 
            <MenuItem key={index} value={index+''}>
                {item} 
            </MenuItem>
          ) 
        }
        </Select>
        </FormControl>
    )
}
