/* React */
import { memo } from 'react';

/* Contexto */ 
import { useConfig } from '../../contexts/useConfig';

/*  Elementos em tela */
import { Retangulo } from '../Topicos/ElementoEmTela/Retangulo/Retangulo';
import { Text } from '../Topicos/ElementoEmTela/Text/Text';
import { Input } from '../Topicos/ElementoEmTela/Input/Input';
import { Tabela } from '../Topicos/ElementoEmTela/Tabela/Tabela';
import { Botao } from '../Topicos/ElementoEmTela/Botao/Botao';
import { Grafico } from '../Topicos/ElementoEmTela/Grafico/Grafico';
import { TextArea } from '../Topicos/ElementoEmTela/TextArea/TextArea';
import { Imagem } from '../Topicos/ElementoEmTela/Imagem/Imagem';

export default function Meio() { 
  const { setIdTotal, configuracoes } = useConfig(); 

  return (
    <div className="container">
        {configuracoes.map((listaItem, index) => (
          (listaItem !== undefined) &&
            (
              <div key={listaItem.id} onClick={() => setIdTotal(listaItem.id)}> 
                  {(listaItem.type === "Retangulo") && 
                      <Retangulo id={listaItem.id} config={listaItem.config} /> 
                  }
                  {(listaItem.type === "Text") &&
                      <Text id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Input") && 
                      <Input id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Tabela") && 
                      <Tabela id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Botao") && 
                      <Botao id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Grafico") && 
                      <Grafico id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "TextArea") && 
                      <TextArea id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Imagem") && 
                      <Imagem id={listaItem.id} config={listaItem.config} /> 
                  } 
              </div>
            ) 
          ))
        }
    </div>
  )       
}

export const Conteudo = memo(Meio);
