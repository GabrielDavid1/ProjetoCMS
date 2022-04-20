/* Framework Style Component */
import styled from 'styled-components';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

const SeletorPequeno = styled.div<Config>`
      background: ${(p) => p.bgColor};
      position: absolute;
      width: ${(p) => p.width};
      height: ${(p) => p.height};
      border: ${(p) => p.border};
      box-shadow: ${(p) => p.boxShadow};
      border-radius: ${(p) => p.borderRadius};
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 15px;
      min-height: 15px;
`;

export default SeletorPequeno;
