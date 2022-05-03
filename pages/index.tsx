/* Contextos */
import { useList } from '../contexts/useTopicos';
import { useConfig } from '../contexts/useConfig';
import { useCache } from '../contexts/useCache';

/* Nookies */
import { setCookie } from 'nookies';

/* React */
import { useEffect } from 'react';

/* Componente */
import TemplatePrincipal from '../components/TemplatePrincipal';

export default function Home() {
  const { list, tamanho } = useList();
  const { configuracoes } = useConfig();
  const { configPagina } = useCache();

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
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
    });
  }, [list, configuracoes, configPagina]);

  return <TemplatePrincipal pagina="primeiraPagina" />
}