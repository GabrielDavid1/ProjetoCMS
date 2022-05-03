/* Contextos */
import { useList  } from '../../../contexts/useTopicos';
import { useCache  } from '../../../contexts/useCache';

/* Componente material-ui */
import Button from '@mui/material/Button';

type Props = {
    nomePagina: string;
}
  
export function BotoesInferiores ({ nomePagina }:Props) {
    const {list, setList, 
           tamanho, setTamanho,
           deletarTudo, onToggleMarcarTudo
          } = useList();

    const addGrupo = ( ) => {
        let id = String(tamanho+1);
        list[0].children.push({
            id: id,
            name: 'Novo Grupo',
            tipoCache: nomePagina,
            children: [{
                id: String(tamanho+2),
                tipoCache: nomePagina,
                name: '',
                children: [],
            }],
        });
        setList({...list});
        setTamanho(tamanho+2);
    }
    
    const plataformaBotoes = (id: number) => {
        if(id === 1) addGrupo();  
        if(id === 2) deletarTudo(nomePagina); 

    }

    return (
        <> 
          <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => plataformaBotoes(1)}>  Grupo        </Button>
          <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => onToggleMarcarTudo()}> Marcar Tudo  </Button> 
          <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => plataformaBotoes(2)}>  Deletar Tudo </Button> 
        </>
    )
}