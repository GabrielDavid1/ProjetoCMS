/* Componente Framework Material-UI */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import CottageIcon from '@mui/icons-material/Cottage';

/* Contextos */ 
import { useList } from '../../contexts/useTopicos';
import { useConfig } from '../../contexts/useConfig';
import { useEvent } from '../../contexts/useEvent';

/* Variaveis */
import { useEffect, useState } from 'react';

type Props = {
  nomePagina: string;
}

export function ToggleBotao ({ nomePagina }:Props) {
    const { setIdTotal, list,
            setNomeSelecionado, setSelected, 
            toggleLateral, ativarToggleLateral ,
            adicionaGrupo, buscarElemento
          } = useList();
    const { idTotal,  retornarQuantidade } = useConfig();
    const { quantidadeEventos } = useEvent();

    const [value, setValue] = useState(0);

    function voltar () {
      if (adicionaGrupo === false) {
          let nomeBuscado:any = buscarElemento(idTotal, list[0]);
          setIdTotal(idTotal);
          setNomeSelecionado((nomeBuscado !== undefined) ? nomeBuscado.name : "");
          setSelected([idTotal]);
      }
      ativarToggleLateral('principal');
    }
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    useEffect(() => {
      if (toggleLateral.principal) setValue(0);
      if (toggleLateral.configs) setValue(1);
      if (toggleLateral.eventos) setValue(2);
    }, [toggleLateral])

    return (
      <div className="bloco">
      <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
        <Tab 
          icon={<CottageIcon />}
          aria-label="principal" 
          onClick={() => voltar()}
        />
        <Tab 
          icon={<SettingsIcon />} 
          aria-label="configurações"
          onClick={() => ativarToggleLateral('configs')} 
          disabled={(retornarQuantidade(nomePagina) > 0) ? false : true}
        />
        <Tab 
          icon={<KeyboardCommandKeyIcon />}
          aria-label="eventos" 
          onClick={() => ativarToggleLateral('eventos')} 
          disabled={(quantidadeEventos > 0) ? false : true}
        />
      </Tabs>
      </div>
    )
}