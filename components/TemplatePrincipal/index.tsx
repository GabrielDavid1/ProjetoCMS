/* Componentes Framework Material-UI */
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@mui/material/Tooltip';

import Box from '@mui/material/Box';
/* Componente clsx*/
import clsx from 'clsx';

/* Componentes React e Next*/
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { GetServerSidePropsContext } from 'next';

/* Componentes */
import ConteudoElementos from './ConteudoElementos';
import { EstruturaTopicos } from './EstruturaTopicos';
import { EstruturaConfig } from '../ConfigTopico/EstruturaConfig';
import ModalConfig from '../Topicos/Modal/ModalConfig';

/* Contexto */ 
import { useList } from '../../contexts/useTopicos';
import { useConfig } from '../../contexts/useConfig';
import { useCache } from '../../contexts/useCache';
import { useEvent } from '../../contexts/useEvent';

/* Funções */
import { useStyles } from '../../Importacoes/Funcoes/Funcoes';
import { ToggleBotao } from './ToggleBotao';

/* nookies */
import { setCookie, parseCookies } from 'nookies';
import nookies from 'nookies';
import { ConteudoEventos } from './ConteudoEventos';
import ListaIcones from './ListaIcones';
import EstruturaEventos from '../Eventos/EstruturaEventos';

export default function LayoutWithMenuComponent(props:any) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const { configuracoes, setConfiguracoes } = useConfig();
  const { toggleLateral, list, setList, tamanho, setTamanho } = useList();

  const { setInitialNodes, setInitialEdges,
          setNomeTooltip,  setQueryEvento,
          initialNodes, initialEdges,
          nomeTooltip, queryEvento,
          quantidadeEventos, setQuantidadeEventos,
        } = useEvent();

  const { configPagina, setConfigPagina  } = useCache();

  useEffect(() => {
    if (nookies.get().LISTA !== undefined) {
        setList(JSON.parse(nookies.get().LISTA));
        setConfiguracoes(JSON.parse(nookies.get().CONFIG));
        setTamanho(JSON.parse(nookies.get().TAMANHO));
        setConfigPagina(JSON.parse(nookies.get().CONFIGPAGINA));
        setInitialNodes(JSON.parse(nookies.get().INITIAL_NODES));
        setInitialEdges(JSON.parse(nookies.get().INITIAL_EDGES));
        setNomeTooltip(JSON.parse(nookies.get().NOME_TOOLTIP));
        setQueryEvento(JSON.parse(nookies.get().QUERY_EVENTO));
        setQuantidadeEventos(JSON.parse(nookies.get().QUANTIDADE_EVENTOS));
    } else {
        setCookie(null, 'LISTA', JSON.stringify([
          { id: 'root', name: "Sua árvore de tópicos adicionados",
            children: [{ 
                id: '0.1',
                name: '',
                children: [],
              }, 
            ]
          },
        ]), 
        { maxAge: 86400 * 7,
          path: '/', 
        });

        setCookie(null, 'CONFIG', JSON.stringify([
          { id: '0.1', type: 'padrao', idGrupo: '0',
            config: {
              width: "0px",
              height: "0px",
              bgColor: "white",
              pxBorder: "0px",
              typeBorder: "1",
              colorBorder: "#rrggbb",
              boxShadow: "0px 0px 0px", 
              borderRadius: "0px",
            }
           }]), 
        { maxAge: 86400 * 7,
          path: '/', 
        });

        setCookie(null, 'CONFIGPAGINA', JSON.stringify([
          { identificador: '1', nomePagina: 'Primeira Página', iconeId: '1' },
          { identificador: '2', nomePagina: 'Segunda Página',  iconeId: '2' },
          { identificador: '3', nomePagina: 'Terceira Página', iconeId: '2'},
        ]), 
        { maxAge: 86400 * 7,
          path: '/', 
        });

        setCookie(null, 'TAMANHO', JSON.stringify(0), 
        { maxAge: 86400 * 7,
          path: '/', 
        });

        setCookie(null, 'INITIAL_NODES', JSON.stringify([]), 
        { maxAge: 86400 * 7,
          path: '/', 
        });    

        setCookie(null, 'INITIAL_EDGES', JSON.stringify([]), 
        { maxAge: 86400 * 7,
          path: '/', 
        });    

        setCookie(null, 'NOME_TOOLTIP', JSON.stringify([]), 
        { maxAge: 86400 * 7,
          path: '/', 
        });  
        
        setCookie(null, 'QUERY_EVENTO', JSON.stringify([
          {
            idBotao: '',
            evento:  '',
            condicao: {
                par1: '',
                par2: '',
                par3: '',
            },
            acao: {
                id: '',
                tipo: '',
                alterado: '',
            },
            ativado: true,
          },
        ]), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
        
        setCookie(null, 'QUANTIDADE_EVENTOS', JSON.stringify(0), 
        { maxAge: 86400 * 7,
          path: '/', 
        });
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function salvarConfiguracoes (rota: string) {
    setCookie(null, 'LISTA', JSON.stringify(list), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    setCookie(null, 'CONFIG', JSON.stringify(configuracoes), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    setCookie(null, 'TAMANHO', JSON.stringify(tamanho), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    setCookie(null, 'CONFIGPAGINA', JSON.stringify(configPagina), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    setCookie(null, 'INITIAL_NODES', JSON.stringify(initialNodes), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    setCookie(null, 'INITIAL_EDGES', JSON.stringify(initialEdges), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    setCookie(null, 'NOME_TOOLTIP', JSON.stringify(nomeTooltip), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    setCookie(null, 'QUERY_EVENTO', JSON.stringify(queryEvento), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    setCookie(null, 'QUANTIDADE_EVENTOS', JSON.stringify(quantidadeEventos), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    Router.push(rota);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            {props.pagina === "primeiraPagina" && configPagina[0].nomePagina}
            {props.pagina === "segundaPagina" && configPagina[1].nomePagina}
            {props.pagina === "terceiraPagina" && configPagina[2].nomePagina}
          </Typography>

          <div className="profile-area">
             <Link href="/" passHref>
                <ListItem button component="a">Página principal</ListItem>
             </Link>  
             <Avatar alt="Gabriel David" /> 
          </div>
        </Toolbar>
      </AppBar>
        
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className="bottomClose">
          <Divider />
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
        </div>
        <List>
          <Tooltip style={{fontSize: '5rem'}} title={configPagina[0].nomePagina} placement="right-start">
            <ListItem onClick={() => salvarConfiguracoes('/')} button component="a">
                <ListItemIcon>
                    <ListaIcones parametro={configPagina[0].iconeId} />
                </ListItemIcon>
                <ListItemText primary="" />
            </ListItem>
          </Tooltip>

          <Tooltip style={{fontSize: '5rem'}} title={configPagina[1].nomePagina} placement="right-start">
            <ListItem  onClick={() => salvarConfiguracoes('/segundapagina')} button component="a">
                <ListItemIcon>
                  <ListaIcones parametro={configPagina[1].iconeId} />
                </ListItemIcon>
                <ListItemText primary="" />
            </ListItem>
          </Tooltip>

          <Tooltip style={{fontSize: '5rem'}} title={configPagina[2].nomePagina} placement="right-start">
            <ListItem onClick={() => salvarConfiguracoes('/terceirapagina')} button component="a">
                <ListItemIcon>
                  <ListaIcones parametro={configPagina[2].iconeId} />
                </ListItemIcon>
                <ListItemText primary="" />
            </ListItem>
          </Tooltip>
          <ModalConfig nomeDaPagina={props.pagina} />
        </List>
      </Drawer>
      <main className={clsx(classes.content, {
          [classes.contentShift]: open,
      })}> 
          <div className={classes.drawerHeader} />
          {!toggleLateral.eventos && <ConteudoElementos paginaAtual={props.pagina} />}
          {toggleLateral.eventos  && <ConteudoEventos nomePagina={props.pagina} />} 
      </main>
      
      <div className="makeStyles-appBar-3"> 
        <div className="config">
          <ToggleBotao nomePagina={props.pagina}/>
          { toggleLateral.principal && <EstruturaTopicos nomePagina={props.pagina}   />}
          { toggleLateral.configs   && <EstruturaConfig /> }
          { toggleLateral.eventos   && <EstruturaEventos nomePagina={props.pagina}   />}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context)
  return {
    props: {
      msg: '[SERVER]: Concluido',
      LISTA:cookies.LISTA,
      CONFIG:cookies.CONFIG,
      TAMANHO:cookies.TAMANHO,
      CONFIGPAGINA:cookies.CONFIGPAGINA,
      INITIAL_NODES:cookies.INITIAL_NODES,
      INITIAL_EDGES:cookies.INITIAL_EDGES,
      NOME_TOOLTIP:cookies.NOME_TOOLTIP,
      QUERY_EVENTO:cookies.QUERY_EVENTO,
      QUANTIDADE_EVENTOS:cookies.QUANTIDADE_EVENTOS,
    },
  }
}