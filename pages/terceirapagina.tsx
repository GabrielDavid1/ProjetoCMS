/* Contextos */
import { useList } from '../contexts/useTopicos';
import { useConfig } from '../contexts/useConfig';
import { useCache } from '../contexts/useCache';
import { useEvent } from '../contexts/useEvent';

/* Nookies */
import { setCookie } from 'nookies';

/* React */
import { useEffect } from 'react';

/* Componente */
import TemplatePrincipal from '../components/TemplatePrincipal/ConteudoPrincipal';

export default function terceirapagina() {
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const { list, ativarToggleLateral, tamanho, nomesAgrupados } = useList();
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const { configuracoes } = useConfig();
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const { configPagina } = useCache();
  const { initialNodes, 
          initialEdges,
          nomeTooltip,
          queryEvento,
          quantidadeEventos,
           // eslint-disable-next-line react-hooks/rules-of-hooks
        } = useEvent();
 // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      ativarToggleLateral('principal');
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
      setCookie(null, 'INITIAL_NODES', JSON.stringify(initialNodes), 
      { maxAge: 86400 * 7,
        path: '/', 
      });
      setCookie(null, 'INITIAL_EDGES', JSON.stringify(initialEdges), 
      { maxAge: 86400 * 7,
        path: '/', 
      });
      setCookie(null, 'NOMES_AGRUPADOS', JSON.stringify(nomesAgrupados), 
      { maxAge: 86400 * 7,
        path: '/', 
      });
      setCookie(null, 'NOME_TOOLTIP', JSON.stringify(nomeTooltip), 
      { maxAge: 86400 * 7,
        path: '/', 
      });
      setCookie(null, 'QUERY_EVENTO', JSON.stringify(queryEvento), 
      { maxAge: 86400 * 7,
        path: '/', 
      });
      setCookie(null, 'QUANTIDADE_EVENTOS', JSON.stringify(quantidadeEventos), 
      { maxAge: 86400 * 7,
        path: '/', 
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, configuracoes, configPagina, initialNodes, initialEdges, nomeTooltip, queryEvento, quantidadeEventos]);

  return <TemplatePrincipal pagina="terceiraPagina"  tipo="Normal" />
}