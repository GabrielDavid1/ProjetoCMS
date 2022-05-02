export interface List {
    id: string;
    name: string;
    children: List[]
}
import { ApexOptions } from 'apexcharts';
export interface Config {
    tipo?: string;

    multiSelect?: boolean;

    options?: ApexOptions;
    series?: Series[];

    display?: string;

    width?: string;
    height?: string;

    top?: string;
    left?: string;
  
    bgColor?: string;
    
    fontSize?: string;
    fontColor?: string;
    fontFamily?: string;
    textAlign?: string;
    fontWeight?: string;

    textoArea?: string;

    rows?: []

    modeloBotao?: string;
    botaoTitulo?: string;
    svgColor?: string;

    cardTitulo?: string;
    cardTexto?:string;

    webkitTextStroke?: string;

    marginBlockStart?: string;
    marginBlockEnd?: string;
    marginInlineStart?: string;
    marginInlineEnd?: string;

    border?: string;
    pxBorder?: string;
    typeBorder?: string;
    colorBorder?: string;
    borderRadius?: string;
    boxShadow?: string;
  
    statusImagem?: boolean;

    opacity?: string;
    zIndex?: string;
    transform?: string;
}

interface Series { 
    name: string, 
    data: number[] 
}