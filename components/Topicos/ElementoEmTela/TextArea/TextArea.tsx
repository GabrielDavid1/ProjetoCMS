/* React */
import React, { useRef, useEffect, useState } from "react";

/* Componentes */
import { useConfig } from '../../../../contexts/useConfig';
import { Elemento } from './Elemento';

/* Tipagens e Variaveis */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';
import { propriedadeEstilo } from '../../../../Importacoes/Variaveis/Variaveis';

interface PropsComponentes {
  id: string;
  config?: Config;
}

export const TextArea = ({ id, config }: PropsComponentes) => {
  const refPrincipal = useRef<HTMLDivElement>({} as HTMLDivElement);
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

  const { configuracoes } = useConfig();
  const [estadoTransform, setEstadoTransform] = useState('');  

  useEffect(() => {
    ref.current.style.top = "360px";
    ref.current.style.left = "550px";
  }, [configuracoes]);

  function pegarTransform () {
    const styles = window.getComputedStyle(ref.current);
    setEstadoTransform(styles.transform);
  }  

  return (
    <div 
      ref={refPrincipal}
      onMouseUp={pegarTransform}
      style={{transform: propriedadeEstilo.textArea.transform}} 
    > 
     <Elemento 
        ref={ref}
        id={id} 
        config={config}
        estadoTransform={estadoTransform}
     />
    </div>
  );
}