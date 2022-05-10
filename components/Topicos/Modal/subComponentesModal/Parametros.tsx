/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
    const [value, setValue] = React.useState<string | null>(tiposTamanho[0]);
    const [inputValue, setInputValue] = React.useState('');

    const handleChange = (event: SelectChangeEvent, newValue: string | null) => {
        switch (parametro) {
          case 'Param 1': paramQuery.param1.tipo = (newValue !== null) ? newValue : 'Vazio'; 
          case 'Param 2': paramQuery.param2.tipo = (newValue !== null) ? newValue : 'Vazio'; 
          case 'Param 3': paramQuery.param3.tipo = (newValue !== null) ? newValue : 'Vazio'; 
        }   
        setParamQuery({...paramQuery});
        setValue(newValue);
    };

    return (
        <>
         <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => handleChange(event, newValue)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={tiposTamanho}
          sx={{ width: 300, height: 70 }}
          renderInput={(params) => <TextField {...params} label="Paramêtros" />}
        />
       </>
    )
}
