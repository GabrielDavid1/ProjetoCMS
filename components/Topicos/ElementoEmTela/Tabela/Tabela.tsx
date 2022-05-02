/* React */
import React, { useEffect, useRef, useState } from "react";

/* Componentes */
import { Elemento } from './Elemento';

/* Tipagens e Variaveis */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';
import { propriedadeEstilo } from '../../../../Importacoes/Variaveis/Variaveis';

interface PropsComponentes {
  id: string;
  config?: Config;
}

export const Tabela = ({ id, config }: PropsComponentes) => {
  const refPrincipal = useRef<HTMLDivElement>({} as HTMLDivElement);
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [estadoTransform, setEstadoTransform] = useState('');

  function pegarTransform () {
    const styles = window.getComputedStyle(ref.current);
    setEstadoTransform(styles.transform);
  }

  return (
   <div 
    ref={refPrincipal}
    onMouseUp={pegarTransform}
    style={{transform: propriedadeEstilo.tabela.transform}} 
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