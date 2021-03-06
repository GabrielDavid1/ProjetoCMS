/* Marcador para Slider (Configuração de Topicos) */
export const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 30,
      label: '30%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 75,
      label: '75%',
    },
    {
      value: 100,
      label: '100%',
    },
];

/* Estilização do Modal Deletar */
export const styleDeletar = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '91.1%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/* Estilização do Modal Renomear */
export const styleRenomear = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '91.1%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/* Grupo de Botões Estaticos */
export const ButtonList = [
	{
    id: '1',
		name: "Retangulo",
    type: "Retangulo",
    path: "M2 4h20v16H2z"
	},
	{
    id: '2',
		name: "Text",
    type: "Text",
    path: "M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"
	},
	{
    id: '3',
		name: "Input",
    type: "Input",
    path: "M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"
	},

  { id: '4',
		name: "TextArea",
    type: "TextArea",
    path: "M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"
	},
  { id: '5',
		name: "Tabela",
    type: "Tabela",
    path: "M19 7H9c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 2v2H9V9h10zm-6 6v-2h2v2h-2zm2 2v2h-2v-2h2zm-4-2H9v-2h2v2zm6-2h2v2h-2v-2zm-8 4h2v2H9v-2zm8 2v-2h2v2h-2zM6 17H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v1h-2V5H5v10h1v2z"
	},
  { id: '6',
		name: "Grafico",
    type: "Grafico",
    path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
	},
  { id: '7',
		name: "Botao",
    type: "Botao",
    path: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"
	},
  { id: '8',
		name: "Imagem",
    type: "Imagem",
    path: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
	},
]

/* icones de seção de configuração */
export const icones = {
  engrenagem: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  casa: 'M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z'
}

/* Variaeis para passo a passo de configuração de eventos */
export const steps = [
 'Selecione o tipo de evento',
 'Especifique o primeiro parametro',
 'Especifique a condição', 
 'Especifique o segundo parametro',
 'Determinar ação'
];

/* Variaveis para estilização dos elementos */
export const propriedadeEstilo = {
    retangulo: 
    {
      tipo:'Retangulo',
      multiSelect: false,
      width: "150px",
      height: "150px",
      x: 560,
      y: 249,
      bgColor: "orange",
      pxBorder: "1px",
      typeBorder: "3",
      colorBorder: "#rrggbb",
      boxShadow: "0px 0px 0px", 
      borderRadius: "0px",
      opacity: "1",
      zIndex: "1",
    },

    text: 
    {
      tipo:'Text',
      multiSelect: false,
      display: "none",
      x: 570,
      y: 250,
      bgColor: "black",
      fontSize: "5rem",
      fontFamily: "Arial",
      textAlign: "none",
      marginBlockStart: "none",
      marginBlockEnd: "none",
      marginInlineStart: "none",
      marginInlineEnd: "none",
      fontWeight: "none",
      textoArea: 'Texto',
      opacity: "1",
      zIndex: "1",
      webkitTextStroke: "none",
    },
    
    input: 
    {
      tipo:'Input',
      tipoCache: 'padrao',
      multiSelect: false,
      width: '150px',
      height: '30px',
      x: 580,
      y: 300,
      textoArea: '',
      bgColor: 'red',
      fontSize: "20px",
      opacity: "1",
      zIndex: "1",
    },

    tabela: 
    {
      tipo:'Tabela',
      multiSelect: false,
      width: 'auto',
      height: 'auto',
      x: 380,
      y: 249,
      bgColor: 'none',
      fontSize: "20px",
      rows: [
        {
          name: 'comida',
          calories: 159,
          fat: 6.0, 
          carbs: 24,
          protein: 4.0
         },
         {
           name: 'Ice cream sandwich',
           calories: 237,
           fat: 9.0, 
           carbs: 37,
           protein: 4.3
          },
          {
           name: 'Eclair',
           calories: 262,
           fat: 16.0, 
           carbs: 24,
           protein: 6.0
          },        
      ],
      opacity: "1",
      zIndex: "1",
    },

    botao: 
    {
      tipo:'Botao',
      multiSelect: false,
      modeloBotao: 'none',
      botaoTitulo: 'Botao',
      width: '100px',
      height: '65px',
      top: '0px',
      left: '0px',
      x: 620,
      y: 249,
      fontSize: '1rem',
      fontColor: '#1976d2',
      bgColor: 'white',
      svgColor: 'rgba(0, 0, 0, 0.26)',
      borderRadius: "0px",
      pxBorder: "1px",
      typeBorder: "solid",
      colorBorder: "#rrggbb",
      opacity: "1",
      zIndex: "1",
    },

    grafico: {
      tipo:'Grafico',
      multiSelect: false,
      width: '280px',
      height: '235px',
      x: 550,
      y: 249,
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          zoom: {
             enabled: false,
          },
          foreColor: 'blue',
        },
        grid: {
          show: true,
        },
        
        dataLabels: {
          enabled: false,
        },
        
        tooltip: {
          enabled: false,
        },
      
        xaxis: {
          type: 'datetime',
          axisBorder: {
            color: 'blue'
          },
          axisTicks: {
            color: 'blue'
          },
          categories: [ 
            '2021-03-18T00:00:00.000Z',
            '2021-03-19T00:00:00.000Z',
            '2021-03-20T00:00:00.000Z',
            '2021-03-21T00:00:00.000Z',
            '2021-03-22T00:00:00.000Z',
            '2021-03-23T00:00:00.000Z',
            '2021-03-24T00:00:00.000Z',
          ],
        },
        fill: {
          opacity: 0.3,
          type: 'gradient',
          gradient: {
             shade: 'dark',
             opacityFrom: 0.7,
             opacityTo: 0.7
          }   
       },
      },
      series: [ 
        { name: 'serie1', data:[31,120,18,28,61,18,189] }
      ],
      opacity: "1",
      zIndex: "1",
    },
    
    textArea: {
      tipo:'TextArea',
      multiSelect: false,
      bgColor: 'white',
      width: '250px',
      height: '100px',
      x: 527,
      y: 297,
      fontSize: "1rem",
      fontColor: 'black',
      textoArea: 'Text Área',
      opacity: "1",
      zIndex: "1",
    },

    imagem: {
      tipo:'Imagem',
      multiSelect: false,
      width: 'auto',
      height: 'auto',
      x: 595,
      y: 250,
      statusImagem: false,
      opacity: "1",
      zIndex: "1",
    },
}

/* Lista de tipos para elementos */
export const tiposTamanho = [
    'width',
    'height',
    'bgColor',
    'boxShadow',
    'borderRadius',
    'textoArea',
    'fontColor',
    'fontSize',
    'fontFamily',
    'textAlign',
    'fontWeight',
    'svgColor',
    'opacity',
    'zIndex',
]

/* Variaveis para condições */
export const condicoes = [
  {id: '1', tipo: 'Maior'},
  {id: '2', tipo: 'Igual'},
  {id: '3', tipo: 'Diferente'},
  {id: '4', tipo: 'Menor'},
  {id: '5', tipo: 'Maior igual'},
  {id: '6', tipo: 'Menor igual'},
];

/* Template CARD */
export const cardLista = [
  {
    id: 'root',
    name: "Sua árvore de tópicos adicionados",
    tipoCache: "Template",
    children: [
      {
        id: '0.9',
        tipoCache: "padrao",
        name: '',
        children: [],
      },
      {
        children: [],
        id: "20",
        name: "cabeçalho",
        tipoCache: "Template",
      },
      {
        children: [],
        id: "21",
        name: "corpo",
        tipoCache: "Template",
      },
      {
        children: [],
        id: "22",
        name: "Titulo",
        tipoCache: "Template",
      },
      {
        children: [],
        id: "23",
        name: "Conteudo",
        tipoCache: "Template",
      },
    ]
  }
];

export const cardConfig = [
  {
    id: "20",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Retangulo",
    config: {
      bgColor: "orange",
      borderRadius: "20px",
      boxShadow: "0px 0px 0px",
      colorBorder: "#rrggbb",
      height: "94px",
      multiSelect: false,
      opacity: "1",
      pxBorder: "1px",
      tipo: "Retangulo",
      typeBorder: "3",
      width: "343px",
      x: 362,
      y: 186,
      zIndex: "1",
    }
  },
  {
    id: "21",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Retangulo",
    config: {
      bgColor: "#fffefb",
      borderRadius: "0px",
      boxShadow: "0px 0px 0px",
      colorBorder: "#rrggbb",
      height: "107px",
      multiSelect: false,
      opacity: "1",
      pxBorder: "1px",
      tipo: "Retangulo",
      typeBorder: "3",
      width: "344px",
      x: 362,
      y: 225,
      zIndex: "1",
    }
  },
  {
    id: "22",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Text",
    config: {
      bgColor: "#422605",
      display: "block",
      fontFamily: "Arial",
      fontSize: "2em",
      fontWeight: "bold",
      marginBlockEnd: "0.67em",
      marginBlockStart: "0.67em",
      marginInlineEnd: "0px",
      marginInlineStart: "0px",
      multiSelect: false,
      opacity: "1",
      textAlign: "center",
      textoArea: "Titulo",
      tipo: "Text",
      webkitTextStroke: "none",
      x: 375,
      y: 164,
      zIndex: "1",
    }
  },
  {
    id: "23",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Text",
    config: {
      bgColor: "black",
      display: "none",
      fontFamily: "Arial",
      fontSize: "5rem",
      fontWeight: "none",
      marginBlockEnd: "none",
      marginBlockStart: "none",
      marginInlineEnd: "none",
      marginInlineStart: "none",
      multiSelect: false,
      opacity: "1",
      textAlign: "none",
      textoArea: "Card",
      tipo: "Text",
      webkitTextStroke: "none",
      x: 440,
      y: 228,
      zIndex: "1",
    }
  },
]; 

/* Template Tabela */
export const tabelaLista = [
  {
    id: 'root',
    name: "Sua árvore de tópicos adicionados",
    tipoCache: "Template",
    children: [
      {
        id: '0.9',
        tipoCache: "padrao",
        name: '',
        children: [],
      },
      {
        children: [],
        id: "1",
        name: "Fundo",
        tipoCache: "Template",
      },
      {
        children: [],
        id: "2",
        name: "Titulo",
        tipoCache: "Template",
      },
      {
        children: [],
        id: "3",
        name: "Conteudo",
        tipoCache: "Template",
      },
    ]
  }
];

export const tabelaConfig = [
 {
  id: "1",
  idGrupo: "0",
  tipoCache: "Template",
  type: "Retangulo",
  config: {
    bgColor: "#fdfdfd",
    borderRadius: "0px",
    boxShadow: "1px 1px 5px",
    colorBorder: "#404040",
    height: "314px",
    multiSelect: false,
    opacity: "1",
    pxBorder: "1px",
    tipo: "Retangulo",
    typeBorder: "solid",
    width: "295px",
    x: 520,
    y: 165,
    zIndex: "1",
  },
 },
 {
  id: "2",
  idGrupo: "0",
  tipoCache: "Template",
  type: "Text",
  config: {
    bgColor: "black",
    display: "none",
    fontFamily: "Arial",
    fontSize: "5rem",
    fontWeight: "none",
    marginBlockEnd: "none",
    marginBlockStart: "none",
    marginInlineEnd: "none",
    marginInlineStart: "none",
    multiSelect: false,
    opacity: "1",
    textAlign: "none",
    textoArea: "Titulo",
    tipo: "Text",
    webkitTextStroke: "none",
    x: 538,
    y: 162,
    zIndex: "1",
  },
 },
 {
  id: "3",
  idGrupo: "0",
  tipoCache: "Template",
  type: "Text",
  config: {
    bgColor: "#3a3737",
    display: "none",
    fontFamily: "Arial",
    fontSize: "3rem",
    fontWeight: "none",
    marginBlockEnd: "none",
    marginBlockStart: "none",
    marginInlineEnd: "none",
    marginInlineStart: "none",
    multiSelect: false,
    opacity: "1",
    textAlign: "none",
    textoArea: "Conteudo",
    tipo: "Text",
    webkitTextStroke: "none",
    x: 562,
    y: 319,
    zIndex: "1",
  },
 },
]; 

/* Template Imagem */
export const imagemLista = [
  {
    id: 'root',
    name: "Sua árvore de tópicos adicionados",
    tipoCache: "Template",
    children: [
      {
        id: '0.9',
        tipoCache: "padrao",
        name: '',
        children: [],
      },
      {
        children: [],
        id: "1",
        name: "Fundo",
        tipoCache: "Template",
      },
      {
        children: [],
        id: "2",
        name: "Imagem",
        tipoCache: "Template",
      },
    ]
  }
];

export const imagemConfig = [
  {
    id: "1",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Retangulo",
    config: {
      bgColor: "#fcfcfc",
      borderRadius: "0px",
      boxShadow: "0px 0px 0px",
      colorBorder: "#424242",
      height: "323px",
      multiSelect: false,
      opacity: "1",
      pxBorder: "1px",
      tipo: "Retangulo",
      typeBorder: "solid",
      width: "642px",
      x: 370,
      y: 204,
      zIndex: "1",
    },  
  },
  {
    id: "2",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Imagem",
    config: {
      height: "auto",
      multiSelect: false,
      opacity: "1",
      statusImagem: false,
      tipo: "Imagem",
      width: "auto",
      x: 639,
      y: 329,
      zIndex: "1",
    }
  },
];

/* Template Email */
export const emailLista = [
  {
    id: 'root',
    name: "Sua árvore de tópicos adicionados",
    tipoCache: "Template",
    children: [
       {
        children: [],
        id: "1",
        name: "Fundo",
        tipoCache: "Template",
       },
       {
        children: [],
        id: "2",
        name: "Divisor",
        tipoCache: "Template",
       },   
       {
        children: [],
        id: "3",
        name: "Titulo",
        tipoCache: "Template",
       }, 
       {
        children: [],
        id: "4",
        name: "Input",
        tipoCache: "Template",
       },
       {
        children: [],
        id: "5",
        name: "Botao",
        tipoCache: "Template",
       },
    ],
  }, 
];

export const emailConfig = [
  {
    id: "1",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Retangulo",
    config: {
      bgColor: "#ffffff",
      borderRadius: "0px",
      boxShadow: "0px 0px 0px",
      colorBorder: "#5c5c5c",
      height: "401px",
      multiSelect: false,
      opacity: "1",
      pxBorder: "1px",
      tipo: "Retangulo",
      typeBorder: "solid",
      width: "687px",
      x: 293,
      y: 136,
      zIndex: "1",
    },
  },
  {
    id: "2",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Retangulo",
    config: {
      bgColor: "#817f7c",
      borderRadius: "0px",
      boxShadow: "0px 0px 0px",
      colorBorder: "#rrggbb",
      height: "4px",
      multiSelect: false,
      opacity: "1",
      pxBorder: "1px",
      tipo: "Retangulo",
      typeBorder: "3",
      width: "686px",
      x: 293,
      y: 225,
      zIndex: "1",
    },
  },
  {
    id: "3",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Text",
    config: {
      bgColor: "#383737",
      display: "none",
      fontFamily: "Arial",
      fontSize: "4rem",
      fontWeight: "none",
      marginBlockEnd: "none",
      marginBlockStart: "none",
      marginInlineEnd: "none",
      marginInlineStart: "none",
      multiSelect: false,
      opacity: "1",
      textAlign: "none",
      textoArea: "Digite seu email",
      tipo: "Text",
      webkitTextStroke: "none",
      x: 393,
      y: 133,
      zIndex: "1",
    },
  },
  {
    id: "4",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Input",
    config: {
      bgColor: "red",
      fontSize: "4rem",
      height: "61px",
      multiSelect: false,
      opacity: "1",
      textoArea: "",
      tipo: "Input",
      tipoCache: "padrao",
      width: "582px",
      x: 343,
      y: 310,
      zIndex: "1",
    },
  },
  {
    id: "5",
    idGrupo: "0",
    tipoCache: "Template",
    type: "Botao",
    config: {
      bgColor: "white",
      borderRadius: "0px",
      botaoTitulo: "ENVIAR",
      colorBorder: "#5f95f1",
      fontColor: "#1976d2",
      fontSize: "2rem",
      height: "65px",
      left: "0px",
      modeloBotao: "none",
      multiSelect: false,
      opacity: "1",
      pxBorder: "1px",
      svgColor: "rgba(0, 0, 0, 0.26)",
      tipo: "Botao",
      top: "0px",
      typeBorder: "solid",
      width: "582px",
      x: 344,
      y: 419,
      zIndex: "1",
    },
  },
];