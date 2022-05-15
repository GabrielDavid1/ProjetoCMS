/* React */
import React, { useEffect, useState } from 'react';

/* Componentes Framework Material-UI */
import Divider from '@material-ui/core/Divider';
import { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

/* Contextos */
import { useList } from '../../../contexts/useTopicos';
import { useEvent } from '../../../contexts/useEvent';
import { useConfig } from '../../../contexts/useConfig';

/* Componentes */
import { TabelaDeCor } from './AreaConfig/TabelaDeCor';
import { Propriedades } from './AreaConfig/Propriedades';
import { Borda } from './AreaConfig/Borda';
import { Tipos } from './AreaConfig/Tipos';
import { BorderRadius } from './AreaConfig/BorderRadius';
import { Opacidade } from '../Padrao/Opacidade';
import { Camada } from '../Padrao/Camada';
import { Fonte } from './AreaConfig/Fonte';

export function Botao () {
    const [tipo, setTipo] = useState('1');
    const [border, setBorder] = useState('1');
    const [borderRadius, setBorderRadius] = useState('1');
    const [fonte, setFonte] = useState('1');

    const [botaoRadius, setBotaoRadius] = useState({ status: false, svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' });
    const [tiposBotao, setTiposBotao] = useState({ status: false, svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' });
  
    const { quantidadeEventos, setQuantidadeEventos, removeEvento } = useEvent();
    const { ativarToggleLateral, list, setList, nomesAgrupados, setNomesAgrupados } = useList();
    const { idTotal, buscarConfigs, configuracoes, setConfiguracoes } = useConfig();

    let elementoGuardado:any = buscarConfigs(idTotal);
    let listaBuscado: any = nomesAgrupados.find(elemento => elemento.id === idTotal);

    const handleChange = (event: SelectChangeEvent) => {
      event.preventDefault();
      setBorder(event.target.value as string);
      elementoGuardado.pxBorder = event.target.value as string+'px';  
      setConfiguracoes([...configuracoes]); 
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      elementoGuardado.typeBorder = event.target.value;  
      setConfiguracoes([...configuracoes]); 
    };
  
    const handleChange3 = (event: SelectChangeEvent) => {
      event.preventDefault();
      setTipo(event.target.value as string);

      if(Number(event.target.value) === 2) {
         elementoGuardado.modeloBotao = 'circular';   
      } else {
         elementoGuardado.modeloBotao = 'padrao';         
      }
      setConfiguracoes([...configuracoes]); 
    };

    const handleChange4 = (event: SelectChangeEvent) => {
      event.preventDefault();
      setBorderRadius(event.target.value as string);
      elementoGuardado.borderRadius = event.target.value as string+'px';  
      setConfiguracoes([...configuracoes]); 
    };

    const handleChange5 = (event: SelectChangeEvent) => {
      event.preventDefault();
      let valor = event.target.value;
      valor = event.target.value+'rem';
      elementoGuardado.fontSize = valor;
      setConfiguracoes([...configuracoes]); 
      setFonte(event.target.value as string);
    };

    function toggleProps (id: string, parametro:boolean) {
        switch (id) {
          case '2':
            if (parametro === false) {
                elementoGuardado.modeloBotao = 'none'; 
            } else {
                elementoGuardado.modeloBotao = 'padrao'; 
            }
          break;
          case '3':
            if (parametro === false) {
                elementoGuardado.borderRadius = '0px'; 
            } else {
                elementoGuardado.borderRadius = '1px'; 
            }
          break;
        }
        setConfiguracoes([...configuracoes]); 
    }

    function add (id:string, parametro:boolean) {
        setTiposBotao({
          status: parametro, 
          svg: (parametro === false) 
                  ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
                  : 'M19 13H5v-2h14v2z'
        });  
        setBotaoRadius({
          status: parametro, 
          svg: (parametro === false) 
                  ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
                  : 'M19 13H5v-2h14v2z'
        }); 
        toggleProps(id, parametro);
    }

    function acionarEventos () {
        if(listaBuscado.evt === undefined) {
           setQuantidadeEventos(quantidadeEventos+1);
           let evento = {
              evento: "ativado",
              condicao: "vazio",
              acao: "vazio",
           }
           listaBuscado.evt = evento;
           setNomesAgrupados([...nomesAgrupados]);
           ativarToggleLateral('eventos');
        } else {
           setQuantidadeEventos(quantidadeEventos-1);            
           listaBuscado.evt = undefined;
           setNomesAgrupados([...nomesAgrupados]);
           removeEvento(idTotal, 'tipos');
           ativarToggleLateral('configs');
        }
    }

    useEffect(() => {
        elementoGuardado = buscarConfigs(idTotal);
        if (elementoGuardado.modeloBotao !== 'none') {
            setTiposBotao({ 
              status: true, 
              svg: 'M19 13H5v-2h14v2z'
            });
        } else {
            setTiposBotao({
             status: false, 
             svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
           });         
        }

        if (elementoGuardado.borderRadius !== '0px') {
            setBotaoRadius({ 
              status: true, 
              svg: 'M19 13H5v-2h14v2z'
            });
        } else {
            setBotaoRadius({
              status: false, 
              svg: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' 
            });         
        }
    }, [idTotal, configuracoes]);
    
    return (
        <>
        {/* Toda a área da tabela de coloração */}  
        <TabelaDeCor 
            cor={elementoGuardado.bgColor ? elementoGuardado.bgColor : '#fff'}
            elemento={elementoGuardado}
        />
        <Divider />
        <div className="areaConfig">
          <ul>
            {/* Toda a área das propriedades*/}  
            <Propriedades 
               elemento={elementoGuardado}
            />
            {/* Toda a área da configuração da borda*/}
            <Borda
               border={border}
               elemento={elementoGuardado}
               handleChange={handleChange}
               handleChange2={handleChange2}
            />

            {/* Toda a área da fonte*/}
            <Fonte
              font={fonte}
              elemento={elementoGuardado}
              handleChange={handleChange5}
            />

            {/* Toda a área da configuração do sombreamento*/}
            <Tipos
               tipo={tipo}
               tiposBotao={tiposBotao}
               tipoVisibilidade={elementoGuardado.modeloBotao}
               handleChange3={handleChange3}
               add={add}
            />
            {/* Toda a área da configuração do posicionamento*/}
            <BorderRadius
               borderRadius={borderRadius}
               botaoRadius={botaoRadius}
               borderRadiusVisibilidade={elementoGuardado.borderRadius}
               handleChange4={handleChange4}
               add={add} 
            />
            {/* Toda a área da configuração da opacidade*/}
            <Opacidade />
            
            {/* Toda a área da configuração da camada*/}
            <Camada propriedades={elementoGuardado} />

            {/* Área do botão de eventos  */}
            <li>
              <Button 
                 variant="contained" 
                 style={{ 
                    backgroundColor:'#1976d2', 
                    color:'white',
                    padding: '10px',
                    marginLeft: '65px',
                    borderRadius: '5px'
                }}
                onClick={acionarEventos}
              > 
                { (listaBuscado.evt === undefined && listaBuscado !== undefined) 
                      ? "Adicionar Evento" 
                      : "Remover Evento"
                }
              </Button>
            </li>
          </ul>
        </div>
        </>
    )
}