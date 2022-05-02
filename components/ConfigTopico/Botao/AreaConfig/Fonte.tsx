/* Componente Framework Material-UI */
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/* Tipagens e Variaveis */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

/* Componente Botão personalizado */
import { ButtonTopic } from '../../../Topicos/Button';
import { useState } from 'react';

interface propsConfig {
    status: boolean;
    svg: string;
}

interface Propriedades {
    font: string;
    elemento: any;
    handleChange: (event: SelectChangeEvent) => void;
}

export function Fonte({ 
    font,
    elemento,
    handleChange,
}:Propriedades) {
    const { configuracoes, setConfiguracoes } = useConfig();

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>, tipo: string, cor = '#fff') {
        event.preventDefault();
        elemento.fontColor = event.target.value;  
        setConfiguracoes([...configuracoes]);
    }

    function ajustarBotao (event = {} as React.ChangeEvent<HTMLInputElement>) {
      event.preventDefault();
      elemento.botaoTitulo = event.target.value;  
      elemento.width = ((elemento.botaoTitulo.length*5)+100)+'px';
      setConfiguracoes([...configuracoes]);
    }

    return (
      <li> 
        <div className="blocoBorda">
          <b>Fonte personalizada: </b>
          <div className="controleFonteBotao">
          <input
              type="color" 
              value={elemento.fontColor} 
              onChange={(e) => mudarPropriedades(e, 'colorBorder')} 
          />
          &ensp;  &ensp; &ensp;  
          
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={font}
              sx={{
                   width: "100px", 
                   height:"35px",
                   marginLeft: '-25px',
                  }}
              onChange={handleChange}
            >
              <MenuItem value={1}>1rem</MenuItem>
              <MenuItem value={2}>2rem</MenuItem>
              <MenuItem value={3}>3rem</MenuItem>
              <MenuItem value={4}>4rem</MenuItem>
              <MenuItem value={5}>5rem</MenuItem>
            </Select>
          </FormControl>
          
          <input placeholder="Escreva algo aqui" value={elemento?.botaoTitulo} onChange={(e) => ajustarBotao(e)}  />
          </div>
        </div>
      </li>
    )
}