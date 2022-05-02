/* Componentes Framework Material-UI */
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
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { useTheme } from '@material-ui/core/styles';

/* Componente clsx*/
import clsx from 'clsx';

/* Componentes React e Next*/
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';

/* Componentes */
import Conteudo from './Conteudo';
import { EstruturaTopicos } from './EstruturaTopicos';
import { EstruturaConfig } from '../ConfigTopico/EstruturaConfig';

/* Contexto */ 
import { useList } from '../../contexts/useTopicos';

/* Funções */
import { useStyles } from '../../Importacoes/Funcoes/Funcoes';
import { ToggleBotao } from './ToggleBotao';

import { Principal2 } from './Principal2';

export default function LayoutWithMenuComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openConfig, setOpenConfig] = useState(true);

  const { toggleLateral } = useList();

  // menu
  const menu: Array<{ name: string; to: string; icon?: ReactNode }> = [
    { name: 'Dashboard', to: '/', icon: <DashboardCustomizeIcon /> },

  ];

  const openConfigure = (status:boolean) => {
    setOpenConfig(status);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            Nome do Projeto
          </Typography>

          {/*Profile Área */}
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
          {menu.map((menuItem, index) => (
            <Link key={index} href={menuItem.to} passHref>
              <ListItem onClick={() => openConfigure(!openConfig)} button component="a">
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <main className={clsx(classes.content, {
          [classes.contentShift]: open,
      })}> 
        <div className={classes.drawerHeader} />
        <Conteudo />
      </main>
  
      <div className="makeStyles-appBar-3"> 
        <div className="config">
          <ToggleBotao />
          { toggleLateral.principal && <EstruturaTopicos /> }
          { toggleLateral.configs   && <EstruturaConfig />  }
          { toggleLateral.eventos   && <> </> }
        </div>
      </div>
    </div>
  );
}
