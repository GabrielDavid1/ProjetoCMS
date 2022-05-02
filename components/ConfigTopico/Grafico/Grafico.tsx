/* React */
import React from 'react';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

/* Tipagens e Variaveis */
import { Propriedades } from './AreaConfig/Propriedades';
import { Opacidade } from '../Padrao/Opacidade';
import { Camada } from '../Padrao/Camada';
import { AlterarValor } from './AreaConfig/AlterarValor';

export function Grafico () {
    const { idTotal, buscarConfigs } = useConfig();
    
    let elementoGuardado:any = buscarConfigs(idTotal);

    return (
        <>
        <div className="areaConfig">
          <ul>
            {/* Toda a área das propriedades*/}  
            <Propriedades elemento={elementoGuardado} />

            {/* Toda a área da configuração do valor*/}           
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