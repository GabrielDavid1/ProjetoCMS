/* React */
import React, { useRef } from "react";

/* Componentes */
import { Elemento } from './Elemento';

/* Tipagens e Variaveis */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

interface PropsComponentes {
  id: string;
  config?: Config;
}

export const Tabela = ({ id, config }: PropsComponentes) => {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

  return (
    <Elemento 
      ref={ref}
      id={id} 
      config={config}
    />
  );
}