import { memo } from 'react';

/* Contexto */ 
import { useConfig } from '../../contexts/useConfig';
import { useList } from '../../contexts/useTopicos';

/*  Componentes */
import { Retangulo } from '../Topicos/ElementoEmTela/Retangulo/Retangulo';

/* Tipagens */
import { Config } from '../../Importacoes/Tipagens/Tipagem';

export default function Teste() { 
  const { setToggleLateral } = useList();
  const { setIdTotal, configuracoes } = useConfig(); 

  const ElementoTopico = ( id:string, type: string, config = {} as Config) => {
    switch (type) {
      case 'Retangulo':
        return(<> 
             <Retangulo id={id} config={config} />
        </>)
      case 'Text':
        return (<> texto kkkk </>)     
      default:
        return null; 
    }
  } 

  const trocarLateral = (parametro: number) => {
    if (parametro === 2) {
        setIdTotal('0');
        setToggleLateral(false);
    }
  }

  return (
    <div className="container" onClick={(e) => trocarLateral(e.detail)}>
        {configuracoes.map((listaItem, index) => (
          <div key={index}>
            { 
              ElementoTopico(listaItem.id, listaItem.type, listaItem.config)
            }
          </div>
        ))}
    </div>
  )          
}

export const Conteudo = memo(Teste);
