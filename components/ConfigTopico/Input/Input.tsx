/* React */
import React from 'react';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

/* Componentes */
import { Propriedades } from './AreaInput/Propriedades';
import { Opacidade } from '../Padrao/Opacidade';
import { Camada } from '../Padrao/Camada';

export function Input () {
    const { idTotal, buscarConfigs } = useConfig();
    
    let elementoGuardado:any = buscarConfigs(idTotal);
        
    return (
        <>
        <div className="areaConfig">
          <ul>
            {/* Toda a área das propriedades*/}  
            <Propriedades elemento={elementoGuardado} />

            {/* Toda a área da configuração da opacidade*/}
            <Opacidade />

            {/* Toda a área da configuração da camada*/}
            <Camada propriedades={elementoGuardado} />
          </ul>
        </div>
        </>
    )
}