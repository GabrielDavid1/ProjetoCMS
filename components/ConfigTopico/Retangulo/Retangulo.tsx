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
import { Borda } from './AreaConfig/Borda';
import { Sombreamento } from './AreaConfig/Sombreamento';
import { BorderRadius } from './AreaConfig/BorderRadius';
import { Opacidade } from '../Padrao/Opacidade';
import { Camada } from '../Padrao/Camada';

export function Retangulo () {
    let valorEstatico = 0;
    
    const [shadow, setShadow] = useState('1');
    const [border, setBorder] = useState('1');
    const [borderRadius, setBorderRadius] = useState('1');

    const [botaoBorda, setBotaoBorda] = useState({ status: false, svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' });
    const [botaoRadius, setBotaoRadius] = useState({ status: false, svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' });
    const [boxShadow, setBoxShadow] = useState({ status: false, svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' });
  
    const { idTotal, buscarConfigs, configuracoes, setConfiguracoes } = useConfig();
    
    let elementoGuardado:any = buscarConfigs(idTotal);

    const handleChange = (event: SelectChangeEvent) => {
      event.preventDefault();
      setBorder(event.target.value as string);
      elementoGuardado.pxBorder = event.target.value as string+'px';  
      setConfiguracoes([...configuracoes]); 
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      elementoGuardado.typeBorder = event.target.value;  
      setConfiguracoes([...configuracoes]); 
    };
  
    const handleChange3 = (event: SelectChangeEvent) => {
      event.preventDefault();
      setShadow(event.target.value as string);
      elementoGuardado.boxShadow = '1px 1px '+event.target.value as string+'px';  
      setConfiguracoes([...configuracoes]); 
    };

    const handleChange4 = (event: SelectChangeEvent) => {
      event.preventDefault();
      setBorderRadius(event.target.value as string);
      elementoGuardado.borderRadius = event.target.value as string+'px';  
      setConfiguracoes([...configuracoes]); 
    };

    function toggleProps (id: string, parametro:boolean) {
        switch (id) {
          case '1':
            if ( parametro === false ) {
                 elementoGuardado.pxBorder = '1px'; 
                 elementoGuardado.typeBorder = 'solid'; 
                 elementoGuardado.colorBorder = '#rrggbb'; 
            } else {
                 elementoGuardado.pxBorder = '1px'; 
                 elementoGuardado.typeBorder = 'solid'; 
                 elementoGuardado.colorBorder = 'black'; 
            }
            setConfiguracoes([...configuracoes]); 
          break;
          case '2':
            if (parametro === false) {
                elementoGuardado.boxShadow = '0px 0px 0px'; 
            } else {
                elementoGuardado.boxShadow = '1px 1px 1px'; 
            }
            setConfiguracoes([...configuracoes]); 
          break;
          case '3':
            if (parametro === false) {
                elementoGuardado.borderRadius = '0px'; 
            } else {
                elementoGuardado.borderRadius = '1px'; 
            }
            setConfiguracoes([...configuracoes]); 
          break;
        }
    }

    function add (id:string, parametro:boolean) {
        setBotaoBorda({ 
          status: parametro, 
          svg: (parametro === false) 
                  ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
                  : 'M19 13H5v-2h14v2z'
        });  
        setBoxShadow({
          status: parametro, 
          svg: (parametro === false) 
                  ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
                  : 'M19 13H5v-2h14v2z'
        });  
        setBotaoRadius({
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
        elementoGuardado.width =  valorEstatico+'%';  
        elementoGuardado.height =  valorEstatico+'%'; 
        setConfiguracoes([...configuracoes]);
    }

    useEffect(() => {
        elementoGuardado = buscarConfigs(idTotal);
        if(elementoGuardado.colorBorder !== '#rrggbb'){ 
            setBotaoBorda({ 
              status: true, 
              svg: 'M19 13H5v-2h14v2z'
            });
        } else {
            setBotaoBorda({ 
              status: false, 
              svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
            });
        }

        if (elementoGuardado.boxShadow !== '0px 0px 0px') {
            setBoxShadow({ 
              status: true, 
              svg: 'M19 13H5v-2h14v2z'
            });
        } else {
           setBoxShadow({
             status: false, 
             svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
           });         
        }

        if (elementoGuardado.borderRadius !== '0px') {
            setBotaoRadius({ 
              status: true, 
              svg: 'M19 13H5v-2h14v2z'
            });
        } else {
            setBotaoRadius({
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
            <Propriedades elemento={elementoGuardado} />

            {/* Toda a área da configuração da borda*/}
            <Borda
               border={border}
               elemento={elementoGuardado}
               botaoBorda={botaoBorda}
               estadoCor={elementoGuardado.colorBorder} 
               handleChange={handleChange}
               handleChange2={handleChange2}
               add={add}
            />
            {/* Toda a área da configuração do sombreamento*/}
            <Sombreamento
               shadow={shadow}
               boxShadow={boxShadow}
               boxShadowVisibilidade={elementoGuardado.boxShadow}
               handleChange3={handleChange3}
               add={add}
            />
            {/* Toda a área da configuração do posicionamento*/}
            <BorderRadius
               borderRadius={borderRadius}
               botaoRadius={botaoRadius}
               borderRadiusVisibilidade={elementoGuardado.borderRadius}
               handleChange4={handleChange4}
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