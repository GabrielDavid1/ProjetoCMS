import React from 'react'
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable'

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

/* Div */
import Paragrafo from './Paragrafo';

interface Propriedade {
    html: string;
}{}

interface Props {
  config?: Config;
}

export function InputTexto ({ config }: Props) {
    let contentEditable = React.createRef<HTMLElement>();

    const [subTexto, setSubTexto] = React.useState('Texto');
    const [estado, setEstado] = React.useState<Propriedade>({html: '<p>'+ subTexto +'</p>'});
    const [parametro, setParametro] = React.useState(1)

    const handleChange = (event: ContentEditableEvent) => {
        setEstado({html: event.target.value});
        setSubTexto(event.currentTarget.innerText);
    };

    const apertarEnter = (e: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) : void => {
        if (e.key === 'Enter') {
            setParametro(1);
        }
    }

    return (
        <Paragrafo 
            className="blocoInput"
            onKeyDown={apertarEnter}
            onMouseDown={(e) => setParametro(e.detail)}
            display="none"
            bgColor={config?.bgColor}
            fontSize={config?.fontSize}
            fontFamily={config?.fontFamily}
            marginBlockStart = {config?.marginBlockStart}
            marginBlockEnd = {config?.marginBlockEnd}
            marginInlineStart = {config?.marginInlineStart}
            marginInlineEnd = {config?.marginInlineEnd}
            fontWeight = {config?.fontWeight}
            webkitTextStroke = {config?.webkitTextStroke}
            opacity={config?.opacity}
            zIndex={config?.zIndex}
        > 
          {config?.textoArea}
        </Paragrafo>
    )
}