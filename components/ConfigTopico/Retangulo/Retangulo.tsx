import Divider from '@material-ui/core/Divider';

import Button from '@mui/material/Button';

import { ButtonTopic } from '../../Topicos/Button';

import NativeSelect from '@mui/material/NativeSelect';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React, { useEffect, useRef, useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { ChromePicker } from 'react-color';

import { useConfig } from '../../../contexts/useConfig';

const marks = [
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

interface Config {
  width?: string;
  height?: string;

  bgColor?: string;
  
  fontSize?: string;
  fontColor?: string;

  pxBorder?: string;
  typeBorder?: string;
  colorBorder?: string;
  borderRadius?: string;
  boxShadow?: string;

  positionX?: string;
  positionY?: string;
}

export function Retangulo () {
    let valorEstatico = 0;
    const [shadow, setShadow] = useState('1');
    const [border, setBorder] = useState('1');
    
    const [borderRadius, setBorderRadius] = useState('1');

    const [campos, setCampos] = useState([
        {
          id: '1',
          status: false,
          path: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'
        }, 
        {
          id: '2',
          status: false,
          path: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'
        }, 
        {
          id: '3',
          status: false,
          path: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'
        }
    ]);

    const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
    const { idTotal, buscarConfigs, configuracoes, setConfiguracoes } = useConfig();

    let elementoGuardado:any = buscarConfigs(idTotal);

    const [propriedades, setPropriedades] = useState<Config>({
      width: elementoGuardado.width,
      height: elementoGuardado.height,
      bgColor: elementoGuardado.bgColor,
      pxBorder: elementoGuardado.pxBorder,
      typeBorder: elementoGuardado.typeBorder,
      colorBorder: elementoGuardado.colorBorder,
      boxShadow: elementoGuardado.boxShadow,
      borderRadius: elementoGuardado.borderRadius,
    });

    const handleChange = (event: SelectChangeEvent) => {
      event.preventDefault();
      setBorder(event.target.value as string);
      setPropriedades({...propriedades, pxBorder: event.target.value as string+'px'});
      elementoGuardado.pxBorder = event.target.value as string+'px';  
      setConfiguracoes([...configuracoes]); 
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      setPropriedades({...propriedades, typeBorder: event.target.value});
      elementoGuardado.typeBorder = event.target.value;  
      setConfiguracoes([...configuracoes]); 
    };
  
    const handleChange3 = (event: SelectChangeEvent) => {
      event.preventDefault();
      setShadow(event.target.value as string);
      elementoGuardado.boxShadow = '1px 1px '+event.target.value as string+'px';  
      setConfiguracoes([...configuracoes]); 
    };

    const handleChange4 = (event: SelectChangeEvent) => {
      event.preventDefault();
      setBorderRadius(event.target.value as string);
      elementoGuardado.borderRadius = event.target.value as string+'px';  
      setConfiguracoes([...configuracoes]); 
    };

    function add (id:string, parametro:boolean) {
      const ElementoAtualizar = [...campos];
      const Elemento = ElementoAtualizar.find(Element => Element.id === id);
      if (Elemento) {
          Elemento.status = parametro;
          Elemento.path = (parametro === false) ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' : 'M19 13H5v-2h14v2z';
          setCampos(ElementoAtualizar);
          toggleProps(id, parametro);
      }
    }

    function toggleProps (id: string, parametro:boolean) {
        switch (id) {
          case '1':
            if ( parametro === false ) {
              setPropriedades({...propriedades, pxBorder: 'none', typeBorder: '', colorBorder: ''});
              elementoGuardado.pxBorder = 'none'; 
              elementoGuardado.typeBorder = ''; 
              elementoGuardado.colorBorder = ''; 
            } else {
              setPropriedades({...propriedades, pxBorder: '1px', typeBorder: 'solid', colorBorder: 'black'});
              elementoGuardado.pxBorder = '1px'; 
              elementoGuardado.typeBorder = 'solid'; 
              elementoGuardado.colorBorder = 'black'; 
            }
            setConfiguracoes([...configuracoes]); 
          break;
          case '2':
            if ( parametro === false ) {
              elementoGuardado.boxShadow = '0px 0px 0px'; 
            } else {
              elementoGuardado.boxShadow = '1px 1px 1px'; 
            }
            setConfiguracoes([...configuracoes]); 
          break;
          case '3':
            if ( parametro === false ) {
              elementoGuardado.borderRadius = '0px'; 
            } else {
              elementoGuardado.borderRadius = '1px'; 
            }
            setConfiguracoes([...configuracoes]); 
          break;
        }
    }
    

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>, tipo: string, cor = '#fff', pixels = '0px') {
  
        switch ( tipo ) {
            case 'width': 
              setPropriedades({...propriedades, width: event.target.value});
              elementoGuardado.width = event.target.value;            
            break;
            case 'height':
              setPropriedades({...propriedades, height: event.target.value});
              elementoGuardado.height = event.target.value;               
            break;
            case 'bgColor':
              setPropriedades({...propriedades, bgColor: cor});
              elementoGuardado.bgColor = cor;            
            break;
            case 'colorBorder':
              setPropriedades({...propriedades, colorBorder: event.target.value});
              elementoGuardado.colorBorder = event.target.value;            
            break;
        }
        setConfiguracoes([...configuracoes]);
        event.preventDefault();
    }

    function getValue (valor: number) {
        return `${valor}°C`;
    }

    function valueLabelFormat(valor: number) {
        valorEstatico = valor;
        return marks.findIndex((mark) => mark.value === valor) + 1;
    }
    
    function convertePixels () {
        setPropriedades({...propriedades,
                         width: valorEstatico+'%',
                         height: valorEstatico+'%',
                        });
        elementoGuardado.width =  valorEstatico+'%';  
        elementoGuardado.height =  valorEstatico+'%'; 
        setConfiguracoes([...configuracoes]);
    }

    useEffect(() => {
      elementoGuardado = buscarConfigs(idTotal);
      setPropriedades(elementoGuardado);
    }, [idTotal])
    
    return (
        <>
        <ChromePicker 
           color={propriedades.bgColor} 
           onChange={(updatedColor, e) => mudarPropriedades(e, 'bgColor', updatedColor.hex)} 
        />
        <Divider />
        <div className="areaConfig">
          <ul>
            {/* Toda a área das propriedades*/}  
            <li>
              <p> Propriedades: </p>
              <div className="blocoPropriedades">
                  Largura: <input value={propriedades.width} onChange={(e) => mudarPropriedades(e, 'width')}   />
                  &ensp;
                  Altura:  <input value={propriedades.height} onChange={(e) => mudarPropriedades(e, 'height')} />
                  <Box sx={{ width: 255, padding: 1 }}>
                    <Slider
                      ref={ref}
                      aria-label="Always visible"
                      getAriaValueText={getValue}
                      valueLabelFormat={valueLabelFormat}
                      defaultValue={150}
                      step={10}
                      marks={marks}
                      onMouseUp={convertePixels}
                      valueLabelDisplay="off"
                    />
                  </Box>
              </div>
            </li>
            {/* Toda a área da configuração da borda*/}
            <li> 
              <b>Borda</b>

              <Button 
                sx={{':hover': {
                  bgcolor: 'white',
                  color: 'white',
                }, width:"10px"}}
                onClick={() => add(campos[0].id,!campos[0].status)}
              >
                <ButtonTopic name="add" path={campos[0].path}  />
              </Button>
              
              {campos[0].status &&  
                (
                  <div className="blocoBorda">

                    <input
                       type="color" 
                       value={propriedades.colorBorder} 
                       onChange={(e) => mudarPropriedades(e, 'colorBorder')} 
                    />
                    &ensp;  &ensp; &ensp;  
                    
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={border}
                        autoWidth
                        sx={{width: "70px", height:"35px"}}
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>1px</MenuItem>
                        <MenuItem value={2}>2px</MenuItem>
                        <MenuItem value={3}>3px</MenuItem>
                        <MenuItem value={4}>4px</MenuItem>
                        <MenuItem value={5}>5px</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl sx={{width:"100px", marginLeft: "90px"}}>
                      <NativeSelect
                        value={propriedades.typeBorder}
                        onChange={handleChange2}
                      >
                        <option value="dashed">Tracejado</option>
                        <option value="double">Duplo</option>
                        <option value="solid">Normal</option>
                      </NativeSelect>
                    </FormControl>
                    &ensp;  &ensp;  &ensp; 

                  </div>
                )}
            </li>
            {/* Toda a área da configuração do sombreamento*/}
            <li> 
              <b>Sombreamento </b> 

              <Button 
                sx={{':hover': {
                  bgcolor: 'white',
                  color: 'white',
                }, width:"10px"}}
                onClick={() => add(campos[1].id,!campos[1].status)}
              >
                <ButtonTopic name="add" path={campos[1].path}  />
              </Button>

              {campos[1].status ? 
                  (       
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={shadow}
                      sx={{width: "115px", height:"50px"}}
                      onChange={handleChange3}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={1}>1px</MenuItem>
                      <MenuItem value={2}>2px</MenuItem>
                      <MenuItem value={3}>3px</MenuItem>
                      <MenuItem value={4}>4px</MenuItem>
                      <MenuItem value={5}>5px</MenuItem>
                    </Select>
                  </FormControl>
                  ) 
                  :
                  ( <> </> )
              }
            </li>
            {/* Toda a área da configuração do posicionamento*/}
            <li> 
              <b>Modificar Borda</b> 

              <Button 
                sx={{':hover': {
                  bgcolor: 'white',
                  color: 'white',
                }, width:"10px"}}
                onClick={() => add(campos[2].id,!campos[2].status)}
              >
                <ButtonTopic name="add" path={campos[2].path}  />
              </Button>

              {
                campos[2].status ? 
                (                   
                <div className="blocoPropriedades">
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={borderRadius}
                      sx={{width: "115px", height:"50px"}}
                      onChange={handleChange4}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={5}>5px</MenuItem>
                      <MenuItem value={10}>10px</MenuItem>
                      <MenuItem value={20}>20px</MenuItem>
                      <MenuItem value={50}>50px</MenuItem>
                      <MenuItem value={100}>100px</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                ) 
                :
                ( <> </> )
              }
            </li>
          </ul>
        </div>
        </>
    )
}