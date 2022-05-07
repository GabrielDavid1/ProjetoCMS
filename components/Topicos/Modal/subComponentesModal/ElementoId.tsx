/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* Tipagens e Variaveis*/
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

type ObjPadrao = {
    id:string;
    nome: string;
}

type Props = {
    parametro: string;
    dadoEvento?: ObjPadrao[];
};

export default function ElementoId ({ parametro, dadoEvento }:Props) {
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
          onClick={() => console.log(dadoEvento)}
          style={{width:'99%', 
                  height: '60px', 
                  textAlign:'center',
                  padding: '10px',
                  marginBottom: '40px'}}
        >
        {(dadoEvento !== undefined) && dadoEvento.map((item, index) => 
                <MenuItem key={index} value={item.id}>
                     {item.nome} 
                </MenuItem>
          ) 
        }   
        </Select>
        </FormControl>
    )
}
