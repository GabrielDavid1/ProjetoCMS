/* Componentes Framework Material-UI */
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Router from 'next/router';

/* Componente clsx*/
import clsx from 'clsx';

/* Componentes React e Next*/
import { useState } from 'react';

/* Funções e Variaveis */
import { useStyles } from '../Importacoes/Funcoes/Funcoes';
import { Item1, Item2, Item3, Item4, Item5 } from '../Importacoes/Variaveis/Variaveis';

export default function Principal() {
  const classes = useStyles();

  const [spacing, setSpacing] = useState(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };
    
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div 
      id="paginaInicial"
      className={classes.root}
    >
      <AppBar
        position="fixed"
  
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
            Pagina Inicial
          </Typography>
        </Toolbar>
      </AppBar>
    
      <div className="AreaIniciar"> 
          <div className="blocoTitulo">
              <p> Iniciar um novo projeto </p>
          </div>
          <Grid sx={{ flexGrow: 1, height: '13rem' }} container spacing={2}>
            <Grid item xs={12}>
                <Grid 
                   container
                   justifyContent="center" 
                   spacing={spacing}
                   sx={{ height: '13rem' }}
                >
                <Grid item>
                    <Item1 onClick={() => Router.push('/primeirapagina')} >Novo</Item1>
                </Grid>
                <Grid item>
                    <Item2></Item2>
                </Grid>
                <Grid item>
                    <Item3></Item3>
                </Grid>
                <Grid item>
                    <Item4></Item4>
                </Grid>
                <Grid item>
                    <Item5></Item5>
                </Grid>
                </Grid>
            </Grid>
          </Grid>
      </div>
      <div className="AreaProjeto"> 
          <h1> Pagina Inicial KKKKKKK</h1>
      </div>    
    </div>
  );
}