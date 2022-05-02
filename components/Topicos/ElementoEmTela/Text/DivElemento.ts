/* Framework Style Component */
import styled from 'styled-components';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

const SeletorPequeno = styled.div<Config>`
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 15px;
      min-height: 15px;
      z-index: ${(p) => p.zIndex};
`;

export default SeletorPequeno;
