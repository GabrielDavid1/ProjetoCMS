/* Next */
import Head from 'next/head';
import { AppProps } from 'next/app';

/* Provider framework */
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';

/* Providers de Contexto */
import { ListProvider } from '../contexts/useTopicos';
import { ModalProvider } from '../contexts/useModal';
import { ConfigProvider } from '../contexts/useConfig';
import { CacheProvider } from '../contexts/useCache';

/* Estilos */
import '../styles/globals.scss';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Projeto CMS</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        ></meta>
      </Head>
      <CacheProvider>
        <ConfigProvider>
          <ListProvider>
          <ModalProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </ModalProvider>
          </ListProvider>
        </ConfigProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
