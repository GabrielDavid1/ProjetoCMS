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
import { useList } from '../../../contexts/useTopicos';

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

  typeBorder?: string;
  colorBorder?: string;
  
  boxShadow?: string;

  positionX?: string;
  positionY?: string;
}

export function Retangulo () {
    let valorEstatico = 0;
    const [age, setAge] = useState('100%');
    const [borda, setBorda] = useState([
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

    const { idTotal, list, setList, selected } = useList();
    const { buscarConfigs } = useConfig();

    let elementoGuardado:any = buscarConfigs(idTotal);

    const [propriedades, setPropriedades] = useState<Config>({
      width: elementoGuardado.width,
      height: elementoGuardado.height,
      bgColor: elementoGuardado.bgColor
    });

    const handleChange = (event: SelectChangeEvent) => {
      event.preventDefault();
      setAge(event.target.value as string);
    };
  
    function add (id:string, parametro:boolean) {
      const ElementoAtualizar = [...borda];
      const Elemento = ElementoAtualizar.find(Element => Element.id === id);
      if (Elemento) {
          Elemento.status = parametro;
          Elemento.path = (parametro === false) ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' : 'M19 13H5v-2h14v2z';
          setBorda(ElementoAtualizar);
      }
    }

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>, tipo: string, cor = '#fff' ) {
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
        }
        setList({...list});
        event.preventDefault();
    }

    function getValue (valor: number) {
        return `${valor}°C`;
    }

    function valueLabelFormat(valor: number) {
      console.log(valor);
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
        setList({...list});
    }

    useEffect(() => {
      elementoGuardado = buscarConfigs(idTotal);
      setPropriedades(elementoGuardado);
    }, [idTotal])
    
    return (
        <>
        <ChromePicker color={propriedades.bgColor} onChange={(updatedColor, e) => mudarPropriedades(e, 'bgColor', updatedColor.hex)} />
        <Divider />
        <div className="areaConfig">
          <ul>
            {/* Toda a área das propriedades*/}  
            <li>
              <p> Propriedades: </p>
              <div className="blocoPropriedades">
                  Largura: <input value={propriedades.width} onChange={(e) => mudarPropriedades(e, 'width')} />
                  &ensp;
                  Altura:  <input value={propriedades.height} onChange={(e) => mudarPropriedades(e, 'height')}   />
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
                onClick={() => add(borda[0].id,!borda[0].status)}
              >
                <ButtonTopic name="add" path={borda[0].path}  />
              </Button>
              
              {borda[0].status &&  
                (
                  <div className="blocoBorda">

                    <input type="color" />
                    &ensp;  &ensp; &ensp;  

                    <FormControl sx={{width:"97px"}}>
                      <NativeSelect
                        defaultValue={30}
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value={10}>Tracejado</option>
                        <option value={20}>Duplo</option>
                        <option value={30}>Normal</option>
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
                onClick={() => add(borda[1].id,!borda[1].status)}
              >
                <ButtonTopic name="add" path={borda[1].path}  />
              </Button>

              {borda[1].status ? 
                  (       
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
    
                      sx={{width: "115px", height:"50px"}}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="0%">0%</MenuItem>
                      <MenuItem value="10%">10%</MenuItem>
                      <MenuItem value="50%">50%</MenuItem>
                      <MenuItem value="80%">80%</MenuItem>
                      <MenuItem value="100%">100%</MenuItem>
                    </Select>
                  </FormControl>
                  ) 
                  :
                  ( <> </> )
              }
            </li>
            {/* Toda a área da configuração do posicionamento*/}
            <li> 
              <b>Posicionamento</b> 

              <Button 
                sx={{':hover': {
                  bgcolor: 'white',
                  color: 'white',
                }, width:"10px"}}
                onClick={() => add(borda[2].id,!borda[2].status)}
              >
                <ButtonTopic name="add" path={borda[2].path}  />
              </Button>

              {
                borda[2].status ? 
                (                   
                <div className="blocoPropriedades">
                    Posi X: <input />
                    &ensp; &ensp;
                    Posi Y:  <input />
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