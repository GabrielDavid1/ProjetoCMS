/* React */
import React, { useState, forwardRef } from 'react';

/* Componente material-ui */
import Button from '@mui/material/Button';

/* Contexto */
import { useList } from '../../../../contexts/useTopicos';
import { useConfig } from '../../../../contexts/useConfig';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

/* Componentes */
import { SelectElemento  } from '../SelectElemento'
let Draggable = require('react-draggable');

/* Divs */
import DivElemento from './DivElemento';
import { ButtonTopic } from '../../Button';


interface Props {
    id: string;
    width: string;
    height: string;
    refLeft:React.MutableRefObject<HTMLDivElement>;
    refTop:React.MutableRefObject<HTMLDivElement>; 
    refRight:React.MutableRefObject<HTMLDivElement>;
    refBottom:React.MutableRefObject<HTMLDivElement>; 
    config?: Config;
    children?: React.ReactNode;
    estado: boolean;
    estadoTransform: string;
}

export const Elemento = forwardRef<HTMLDivElement,  Props>(( { 
   id, 
   width,
   height,
   refLeft, 
   refTop, 
   refRight, 
   refBottom,
   config,
   estado,
   estadoTransform
}, ref ) => {
  const { setIdTotal, configuracoes, setConfiguracoes } = useConfig();
  const { ativarToggleLateral, adicionaGrupo } = useList();

  const [visibilidade, setVisibilidade] = useState(false);

  function addElementoNoGrupo () {
      if (adicionaGrupo === false) {
          ativarToggleLateral('configs');
      }
  }

  const trocarLateral = (parametro: number) => {
    if (parametro === 2) {
        setIdTotal('');
        ativarToggleLateral('principal');
    } else if(parametro === 1 && config !== undefined) {
        setIdTotal(id);
        addElementoNoGrupo();
        setConfiguracoes(
          configuracoes.map(el => (el.id === id && el.config !== undefined
              ? {...el, config: 
                {...el.config, width:width, height:height, transform:estadoTransform}}
              : el
          ))
        ) 
    }
  }

  return (
    <Draggable disabled={estado}>   
      <DivElemento 
        ref={ref} 
        className="resizeable" 
        onMouseOver={() => setVisibilidade(true)} 
        onMouseOut={() => setVisibilidade(false)}
        onClick={(e) => trocarLateral(e.detail)}
        width={config?.width}
        height={config?.height}
        top={config?.top}
        left={config?.left}
        bgColor='none'
        zIndex={config?.zIndex}
        transform={config?.transform}
      > 
        {(config?.modeloBotao === 'padrao' || config?.modeloBotao === 'none') && 
          <Button 
              variant="contained" 
              style={{ 
                backgroundColor: config?.bgColor, 
                color: config?.fontColor,
                width: config?.width,
                height: config?.height,
                fontSize:config?.fontSize,
                border: config?.pxBorder+' '+config?.typeBorder+' '+config?.colorBorder,
                borderRadius: config?.borderRadius,
              }}
          > 
            {config?.botaoTitulo} 
          </Button>
        }

        {config?.modeloBotao === 'circular' &&             
          <Button 
              variant="contained"
              style={{ 
                backgroundColor: config?.bgColor, 
                width: config?.width,
                height: config?.height,
                border: config?.pxBorder+' '+config?.typeBorder+' '+config?.colorBorder,
                borderRadius: '100px'
              }}
          >
            <ButtonTopic 
              name="circular" 
              path="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"                  
            />
          </Button>          
        }
        <SelectElemento
            visibilidade={visibilidade}
            refLeft={refLeft} 
            refTop={refTop}
            refRight={refRight}
            refBottom={refBottom}
        />
      </DivElemento>
    </Draggable>
  )
});