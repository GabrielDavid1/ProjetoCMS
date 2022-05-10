/* React */
import React from 'react';

/* Tipagens e Variaveis */
import { Config } from '../../../Importacoes/Tipagens/Tipagem';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

type PropsConfig = {
    propriedades: Config;
}

export function Camada ({  propriedades }: PropsConfig) {
    const { idTotal, configuracoes, setConfiguracoes } = useConfig();

    function mudarPropriedade (event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setConfiguracoes(
          configuracoes.map(el => (el.id === idTotal && el.config !== undefined
                 ? {...el, config:  {...el.config, zIndex:event.target.value }}
                 : el
          ))
        ) 
    }

    return (
      <li className="camada">
        <p> Camada: </p>
        <input value={propriedades.zIndex} onChange={(e) => mudarPropriedade(e)} />
      </li>
    )
}