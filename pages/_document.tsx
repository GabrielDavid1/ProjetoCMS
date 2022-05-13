import React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import theme from '../lib/theme';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // Ordem de resolução
    //
    // No lado servidor:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // No salo servidor com erro:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // No lado cliente
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Renderiza app + pagina e pega o cotexto da pagina com as alterações feitas pelo componente
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* PWA cor primária */}
          <meta name="theme-color" content={theme.palette.primary.main} />

          <link rel="icon" href="/favicon.png" sizes="any"></link> 
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
