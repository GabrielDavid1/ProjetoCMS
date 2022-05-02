/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

interface Propriedades {
    elemento: any;
}

export function Fonte({ 
    elemento,
}:Propriedades) {
    const { configuracoes, setConfiguracoes } = useConfig();

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>, tipo: string, cor = '#fff') {
        event.preventDefault();
        elemento.fontColor = event.target.value;  
        setConfiguracoes([...configuracoes]);
    }

    return (
      <li> 
        <div className="blocoTextArea">
          <b>Cor da fonte: </b>
          <div className="controleFonteBotao">
          <input
              type="color" 
              value={elemento.fontColor} 
              onChange={(e) => mudarPropriedades(e, 'colorBorder')} 
          />
          </div>
        </div>
      </li>
    )
}