/* Componente Framework Material-UI */
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

/* Componente Botão personalizado */
import { ButtonTopic } from '../../../Topicos/Button';

interface propsConfig {
    status: boolean;
    svg: string;
}

interface Titulo {
    elemento: any;
    botaoAlinha: propsConfig;
    estado: string;
    add: (id:string, parametro:boolean) => void;
}

export function Titulo({ botaoAlinha, estado, add }:Titulo) {
    const { idTotal, configuracoes, setConfiguracoes } = useConfig();

    function mudarPropriedades (event = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>, tipo: string) {
        switch (tipo) {
          case 'h1': 
              setConfiguracoes(
                configuracoes.map(el => (el.id === idTotal && el.config !== undefined
                    ? {...el, config: 
                      {...el.config,
                        fontSize: '2em',
                        display: 'block',
                        marginBlockStart: '0.67em',
                        marginBlockEnd: '0.67em',
                        marginInlineStart: '0px',
                        marginInlineEnd: '0px',
                        fontWeight: 'bold',
                      }} 
                    : el ))
              )
          break;
          case 'h2': 
              setConfiguracoes(
                configuracoes.map(el => (el.id === idTotal && el.config !== undefined
                    ? {...el, config: 
                      {...el.config,
                        fontSize: '1.5em',
                        display: 'block',
                        marginBlockStart: '0.83em',
                        marginBlockEnd: '0.83em',
                        marginInlineStart: '0px',
                        marginInlineEnd: '0px',
                        fontWeight: 'bold',
                      }} 
                    : el ))
              )
          break;
          case 'h3': 
              setConfiguracoes(
                configuracoes.map(el => (el.id === idTotal && el.config !== undefined
                    ? {...el, config: 
                      {...el.config,
                        fontSize: '1.17em',
                        display: 'block',
                        marginBlockStart: '1em',
                        marginBlockEnd: '1em',
                        marginInlineStart: '0px',
                        marginInlineEnd: '0px',
                        fontWeight: 'bold',
                      }} 
                    : el ))
              )
          break;
          case 'h4': 
              setConfiguracoes(
                configuracoes.map(el => (el.id === idTotal && el.config !== undefined
                    ? {...el, config: 
                      {...el.config,
                        fontSize: '1.17em',
                        display: 'block',
                        marginBlockStart: '1.33em',
                        marginBlockEnd: '1.33em',
                        marginInlineStart: '0px',
                        marginInlineEnd: '0px',
                        fontWeight: 'bold',
                      }} 
                    : el ))
              )
          break;
        }
        event.preventDefault();
    }

    return (
      <li> 
        <b>Título</b>
        <div className="corrige">
        <Button 
          sx={{':hover': {
            bgcolor: 'white',
            color: 'white',
          }, width:"10px"}}
          onClick={() => add('1', !botaoAlinha.status)}
        >
          <ButtonTopic name="add" path={botaoAlinha.svg} />
        </Button>
        </div>
        {estado !== 'none' && (
          <div className="controleBotoes">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: 'background.paper',
                color: 'text.secondary',
                '& svg': {
                  m: 1.5,
                },
                '& hr': {
                  mx: 0.5,
                },
              }}
            >
              <Button onClick={(e) => mudarPropriedades(e, 'h1')}>
                 <h3> H1 </h3>
              </Button>
              <Button onClick={(e) => mudarPropriedades(e, 'h2')}>
                 <h3> H2 </h3>
              </Button>
              <Button onClick={(e) => mudarPropriedades(e, 'h3')}>
                 <h3> H3 </h3>
              </Button>
              <Button onClick={(e) => mudarPropriedades(e, 'h4')}>
                 <h3> H4 </h3>
              </Button>
            </Box>
          </div>
        )}
      </li>
    )
}
