/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type ObjPadrao = {
    idElemento:string;
    idBotao: string | undefined;
    nome: string;
}

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
    dadoEvento?: ObjPadrao[];
    paramQuery: PropsParam;
    setParamQuery: React.Dispatch<React.SetStateAction<PropsParam>>;
};

export default function ElementoId ({ 
  parametro,
  dadoEvento,
  paramQuery,
  setParamQuery,
}:Props) {
    const [valor, setValor] = React.useState('0');
    const handleChange = (event: SelectChangeEvent) => {
        const index = Number(event.target.value);
        if(dadoEvento !== undefined) {
           switch (parametro) {
              case 'Elemento 1': paramQuery.param1.id = dadoEvento[index]?.idElemento
              case 'Elemento 2': paramQuery.param2.id = dadoEvento[index]?.idElemento
              case 'Elemento 3': paramQuery.param3.id = dadoEvento[index]?.idElemento
           } 
           setParamQuery({...paramQuery});
           setValor(event.target.value as string);
        }
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
        {(dadoEvento !== undefined) && dadoEvento.map((item, index) => 
          <MenuItem key={index} value={index+''}>
               {item.nome} 
          </MenuItem>
        )}   
        </Select>
        </FormControl>
    )
}
