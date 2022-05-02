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

interface propsConfig {
    status: boolean;
    svg: string;
}

interface Propriedades {
    border: string;
    elemento: any;
    handleChange: (event: SelectChangeEvent) => void;
    handleChange2: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Borda({ 
    border,
    elemento,
    handleChange,
    handleChange2,
}:Propriedades) {
    const { configuracoes, setConfiguracoes } = useConfig();

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>, tipo: string, cor = '#fff') {
        elemento.colorBorder = event.target.value;  
        setConfiguracoes([...configuracoes]);
        event.preventDefault();
    }

    return (
      <li> 
        <b>Borda personalizada</b>
        <div className="blocoBorda">
          <input
              type="color" 
              value={elemento.colorBorder} 
              onChange={(e) => mudarPropriedades(e, 'colorBorder')} 
          />
          &ensp;  &ensp; &ensp;  
          
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={border}
              sx={{width: "70px", height:"35px"}}
              onChange={handleChange}
            >
              <MenuItem value={1}>1px</MenuItem>
              <MenuItem value={2}>2px</MenuItem>
              <MenuItem value={3}>3px</MenuItem>
              <MenuItem value={4}>4px</MenuItem>
              <MenuItem value={5}>5px</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{width:"100px", marginLeft: "90px"}}>
            <NativeSelect
              value={elemento.typeBorder}
              onChange={handleChange2}
            >
              <option value="dashed">Tracejado</option>
              <option value="double">Duplo</option>
              <option value="solid">Normal</option>
            </NativeSelect>
          </FormControl>
          &ensp;  &ensp;  &ensp; 
        </div>
      </li>
    )
}