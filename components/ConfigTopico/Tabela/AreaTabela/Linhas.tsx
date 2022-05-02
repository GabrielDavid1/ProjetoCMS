/* React */
import React, {useState}  from 'react';
import { useForm } from "react-hook-form";

/* Contexto */
import { useConfig } from '../../../../contexts/useConfig';

/* Componente material-ui */
import Button from '@mui/material/Button';

type PropsConfig = {
    elemento: any;
}

export function Linhas ({ elemento }: PropsConfig) {
    const defaultValues = {
      location: ""
    };
    const {  reset, control } = useForm({ defaultValues });
    
    const { configuracoes, setConfiguracoes } = useConfig();
    const [opcoes, setOpcoes] = useState({
      name: '',
      carbs: '',
      fat: '',
      calories: '',
      protein: '',
    });

    function mudarPropriedades (event = {} as React.ChangeEvent<HTMLInputElement>, tipo: number) {
        event.preventDefault();
        if (tipo === 0) opcoes.name = event.target.value;
        if (tipo === 1) opcoes.carbs = event.target.value;
        if (tipo === 2) opcoes.fat = event.target.value;
        if (tipo === 3) opcoes.calories = event.target.value;
        if (tipo === 4) opcoes.protein = event.target.value;
        setOpcoes({...opcoes});
    }

    function removerLinha () {
        elemento.rows.pop();
        setConfiguracoes([...configuracoes]);
    }

    const handleSubmit = (Event: React.FormEvent<HTMLFormElement>) => {
        Event.preventDefault();
        elemento.rows.push(opcoes);
        setOpcoes({
          name: '',
          carbs: '',
          fat: '',
          calories: '',
          protein: '',
        });
        setConfiguracoes([...configuracoes]);
        reset();
    }

    return (
      <li>
        <p> Linhas: </p>
         <div className="blocoLinhas">
            <form onSubmit={handleSubmit}>
              <input placeholder="Escreva algo aqui" value={opcoes.name} onChange={(e) =>  mudarPropriedades(e, 0)}  />
              <input placeholder="Escreva algo aqui" value={opcoes.carbs} onChange={(e) =>  mudarPropriedades(e, 1)}  />
              <input placeholder="Escreva algo aqui" value={opcoes.fat} onChange={(e) =>  mudarPropriedades(e, 2)}  />
              <input placeholder="Escreva algo aqui" value={opcoes.calories} onChange={(e) =>  mudarPropriedades(e, 3)}  />
              <input placeholder="Escreva algo aqui" value={opcoes.protein} onChange={(e) =>  mudarPropriedades(e, 4)}  />
              <div className="botaoSolo">
               <Button 
                  type="submit" 
                  variant="contained" 
                  style={{ backgroundColor:'white', color:'#1976d2'}}
                >
                Adicionar
                </Button>
                <Button 
                  variant="contained" 
                  style={{ 
                          backgroundColor:'white',
                          color:'#1976d2',
                          marginLeft: '10px',
                        }}
                  onClick={() => removerLinha()}
                >
                Remover
                </Button>
              </div>
            </form>
         </div>
      </li>
    )
}