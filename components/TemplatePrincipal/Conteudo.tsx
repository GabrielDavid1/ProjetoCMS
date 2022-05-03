/* React */
import { memo } from 'react';

/* Contextos */ 
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

type Props = {
  paginaAtual: string;
}

export default function Meio({ paginaAtual }:Props) { 
  const { setIdTotal, configuracoes } = useConfig(); 
  return (
    <div className="container">
        {configuracoes.map((listaItem, index) => (
          (listaItem !== undefined) &&
            (
              <div key={listaItem.id} onClick={() => setIdTotal(listaItem.id)}> 
                  {(listaItem.type === "Retangulo" && listaItem.tipoCache === paginaAtual) && 
                      <Retangulo id={listaItem.id} config={listaItem.config} /> 
                  }
                  {(listaItem.type === "Text" && listaItem.tipoCache === paginaAtual) &&
                      <Text id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Input" && listaItem.tipoCache === paginaAtual) && 
                      <Input id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Tabela" && listaItem.tipoCache === paginaAtual) && 
                      <Tabela id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Botao" && listaItem.tipoCache === paginaAtual) && 
                      <Botao id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Grafico" && listaItem.tipoCache === paginaAtual) && 
                      <Grafico id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "TextArea" && listaItem.tipoCache === paginaAtual) && 
                      <TextArea id={listaItem.id} config={listaItem.config} /> 
                  } 
                  {(listaItem.type === "Imagem" && listaItem.tipoCache === paginaAtual) && 
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
