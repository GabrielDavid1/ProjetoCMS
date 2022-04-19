/* Contexto */ 
import { memo } from 'react';
import { useConfig } from '../../contexts/useConfig';
import Retangulo from '../Topicos/ElementoEmTela/Retangulo';

interface Config {
  width?: string;
  height?: string;

  bgColor?: string;
  
  fontSize?: string;
  fontColor?: string;

  pxBorder?: string;
  typeBorder?: string;
  colorBorder?: string;
  borderRadius?:string;
  boxShadow?: string;

  positionX?: string;
  positionY?: string;
}

export default function Teste() { 
  const { configuracoes } = useConfig();

  const ElementoTopico = ( id:string, type: string, config = {} as Config) => {
    switch (type) {
      case 'Retangulo':
        return(<><Retangulo id={id} config={config} /></>)
      case 'Text':
        return (<> texto kkkk </>)     
      default:
        return null; 
    }
  }

  return (
    <div className="container">
        {configuracoes.map((listaItem, index) => (
          <div key={index}>
            { 
              ElementoTopico(listaItem.id, listaItem.type, listaItem.config)
            }
          </div>
        ))}
    </div>
  )          
}

export const Conteudo = memo(Teste);
