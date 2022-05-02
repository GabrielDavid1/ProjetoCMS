/* React */
import React from 'react';

/* Componentes Framework Material-UI */
import Divider from '@material-ui/core/Divider';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

/* Tipagens e Variaveis */
import { TabelaDeCor } from './AreaTextArea/TabelaDeCor';
import { Propriedades } from './AreaTextArea/Propriedades';
import { Fonte } from './AreaTextArea/Fonte';
import { Opacidade } from '../Padrao/Opacidade';
import { Camada } from '../Padrao/Camada';


export function TextArea () {
    const { idTotal, buscarConfigs } = useConfig();

    let elementoGuardado:any = buscarConfigs(idTotal);

    return (
        <>
        {/* Toda a área da tabela de coloração */}  
        <TabelaDeCor 
            cor={elementoGuardado.bgColor ? elementoGuardado.bgColor : '#fff'}
            elemento={elementoGuardado}
        />
        <Divider />
        <div className="areaConfig">
          <ul>
            {/* Toda a área das propriedades*/}  
            <Propriedades elemento={elementoGuardado} />

            {/* Toda a área da fonte*/}
            <Fonte elemento={elementoGuardado} />

            {/* Toda a área da configuração da opacidade*/}
            <Opacidade />

            {/* Toda a área da configuração da camada*/}
            <Camada propriedades={elementoGuardado} />
          </ul>
        </div>
        </>
    )
}