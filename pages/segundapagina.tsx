/* Contextos */
import { useList } from '../contexts/useTopicos';
import { useCache } from '../contexts/useCache';

/* Nookies */
import { setCookie } from 'nookies';

/* React */
import { useEffect } from 'react';

/* Componente */
import TemplatePrincipal from '../components/TemplatePrincipal/ConteudoPrincipal';

export default function primeirapagina() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ativarToggleLateral } = useList();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { configPagina } = useCache();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      ativarToggleLateral('principal');
      setCookie(null, 'CONFIGPAGINA', JSON.stringify(configPagina), 
      { maxAge: 86400 * 7,
        path: '/', 
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configPagina]);

  return <TemplatePrincipal pagina="segundaPagina" tipo="normal" />
}