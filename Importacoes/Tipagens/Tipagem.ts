export interface List {
    id: string;
    name: string;
    children: List[]
}

export interface Config {
    width?: string;
    height?: string;
  
    bgColor?: string;
    
    fontSize?: string;
    fontColor?: string;
    
    border?: string;
    pxBorder?: string;
    typeBorder?: string;
    colorBorder?: string;
    borderRadius?: string;
    boxShadow?: string;
  
    positionX?: string;
    positionY?: string;
}