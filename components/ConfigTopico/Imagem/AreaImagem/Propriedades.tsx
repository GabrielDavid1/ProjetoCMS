/* React */
import React from 'react';

type PropsConfig = {
    elemento: any;
}

export function Propriedades ({ 
    elemento, 
}: PropsConfig) {
    return (
      <li>
        <p> Propriedades: </p>
        <div className="blocoPropriedades">
            Largura: <input value={elemento.width} onChange={(e) => e}  disabled={true} />
            &ensp;
            Altura:  <input value={elemento.height} onChange={(e) => e} disabled={true} />
        </div>
      </li>
    )
}