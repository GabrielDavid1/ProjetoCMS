/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* Tipagens e Variaveis*/
import { tiposTamanho } from '../../../../Importacoes/Variaveis/Variaveis';

interface PropsParam {
    param1: {
        id: string;
        tipo: string;
    };
    param2: {
        id: string;
        tipo: string;
    };
    param3: {
        id: string;
        tipo: string;
        acao: string;
    };
}

type Props = {
    parametro: string;
    paramQuery: PropsParam;
    setParamQuery: React.Dispatch<React.SetStateAction<PropsParam>>;
};

export default function Parametros ({
  parametro,
  paramQuery,
  setParamQuery,
}:Props) {
    const [valor, setValor] = React.useState('1');

    const handleChange = (event: SelectChangeEvent) => {
        const index = Number(event.target.value);
        switch (parametro) {
          case 'Param 1': paramQuery.param1.tipo = tiposTamanho[index]
          case 'Param 2': paramQuery.param2.tipo = tiposTamanho[index]
          case 'Param 3': paramQuery.param3.tipo = tiposTamanho[index]
        }   
        setParamQuery({...paramQuery});
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
            <MenuItem 
               key={index} 
               value={index+''}
            >
                {item} 
            </MenuItem>
          ) 
        }
        </Select>
        </FormControl>
    )
}
