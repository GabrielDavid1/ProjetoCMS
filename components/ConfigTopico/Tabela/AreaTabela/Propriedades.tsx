/* React */
import React  from 'react';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

type PropsConfig = {
    elemento: any;
}

export function Propriedades ({ elemento }: PropsConfig) {
    const { configuracoes, setConfiguracoes } = useConfig();

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>, tipo: string) {
        event.preventDefault();
        if (tipo === 'width') elemento.width = event.target.value;
        if (tipo === 'height') elemento.height = event.target.value;
        setConfiguracoes([...configuracoes]); 
    }

    return (
      <li>
        <p> Propriedades: </p>
        <div className="blocoPropriedades">
            Largura: <input value={elemento.width} onChange={(e) =>  mudarPropriedades(e, 'width')}  />
            &ensp;
            Altura:  <input value={elemento.height} onChange={(e) => mudarPropriedades(e, 'height')} />
        </div>
      </li>
    )
}