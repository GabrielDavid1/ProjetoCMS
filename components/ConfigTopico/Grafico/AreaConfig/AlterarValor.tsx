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

    function remover () {
      console.log(elemento)
        elemento.series[0].data.pop();
        elemento.options.xaxis.categories.pop();
        elemento.width = (parseInt(elemento?.width, 10)-10)+'px';
        setConfiguracoes([...configuracoes]);
    }

    const adicionar = () => {
      console.log(elemento)
        elemento.series[0].data.push(elemento.series[0].data.length*10);
        elemento.options.xaxis.categories.push('2021-03-18T00:00:00.000Z');
        elemento.width = (parseInt(elemento?.width, 10)+10)+'px';
        setConfiguracoes([...configuracoes]);
    }

    return (
      <li>
        <p> Alterar Valor: </p>
        <div className="botoesValor">
          <Button 
            variant="contained" 
            style={{ backgroundColor:'white', color:'#1976d2'}}
            onClick={() => adicionar()}
          >
          Adicionar
          </Button>
          <Button 
            variant="contained" 
            style={{ 
                    backgroundColor:'white',
                    color:'#1976d2',
                    marginLeft: '10px',
                  }}
            onClick={() => remover()}
          >
          Remover
          </Button>
        </div>
      </li>
    )
}