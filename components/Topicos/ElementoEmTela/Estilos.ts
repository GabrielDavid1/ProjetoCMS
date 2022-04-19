import styled from 'styled-components';

interface Props {
    width?: string;
    height?: string;
  
    bgColor?: string;
    
    fontSize?: string;
    fontColor?: string;

    border?: string;
    borderRadius?: string;
    boxShadow?: string;
  
    positionX?: string;
    positionY?: string;
}

const SeletorPequeno = styled.div<Props>`
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
      border-radius: 10px;
`;

export default SeletorPequeno;
