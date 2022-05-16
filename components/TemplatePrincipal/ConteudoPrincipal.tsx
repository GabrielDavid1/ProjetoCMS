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
  const { toggleLateral, setList, ativarToggleLateral } = useList();
  const { setConfiguracoes, statusEdicao, setStatusEdicao } = useConfig();

  useEffect(() => {
    if (nookies.get().CONFIGPAGINA !== undefined) {
        setConfigPagina(JSON.parse(nookies.get().CONFIGPAGINA));
    } else {
        setCookie(null, 'CONFIGPAGINA', JSON.stringify([
          { identificador: '1', nomePagina: 'Primeira Página', iconeId: '1' },
          { identificador: '2', nomePagina: 'Segunda Página',  iconeId: '2' },
          { identificador: '3', nomePagina: 'Terceira Página', iconeId: '2'},
        ]), 
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
    setCookie(null, 'CONFIGPAGINA', JSON.stringify(configPagina), 
    { maxAge: 86400 * 7,
      path: '/', 
    });
    ativarToggleLateral('principal');
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
      CONFIGPAGINA:cookies.CONFIGPAGINA,
    },
  }
}