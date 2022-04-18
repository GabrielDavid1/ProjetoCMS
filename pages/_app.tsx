import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../lib/theme';
import '../styles/globals.css';

import { ListProvider } from '../contexts/useTopicos';
import { ModalProvider } from '../contexts/useModal';
import { ConfigProvider } from '../contexts/useConfig';

import '../components/layout/Styles.scss';

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
    </>
  );
}

export default MyApp;
