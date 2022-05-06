/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

/* Tipagens */
import { DadoEvtProps } from '../../../../Importacoes/Tipagens/Tipagem';
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

type ObjPadrao = {
    nome: string;
    configuracoes: Config;
}

type Props = {
    parametro: string;
    dadoEvento?: ObjPadrao[];
};

export default function Parametros ({ parametro, dadoEvento }:Props) {
    const [valor, setValor] = React.useState('1');
    const [configs, setConfigs] = React.useState<any[]>([]);
 
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
          onClick={() => console.log(dadoEvento)}
          style={{width:'99%', 
                  height: '60px', 
                  textAlign:'center',
                  padding: '10px',
                  marginBottom: '40px',
                 }}
        >
         {
           Array.isArray(configs) 
              ? (configs.map((item, index) => { 
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
