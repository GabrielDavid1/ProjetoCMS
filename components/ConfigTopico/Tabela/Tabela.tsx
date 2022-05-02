/* React */
import React from 'react';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

import { Propriedades } from './AreaTabela/Propriedades';
import { Opacidade } from '../Padrao/Opacidade';
import { Camada } from '../Padrao/Camada';
import { Linhas } from './AreaTabela/Linhas';

export function Tabela () {
    const { idTotal, buscarConfigs } = useConfig();
    let elementoGuardado:any = buscarConfigs(idTotal);
    return (
        <>
        <div className="areaConfig">
          <ul>
            {/* Toda a área das propriedades*/}  
            <Propriedades elemento={elementoGuardado} />

            {/* Toda a área das Linhas */}
            <Linhas elemento={elementoGuardado} />

            {/* Toda a área da configuração da opacidade*/}
            <Opacidade />

            {/* Toda a área da configuração da camada*/}
            <Camada propriedades={elementoGuardado} />
          </ul>
        </div>
        </>
    )
}