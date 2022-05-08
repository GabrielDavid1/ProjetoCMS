/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import TextField from '@mui/material/TextField';

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

export default function Acoes ({
  parametro,
  paramQuery,
  setParamQuery,
}:Props) {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        paramQuery.param3.acao = event.target.value;
        setParamQuery({...paramQuery});
    };
    return (
        <>
          <TextField 
             id="outlined-basic" 
             label="Resultado" 
             variant="outlined"
             value={paramQuery.param3.acao}
             onChange={(e) => handleChange(e)} 
          />
        </>
    )
}
