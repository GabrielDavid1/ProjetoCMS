/* React */
import React  from 'react';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

type PropsConfig = {
    elemento: any;
}

export function Propriedades ({ elemento }: PropsConfig) {
    const { configuracoes, setConfiguracoes } = useConfig();

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>) {
        elemento.fontSize = event.target.value;            
        setConfiguracoes([...configuracoes]);
    }

    return (
      <li>
        <p> Propriedades: </p>
        <div className="blocoPropriedades">
            <div className="blocoPropriedades-item">
            Tamanho da Fonte: <input value={elemento.fontSize} onChange={(e) => mudarPropriedades(e)} /> &ensp;
            </div>
        </div>
      </li>
    )
}