/* Framework Style Component */
import styled from 'styled-components';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

const Paragrafo = styled.div<Config>`
      display: block;
      width:0;
      height:0;
      color: ${(p) => p.bgColor}; 
      font-size: ${(p) => p.fontSize}; 
      font-family: ${(p) => p.fontFamily};  
      text-align: ${(p) => p.textAlign};
      margin-block-start: ${(p) => p.marginBlockStart}; 
      margin-block-end: ${(p) => p.marginBlockEnd}; 
      margin-inline-start: ${(p) => p.marginInlineStart}; 
      margin-inline-end: ${(p) => p.marginInlineEnd}; 
      font-weight: ${(p) => p.fontWeight};
      -webkit-text-stroke: ${(p) => p.webkitTextStroke}; 
      opacity: ${(p) => p.opacity};
      z-index: ${(p) => p.zIndex};
`;

export default Paragrafo;
