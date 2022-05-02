/* React */
import React, { useEffect, useState } from 'react';

/* Componentes Framework Material-UI */
import Divider from '@material-ui/core/Divider';
import { SelectChangeEvent } from '@mui/material/Select';

/* Contexto */
import { useConfig } from '../../../contexts/useConfig';

/* Tipagens e Variaveis */
import { marks } from '../../../Importacoes/Variaveis/Variaveis';
import { TabelaDeCor } from './AreaConfig/TabelaDeCor';
import { Propriedades } from './AreaConfig/Propriedades';
import { Titulo } from './AreaConfig/Titulo';
import { Borda } from './AreaConfig/Borda';
import { Opacidade } from '../Padrao/Opacidade';
import { Camada } from '../Padrao/Camada';


export function Text () {
    let valorEstatico = 0;

    const [bordaVisibilidade, setBordaVisibilidade] = useState({ status: false, svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' });

    const { idTotal, buscarConfigs, configuracoes, setConfiguracoes } = useConfig();
    
    let elementoGuardado:any = buscarConfigs(idTotal);
          
    const [fontSize, setFontSize] = useState('5');

    const [botaoAlinha, setBotaoAlinha] = useState({ status: false, svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' });

    const handleChange1 = (event: SelectChangeEvent) => {
      event.preventDefault();
      
      let valor = event.target.value;
      valor = String(Number(event.target.value)/10)+'rem';
      
      elementoGuardado.fontSize = valor;
      setFontSize(event.target.value as string);
      setConfiguracoes([...configuracoes]); 
    };

    function toggleProps (id: string, parametro:boolean) {
        switch (id) {
          case '1':
              setConfiguracoes(
                configuracoes.map(el => (el.id === idTotal && el.config !== undefined
                    ? {...el, config: {...el.config, textAlign: (parametro === false) ? 'none' : 'center'}} : el ))
              )
          break;
          case '2':
              setConfiguracoes(
                configuracoes.map(el => (el.id === idTotal && el.config !== undefined
                    ? {...el, config: {...el.config, webkitTextStroke: (parametro === false) ? 'none' : '1px black'}} : el ))
              )
          break;
        }
    }

    function add (id:string, parametro:boolean) {
        setBotaoAlinha({
          status: parametro, 
          svg: (parametro === false) 
                  ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
                  : 'M19 13H5v-2h14v2z'
        });  
        setBordaVisibilidade({
          status: parametro, 
          svg: (parametro === false) 
                  ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
                  : 'M19 13H5v-2h14v2z'
        });  
        toggleProps(id, parametro);
    } 

    function getValue (valor: number) {
        return `${valor}°C`;
    }

    function valueLabelFormat(valor: number) {
        valorEstatico = valor;
        return marks.findIndex((mark) => mark.value === valor) + 1;
    }
    
    function convertePixels () {
        elementoGuardado.fontSize = valorEstatico+'px';  
        setConfiguracoes([...configuracoes]);
    }

    useEffect(() => {
        elementoGuardado = buscarConfigs(idTotal);
        if(elementoGuardado.textAlign !== 'none'){ 
            setBotaoAlinha({ 
              status: true, 
              svg: 'M19 13H5v-2h14v2z'
            });
        } else {
            setBotaoAlinha({ 
              status: false, 
              svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
            });
        }
        if (elementoGuardado.webkitTextStroke !== 'none') {
            setBordaVisibilidade({ 
              status: true, 
              svg: 'M19 13H5v-2h14v2z'
            });
        } else {
            setBordaVisibilidade({
              status: false, 
              svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
            });         
        }
    }, [idTotal, configuracoes]);
    
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
            <Propriedades 
               fontSize={fontSize}
               handleChange={handleChange1}
               marks={marks}
               elemento={elementoGuardado}
               getValue={getValue}
               convertePixels={convertePixels}
               valueLabelFormat={valueLabelFormat}
            />
            {/* Toda a área de Título */}
            <Titulo
               elemento={elementoGuardado}
               botaoAlinha={botaoAlinha}
               estado={elementoGuardado.textAlign} 
               add={add}
            />
            {/* Toda a área da borda*/}
            <Borda
               bordaVisibilidade={bordaVisibilidade}
               add={add}
            />
            {/* Toda a área da configuração da opacidade*/}
            <Opacidade />

            {/* Toda a área da configuração da camada*/}
            <Camada propriedades={elementoGuardado} />
          </ul>
        </div>
        </>
    )
}