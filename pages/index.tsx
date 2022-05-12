/* Componentes Framework Material-UI */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Router from 'next/router';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

/* Componente*/
import ModalInicial from '../components/Topicos/Modal/ModalInicial';

/* Componentes React e Next*/
import { useEffect, useState } from 'react';

/* Funções e Variaveis */
import { useStyles } from '../Importacoes/Funcoes/Funcoes';

/* nookies */
import { setCookie, parseCookies } from 'nookies';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';

/* Estilização de templates */
export const Item1 = styled(Paper)(({ theme }) => ({
  background: "url('/imagens/add.png') no-repeat center center",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 140,
  width: 100,
  cursor: 'pointer',
  textAlign: 'center',
  border: '1px solid gray',
  color: theme.palette.text.secondary,
  '&:hover': {
    border: '1px solid #3f51b5'
  },
}));

export const Item2 = styled(Paper)(({ theme }) => ({
  background: "url('/imagens/card.png') no-repeat center center",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 140,
  width: 100,
  cursor: 'pointer',
  textAlign: 'center',
  border: '1px solid gray',
  color: theme.palette.text.secondary,
  '&:hover': {
    border: '1px solid #3f51b5'
  },
}));

export const Item3 = styled(Paper)(({ theme }) => ({
  background: "url('/imagens/tabela.png') no-repeat center center",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 140,
  width: 100,
  cursor: 'pointer',
  textAlign: 'center',
  border: '1px solid gray',
  color: theme.palette.text.secondary,
    '&:hover': {
    border: '1px solid #3f51b5'
  },
}));

export const Item4 = styled(Paper)(({ theme }) => ({
  background: "url('/imagens/email.png') no-repeat center center",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 140,
  width: 100,
  cursor: 'pointer',
  textAlign: 'center',
  border: '1px solid gray',
  color: theme.palette.text.secondary,
  '&:hover': {
    border: '1px solid #3f51b5'
  },
}));

export const Item5 = styled(Paper)(({ theme }) => ({
  background: "url('/imagens/imagem.png') no-repeat center center",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 140,
  width: 100,
  cursor: 'pointer',
  textAlign: 'center',
  border: '1px solid gray',
  color: theme.palette.text.secondary,
  '&:hover': {
    border: '1px solid #3f51b5'
  },
}));

export default function Principal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (nookies.get().PRIMEIRA_VEZ === null || nookies.get().PRIMEIRA_VEZ !== 'true') {
        setOpen(true);
        setCookie(null, 'PRIMEIRA_VEZ', JSON.stringify(true), 
        { maxAge: 86400 * 7,
          path: '/', 
        });  
    } 
  }, []);
  
  return (
    
    <div 
      id="paginaInicial"
      className={classes.root}
    >
      <ModalInicial open={open} setOpen={setOpen} />
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
                   spacing={2}
                   sx={{ height: '12rem' }}
                >
                <Grid item>
                    <Item1 onClick={() => Router.push('/primeirapagina')}>
                      Meu Projeto
                    </Item1>
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
              <h1> Documentação do Projeto e Contato </h1>
          </div>
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context)
  return {
    props: {
      msg: '[SERVER]: Concluido',
      PRIMEIRA_VEZ:cookies.PRIMEIRA_VEZ || null,
    },
  }
}