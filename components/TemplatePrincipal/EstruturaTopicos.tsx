/* React */
import { useCallback } from 'react';

/* Contexto */
import { useList } from '../../contexts/useTopicos';

/*****************************  Importação de Componentes  ******************************/
import { PainelDeBotoes } from '../Topicos/PainelDeBotoes/PainelDeBotoes';
import { ListaDinamica } from '../Topicos/ListaDinamica';
import { ModalRenomear } from '../Topicos/Modal/ModalRenomear';
import { ModalDeletar } from '../Topicos/Modal/ModalDeletar';
import { BotoesInferiores } from '../Topicos/BotoesInferiores/BotoesInferiores';

type Props = {
  nomePagina: string;
}

export function EstruturaTopicos ({ nomePagina }:Props) {
  const {          
          nomeSelecionado, 
          list, copiaGrupo,
          selected, expanded
        } = useList();

  const Arvore = useCallback(() => {
    return (
      <ListaDinamica nomePagina={nomePagina} />
    )
  } , [list, expanded, copiaGrupo, nomeSelecionado, selected]); 

  const TopicosConfig = () => {
      return (
        <>
        <div className="topics">
            <div className="control">
               <PainelDeBotoes nomePagina={nomePagina} />
            </div>
            <div className="opcoes">           
               <BotoesInferiores nomePagina={nomePagina} />
            </div>
        </div>
        <div className="todo">
            <Arvore /> 
        </div>
        </>
      )
  }

  return (
      <> 
        <ModalDeletar />
        <ModalRenomear />
        <TopicosConfig /> 
      </>
  );

}






