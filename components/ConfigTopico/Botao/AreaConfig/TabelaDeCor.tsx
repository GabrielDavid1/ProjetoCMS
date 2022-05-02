
/* Componente Framework react color */
import React from 'react';
import { ChromePicker } from 'react-color';

/* Tipagens e Variaveis */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

interface Propriedades {
    cor: string; 
    elemento: any;
}

export function TabelaDeCor ({ cor, elemento }: Propriedades) {
    const { configuracoes, setConfiguracoes } = useConfig();

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>, cor = '#fff') {
        elemento.bgColor = cor; 
        setConfiguracoes([...configuracoes]);
        event.preventDefault();
    }

    return (
        <div className="blocoTopo">
          <ChromePicker 
            color={cor} 
            onChange={(updatedColor, e) => mudarPropriedades(e, updatedColor.hex)} 
          />
        </div>
    )
}