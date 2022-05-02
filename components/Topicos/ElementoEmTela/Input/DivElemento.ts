/* Framework Style Component */
import styled from 'styled-components';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

const SeletorPequeno = styled.div<Config>`
      background: ${(p) => p.bgColor};
      position: absolute;
      width: ${(p) => p.width};
      height: ${(p) => p.height};
      opacity: ${(p) => p.opacity};
      z-index: ${(p) => p.zIndex};
      display: flex;
      justify-content: center;
      align-items: center;
`;

export default SeletorPequeno;
