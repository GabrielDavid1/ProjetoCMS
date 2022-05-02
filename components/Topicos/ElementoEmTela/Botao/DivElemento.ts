/* Framework Style Component */
import styled from 'styled-components';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

const SeletorPequeno = styled.div<Config>`
      background: ${(p) => p.bgColor};
      position: absolute;
      width: ${(p) => p.width};
      height: ${(p) => p.height};
      top: ${(p) => p.top};
      left: ${(p) => p.left};
      opacity: ${(p) => p.opacity};
      z-index: ${(p) => p.zIndex};
      transform: ${(p) => p.transform};
      display: flex;
      justify-content: center;
      align-items: center;
`;

export default SeletorPequeno;
