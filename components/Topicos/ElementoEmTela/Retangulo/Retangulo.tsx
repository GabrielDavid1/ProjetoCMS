/* React */
import React, { useRef, useEffect, useState } from "react";

/* Componentes */
import { Elemento } from './Elemento';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

/* Tipagens e Variaveis */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

interface PropsComponentes {
  id: string;
  config?: Config;
}

export const Retangulo = ({ id, config }: PropsComponentes) => {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
  const refLeft = useRef<HTMLDivElement>({} as HTMLDivElement);
  const refTop = useRef<HTMLDivElement>({} as HTMLDivElement);
  const refRight = useRef<HTMLDivElement>({} as HTMLDivElement);
  const refBottom = useRef<HTMLDivElement>({} as HTMLDivElement);

  const { configuracoes } = useConfig();

  const [estado, setEstado] = useState(false);

  const [estadoWH, setEstadoWH] = useState({width: '150px', 
                                            height: '150px'});                                         

  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle); 
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    refTop.current.style.left = 'auto';
    refBottom.current.style.left = 'auto';
    refLeft.current.style.top = 'auto';
    refRight.current.style.top = 'auto';

    // Right resize
    const onMouseMoveRightResize = (event: { clientX: number; }) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
      setEstado(true);
    };

    const onMouseUpRightResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      setEstado(false);
      let w = String(width)+'px';
      estadoWH.width = w;
      setEstadoWH({...estadoWH});
    };

    const onMouseDownRightResize = (event: { clientX: number; }) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = '';
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
      setEstado(true);
    };

    // Top resize
    const onMouseMoveTopResize = (event: { clientY: number; }) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
      setEstado(true);
    };

    const onMouseUpTopResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
      setEstado(false);
      let h = String(height)+'px';
      estadoWH.height = h;
      setEstadoWH({...estadoWH});
    };

    const onMouseDownTopResize = (event: { clientY: number; }) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.bottom = styles.bottom;
      resizeableEle.style.top = '';
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
      setEstado(true);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event: { clientY: number; }) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
      setEstado(true);
    };

    const onMouseUpBottomResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
      let h = String(height)+'px';
      estadoWH.height = h;
      setEstadoWH({...estadoWH});
      setEstado(false);
    };

    const onMouseDownBottomResize = (event: { clientY: number; }) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = '';
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
      setEstado(true);
    };

    // Left resize
    const onMouseMoveLeftResize = (event: { clientX: number; }) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizeableEle.style.width = `${width}px`;
      setEstado(true);
    };

    const onMouseUpLeftResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
      setEstado(false);
      let w = String(width)+'px';
      estadoWH.width = w;
      setEstadoWH({...estadoWH});
    };

    const onMouseDownLeftResize = (event: { clientX: number; }) => {
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      resizeableEle.style.left = '';
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
      setEstado(true);
    };

    // Add mouse down event listener
    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
      setEstado(false); 
    };
    
  }, []);

  useEffect(() => {
    if (config?.width !== undefined && config?.height !== undefined) {
      setEstadoWH({...estadoWH,  width: config?.width, height: config?.height});
    } 

    const resizeableEle2 = ref.current;
    if (config) {
      resizeableEle2.style.width = `${config.width}`;
      resizeableEle2.style.height = `${config.height}`;
      resizeableEle2.style.borderRadius = `${config.borderRadius}`;
    }
  }, [configuracoes]);
  
  return (
      <Elemento 
        id={id} 
        width={estadoWH.width}
        height={estadoWH.height}
        ref={ref} 
        refLeft={refLeft} 
        refTop={refTop}
        refRight={refRight}
        refBottom={refBottom}
        config={config}
        estado={estado}
      />
  );
}