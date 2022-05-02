/* React */
import React from 'react';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

/* Componente material-ui */
import Button from '@mui/material/Button';

type PropsConfig = {
    elemento: any;
}

export function AlterarValor ({ elemento }: PropsConfig) {
    const { configuracoes, setConfiguracoes } = useConfig();

    function toggleEfeito () {
        elemento.statusImagem = !elemento.statusImagem;
        setConfiguracoes([...configuracoes]);
    }

    return (
      <li>
        <p> Botão de Upload: </p>
        <div className="botaoImagem">
          <Button 
            variant="contained" 
            style={{ 
                    backgroundColor:'white',
                    color:'#1976d2',
                    marginLeft: '10px',
                  }}
            onClick={() => toggleEfeito()}
          >
          {elemento.statusImagem ? 'Ativar' : 'Desativar'}
          </Button>
        </div>
      </li>
    )
}