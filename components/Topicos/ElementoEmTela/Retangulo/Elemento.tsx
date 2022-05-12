/* React */
import React, { useState, useEffect, forwardRef } from 'react';

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

interface Props {
    id: string;
    width: string;
    height: string;
    refLeft:React.MutableRefObject<HTMLDivElement>;
    refTop:React.MutableRefObject<HTMLDivElement>; 
    refRight:React.MutableRefObject<HTMLDivElement>;
    refBottom:React.MutableRefObject<HTMLDivElement>; 
    config?: Config;
    estado: boolean;
    setEstado: React.Dispatch<React.SetStateAction<boolean>>;
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
   setEstado,
}, ref ) => {
  const { ativarToggleLateral, adicionaGrupo } = useList();
  const { setIdTotal, configuracoes, setConfiguracoes, statusEdicao } = useConfig();
  const [visibilidade, setVisibilidade] = useState(false);

  useEffect(() => {
     (statusEdicao === false) ? setEstado(true) : setEstado(false);
  }, [statusEdicao]);
  
  function addElementoNoGrupo () {
    if (adicionaGrupo === false) {
        ativarToggleLateral("configs");
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
                {...el.config, width:width, height:height}}
              : el
          ))
        ) 
    }
  }

  function setarTransform (e:any, ui:any) {
    setConfiguracoes(
      configuracoes.map(el => (el.id === id && el.config !== undefined
          ? {...el, config: 
            {...el.config, x: ui.lastX, y: ui.lastY}}
          : el
      ))
    )
  }

  return (
    <Draggable
      disabled={estado} 
      onStop={setarTransform}
      defaultPosition={{x: config?.x, y: config?.y}}
    >   
      <div> 
        <DivElemento 
          ref={ref} 
          className="resizeable" 
          onMouseOver={() => setVisibilidade(true)} 
          onMouseOut={() => setVisibilidade(false)}
          onClick={(e) => (statusEdicao) && trocarLateral(e.detail)}
          bgColor={config?.bgColor}
          width={config?.width}
          height={config?.height}
          border={config?.pxBorder+' '+config?.typeBorder+' '+config?.colorBorder}
          boxShadow={config?.boxShadow}
          borderRadius={config?.borderRadius}
          opacity={config?.opacity}
          zIndex={config?.zIndex}
          transform={"translate(0px, 0px)"}
        >
          <SelectElemento
              visibilidade={visibilidade}
              refLeft={refLeft} 
              refTop={refTop}
              refRight={refRight}
              refBottom={refBottom}
          />
        </DivElemento>
      </div>
    </Draggable>
  )
});