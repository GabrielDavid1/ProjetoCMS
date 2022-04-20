/* Contexto */
import { useList  } from '../../../contexts/useTopicos';

/* Componente material-ui */
import Button from '@mui/material/Button';

export function BotoesInferiores () {
    const { 
           list, setList, tamanho, setTamanho,
           deletarTudo, onToggleMarcarTudo,
          } = useList();

    const addGrupo = ( ) => {
        let id = String(tamanho+1);
        list[0].children.push({
            id: id,
            name: 'Novo Grupo',
            children: [{
            id: String(tamanho+2),
            name: '',
            children: [],
          }],
        });
        setList({...list});
        setTamanho(tamanho+2);
    }
    
    const plataformaBotoes = (id: number) => {
        if(id === 1) addGrupo();  
        if(id === 2) deletarTudo(); 
    }

    return (
        <> 
          <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => plataformaBotoes(1)}>  Grupo        </Button>
          <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => onToggleMarcarTudo()}> Marcar Tudo  </Button> 
          <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2'}} onClick={() => plataformaBotoes(2)}>  Deletar Tudo </Button> 
        </>
    )
}