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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import LeakRemoveIcon from '@mui/icons-material/LeakRemove';

/* Componente clsx*/
import clsx from 'clsx';

/* Componentes React e Next*/
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { GetServerSidePropsContext } from 'next';

/* Componentes */
import ConteudoElementos from './ConteudoElementos';
import { EstruturaTopicos } from './EstruturaTopicos';
import { EstruturaConfig } from '../ConfigTopico/EstruturaConfig';
import { ConteudoEventos } from './ConteudoEventos';
import ModalConfig from '../Topicos/Modal/ModalConfig';
import ListaIcones from './ListaIcones';
import EstruturaEventos from '../Eventos/EstruturaEventos';

/* Contexto */ 
import { useList } from '../../contexts/useTopicos';
import { useConfig } from '../../contexts/useConfig';
import { useCache } from '../../contexts/useCache';
import { useEvent } from '../../contexts/useEvent';

/* Funções */
import { useStyles } from '../../Importacoes/Funcoes/Funcoes';
import { ToggleBotao } from './ToggleBotao';

/* Variaveis */
import { 
  cardLista, cardConfig, tabelaLista, tabelaConfig,
  imagemLista, imagemConfig, emailLista, emailConfig,
} from '../../Importacoes/Variaveis/Variaveis';

/* nookies */
import { setCookie, parseCookies } from 'nookies';
import nookies from 'nookies';

export default function ConteudoPrincipal(props:any) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  const [statusConfig, setStatusConfig] = useState(true);

  const { configPagina, setConfigPagina  } = useCache();
  const { setInitialNodes, setInitialEdges,
          setNomeTooltip,  setQueryEvento,
          initialNodes, initialEdges,
          nomeTooltip, queryEvento,
          quantidadeEventos, setQuantidadeEventos,
        } = useEvent();

  const { configuracoes, setConfiguracoes, 
          statusEdicao, setStatusEdicao
        } = useConfig();

  const { toggleLateral, 
          list, setList, 
          tamanho, setTamanho 
        } = useList();
  
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
    if(props.pagina === 'Template') {
      switch (props.tipo) {
        case 'card':
          setList(cardLista);
          setConfiguracoes(cardConfig);
        break;
        case 'tabela':
          setList(tabelaLista);
          setConfiguracoes(tabelaConfig);
        break;
        case 'imagem':
          setList(imagemLista);
          setConfiguracoes(imagemConfig);
        break;
        case 'email':
          setList(emailLista);
          setConfiguracoes(emailConfig);
        break;
      }
      setOpen(false);
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
          {(props.pagina !== 'Template') &&
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          }
          <Typography variant="h6" noWrap>
            {props.pagina === "primeiraPagina" && configPagina[0].nomePagina}
            {props.pagina === "segundaPagina" && configPagina[1].nomePagina}
            {props.pagina === "terceiraPagina" && configPagina[2].nomePagina}
            {props.pagina === "Template Card" && "Template Card"}
            {props.pagina === "Template" && "Template"}
          </Typography>

          <div className="profile-area">
             <ListItem 
                onClick={() => salvarConfiguracoes('/')} 
                button 
                component="a"
              >
               Página principal
              </ListItem>
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
            <ListItem onClick={() => salvarConfiguracoes('/primeirapagina')} button component="a">
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
          
          <Tooltip 
            title={statusConfig ? 'Esconder Área de Configurações' : 'Mostrar Área de Configurações'} 
            style={{fontSize: '5rem'}}
            placement="right-start"
          >
            <ListItem  onClick={() => setStatusConfig(!statusConfig)}  button component="a">
                <ListItemIcon>
                    {statusConfig ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </ListItemIcon>
                <ListItemText primary="" />
            </ListItem>
          </Tooltip>          

          <Tooltip
            title={statusEdicao ? 'Desatvar Seleção Editar' : 'Ativar Seleção Editar' }
            style={{fontSize: '5rem'}} 
            placement="right-start"
          >
            <ListItem  onClick={() => setStatusEdicao(!statusEdicao)}  button component="a">
                <ListItemIcon>
                    {statusEdicao ? <LeakAddIcon /> : <LeakRemoveIcon />}
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
          {toggleLateral.eventos  && <ConteudoEventos nomePagina={props.pagina}    />} 
      </main>
      
      {statusConfig &&
      <div className="makeStyles-appBar-3"> 
        <div className="config">
          <ToggleBotao nomePagina={props.pagina}/>
          { toggleLateral.principal && <EstruturaTopicos nomePagina={props.pagina}   />}
          { toggleLateral.configs   && <EstruturaConfig /> }
          { toggleLateral.eventos   && <EstruturaEventos nomePagina={props.pagina}   />}
        </div>
      </div>
      }
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