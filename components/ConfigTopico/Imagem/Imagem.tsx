/* React */
import React, { useState } from 'react';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

/* Tipagens e Variaveis */
import { Propriedades } from './AreaImagem/Propriedades';
import { Opacidade } from '../Padrao/Opacidade';
import { Camada } from '../Padrao/Camada';
import { AlterarValor } from './AreaImagem/AlterarValor';


export function Imagem () {
    const { idTotal, buscarConfigs } = useConfig();

    let elementoGuardado:any = buscarConfigs(idTotal);

    return (
        <>
        <div className="areaConfig">
          <ul>
            {/* Toda a área das propriedades*/}  
            <Propriedades elemento={elementoGuardado} />

            {/* Toda a área do toggle do botão*/}            
            <AlterarValor elemento={elementoGuardado} />

            {/* Toda a área da configuração da opacidade*/}
            <Opacidade />

            {/* Toda a área da configuração da camada*/}
            <Camada propriedades={elementoGuardado} />
          </ul>
        </div>
        </>
    )
}