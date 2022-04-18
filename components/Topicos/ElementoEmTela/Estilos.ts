import styled from 'styled-components';

interface Props {
    width?: string;
    height?: string;
  
    bgColor?: string;
    
    fontSize?: string;
    fontColor?: string;
  
    typeBorder?: string;
    colorBorder?: string;
    
    boxShadow?: string;
  
    positionX?: string;
    positionY?: string;
}

const Estilizacao = styled.div<Props>`
background: ${(p) => p.bgColor};
position: absolute;
width: ${(p) => p.width};
height: ${(p) => p.height};
border-radius: 3px;
display: flex;
justify-content: center;
align-items: center;
min-width: 15px;
min-height: 15px;
border-radius: 10px;
`;

export default Estilizacao;
