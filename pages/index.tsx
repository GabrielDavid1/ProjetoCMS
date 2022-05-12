/* Componentes Framework Material-UI */
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Router from 'next/router';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

/* Componente clsx*/
import clsx from 'clsx';

/* Componentes React e Next*/
import { useState } from 'react';

/* Funções e Variaveis */
import { useStyles } from '../Importacoes/Funcoes/Funcoes';
import { Item1, Item2, Item3, Item4, Item5 } from '../Importacoes/Variaveis/Variaveis';

import  ImagensProjeto from '../components/TemplatePrincipal/ImagensProjeto/index';

export default function Principal() {
  const classes = useStyles();

  const [spacing, setSpacing] = useState(2);

  return (
    <div 
      id="paginaInicial"
      className={classes.root}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Projeto CMS | Gabriel David da Silva
          </Typography>
        </Toolbar>
      </AppBar>
    
      <div className="AreaIniciar"> 
          <div className="blocoTitulo">
              <p> Exemplos de uso em projeto </p>
          </div>
          <Grid sx={{ flexGrow: 1, height: '13rem' }} container spacing={2}>
            <Grid item xs={12}>
                <Grid 
                   container
                   justifyContent="center" 
                   spacing={spacing}
                   sx={{ height: '12rem' }}
                >
                <Grid item>
                    <Item1 onClick={() => Router.push('/primeirapagina')}></Item1>
                </Grid>
                <Grid item onClick={() => Router.push('/template_card')}>
                    <Item2></Item2>
                </Grid>
                <Grid item onClick={() => Router.push('/template_tabela')}>
                    <Item3></Item3>
                </Grid>
                <Grid item onClick={() => Router.push('/template_email')}>
                    <Item4></Item4>
                </Grid>
                <Grid item onClick={() => Router.push('/template_imagem')}>
                    <Item5></Item5>
                </Grid>
                </Grid>
            </Grid>
          </Grid>
      </div>
      <div className="AreaProjeto"> 
          <div className="blocoTitulo">
              <h1> Documentação do Projeto </h1>
          </div>
          <ImagensProjeto />
      </div>    
      <footer className="AreaRodape">
          <div className="iconesRodape">
            <GitHubIcon onClick={() => Router.push('https://github.com/GabrielDavid1/ProjetoCMS')} />
            <LinkedInIcon onClick={() => Router.push('https://www.linkedin.com/in/gabrieldavidsilva/')} />
            <WhatsAppIcon onClick={() => Router.push('https://wa.me/5548984791459')} />
          </div>
      </footer>
    </div>
  );
}