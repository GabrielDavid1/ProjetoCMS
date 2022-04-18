import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

/* Contexto */ 
import { useList } from '../../contexts/useTopicos';

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';

import { createTheme } from '@material-ui/core/styles'

import Avatar from '@mui/material/Avatar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import React from "react";
import { EstruturaTopicos } from './EstruturaTopicos';
import Conteudo from './Conteudo';
import  { EstruturaConfig } from '../ConfigTopico/EstruturaConfig';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

export default function LayoutWithMenuComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openConfig, setOpenConfig] = useState(true);

  const { toggleLateral } = useList();

  // menu
  const menu: Array<{ name: string; to: string; icon?: ReactNode }> = [
    { name: 'Dashboard', to: '/', icon: <DashboardIcon /> },
    { name: 'Contatos', to: '/customers', icon: <PeopleIcon /> },
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
            Application name
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
      })} > 
        <div className={classes.drawerHeader} />
        <Conteudo />
      </main>
  
      <div className="makeStyles-appBar-3"> 
        <div className="config">
          <div className="testando">
              c
          </div>
              {toggleLateral ? <EstruturaConfig /> : <EstruturaTopicos /> }
        </div>
      </div>
    </div>
  );
}
