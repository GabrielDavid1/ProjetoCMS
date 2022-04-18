/*****************************  Hooks do React  **********************************/
import { useCallback } from 'react';

/*****************************  Importação de Contexto  **********************************/
import { useList } from '../../contexts/useTopicos';

/*****************************  Importação de Componentes  ******************************/
import { PainelDeBotoes } from '../Topicos/PainelDeBotoes/PainelDeBotoes';
import { ListaDinamica } from '../Topicos/ListaDinamica';
import { ModalRenomear } from '../Topicos/Modal/ModalRenomear';
import { ModalDeletar } from '../Topicos/Modal/ModalDeletar';
import { BotoesInferiores } from '../Topicos/BotoesInferiores/BotoesInferiores';

export function EstruturaTopicos () {
  const {          
          nomeSelecionado, 
          list, copiaGrupo,
          selected, expanded
        } = useList();

/*****************************  Sub-Componentes *************************************/
  const Arvore = useCallback(() => {
    return (
      <ListaDinamica />
    )
  } , [list, expanded, copiaGrupo, nomeSelecionado, selected]); 

/*****************************  Estrutura lateral  **********************************/
  const TopicosConfig = () => {
      return (
        <>
        <div className="topics">
            <div className="control">
               <PainelDeBotoes />
            </div>
            <div className="opcoes">           
               <BotoesInferiores />
            </div>
        </div>
        <div className="todo">
            <Arvore /> 
        </div>
        </>
      )
  }
/*****************************  Estrutura de Componentes  **********************************/
  return (
      <> 
        <ModalDeletar />
        <ModalRenomear />
        <TopicosConfig /> 
      </>
  );

}






