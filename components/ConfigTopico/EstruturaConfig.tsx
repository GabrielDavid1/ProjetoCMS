/* React */
import { memo } from 'react';

/* Componente */
import { Retangulo } from "./Retangulo/Retangulo";
import { Text } from "./Text/Text";
import { Input } from "./Input/Input";
import { Tabela } from "./Tabela/Tabela";
import { Botao } from "./Botao/Botao";
import { Grafico } from "./Grafico/Grafico";
import { TextArea } from "./TextArea/TextArea";
import { Imagem } from "./Imagem/Imagem";

/* Contexto */ 
import { useConfig } from '../../contexts/useConfig';
import { useCache } from '../../contexts/useCache';

function BaseEstrutura () {
   const { idTotal, buscarConfigs } = useConfig();

   let elementoGuardado:any = buscarConfigs(idTotal);  

   const plataformaRenderizacao = (tipo: string) => {
      if (elementoGuardado) {
        switch (tipo) {
          case 'Retangulo': return <Retangulo />;
          case 'Text': return  <Text />; 
          case 'Input': return <Input />; 
          case 'Tabela': return <Tabela />; 
          case 'Botao': return <Botao />; 
          case 'Grafico': return <Grafico />;
          case 'TextArea': return <TextArea />; 
          case 'Imagem': return <Imagem />;
          default: 
          return (
            <div className="mensagemVazia"> 
                <h1> Selecione algum elemento em tela... </h1> 
            </div>
          )
        }
      }
   }

   return (
        <div className="conteudo">
            {elementoGuardado !== undefined && plataformaRenderizacao(elementoGuardado.tipo)}
        </div>
    )
}

export const EstruturaConfig = memo(BaseEstrutura);