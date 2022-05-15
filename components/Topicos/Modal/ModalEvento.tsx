/* React */
import React, { useEffect, useState } from 'react';

/* Componente Framework Material-UI */
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

/* Variaveis e Tipagens */
import { steps } from '../../../Importacoes/Variaveis/Variaveis';
import { DadoEvtProps } from '../../../Importacoes/Tipagens/Tipagem';

/* SUB-Componentes */
import Eventos  from './subComponentesModal/Evento';
import Condicao from './subComponentesModal/Condicao';
import Parametros from './subComponentesModal/Parametros';
import ElementoId from './subComponentesModal/ElementoId';
import Acoes from './subComponentesModal/Acoes';

/* Contextos */
import { useList } from '../../../contexts/useTopicos';
import { useEvent } from '../../../contexts/useEvent';

/* React Flow */
import { Edge } from 'react-flow-renderer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type propriedade = {
  nomePagina: string;
  statusModal: boolean;
  setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  dadoEvento?: DadoEvtProps;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
  nomeTooltip: string[];
  statusQuery: boolean;
  setNomeTooltip: (data: string[]) => void;
}

type ObjPadrao = {
  idElemento:string;
  idBotao: string | undefined;
  nome: string;
}

interface PropsParam {
    param1: {
        id: string;
        tipo: string;
    };
    param2: {
        id: string;
        tipo: string;
    };
    param3: {
      id: string;
      tipo: string;
      acao: string;
    };
}

export default function ModalEvento({
  nomePagina,
  statusModal,
  setStatusModal,
  dadoEvento,
  edges,
  setEdges,
  nomeTooltip,
  setNomeTooltip,
  statusQuery,
}: propriedade) {
  const { nomesAgrupados } = useList();
  const { deletarQuery,
          queryEvento, setQueryEvento,
          initialEdges, setInitialEdges } = useEvent();  

  const [condicaoParam, setCondicaoParam] = useState('');
  const [eventoParam, setEventoParam] = useState('Vazio');
  const [dadosAlvo, setDadosAlvo] = useState({id:'', nome:''});
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const [DadosEstaticos, setDadosEstaticos] = useState<ObjPadrao[]>([{idElemento: '', 
                                                                      idBotao: '', 
                                                                      nome: 'Vazio'}]);
  const [paramQuery, setParamQuery] = useState<PropsParam>({
    param1: {id: '', tipo:'height'},
    param2: {id: '', tipo:'height'},
    param3: {id: '', tipo:'height', acao: ''},
  });

  const handleClose = (status = false as boolean) => {
    let index = 0;
    let retorno = queryEvento.find(elemento => (elemento.acao.id === dadoEvento?.idOutro && elemento.idBotao === dadoEvento?.idBotao))
    
    if(statusQuery) {
        index = queryEvento.findIndex(elemento => (elemento.acao.id === dadoEvento?.idOutro && elemento.idBotao === dadoEvento?.idBotao));
    }
    
    if (status === false && statusQuery === false) {
        setEdges(edges.filter(elemento => elemento.target !== dadoEvento?.idOutro));
        setInitialEdges(initialEdges.filter(elemento => elemento.target !== dadoEvento?.idOutro));
        nomeTooltip.pop();
        setNomeTooltip([...nomeTooltip]);
        deletarQuery(dadoEvento?.idBotao, false);
    } else if(retorno?.ativado === true && status === true && statusQuery === true && index !== -1) {
        queryEvento.splice(index, 1);
        setQueryEvento([...queryEvento]);
    }
    setActiveStep((prevActiveStep) => prevActiveStep = 0);
    setActiveStep(0);
    setDadosEstaticos([]);
    setStatusModal(false);
  };

  const isStepOptional = (step: number) => {
    return step === 5;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if(activeStep === 4) {
      handleClose(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }

    if(activeStep === 4) {
        let id_1 = (paramQuery.param1.id !== undefined) 
                      ? paramQuery.param1.id 
                      : DadosEstaticos[0].idElemento;

        let id_2 = (paramQuery.param2.id !== undefined) 
                      ? paramQuery.param2.id 
                      : DadosEstaticos[1].idElemento;

        let id_3 = (dadoEvento !== undefined) ? dadoEvento?.idOutro : '0.73';

        /* Adiciona no Contexto (global)*/
        queryEvento.push({
          idBotao: edges.slice(-1)[0].source,
          nomeAlvo: dadoEvento?.nomeAlvo,
          evento: eventoParam,
          condicao: {
              par1: id_1 +' - '+paramQuery.param1.tipo,
              par2: condicaoParam,
              par3: id_2 +' - '+paramQuery.param2.tipo,
          },
          acao: {
              id: id_3,
              tipo: paramQuery.param3.tipo,
              alterado: paramQuery.param3.acao,
          },
          ativado: true,
        });
        setQueryEvento([...queryEvento]);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
        throw new Error("Você não pode pular esta parte pois não é opicional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
    });
  };

  function addDadosEstaticos (id: string) {
    let buscaElemento:any = nomesAgrupados.find(elemento => elemento.id === id);
    DadosEstaticos.push({
       idElemento: id,
       idBotao: dadoEvento?.idBotao,
       nome: buscaElemento.nome,
    });
    setDadosEstaticos([...DadosEstaticos]);
  }

  useEffect(() => {
    setDadosEstaticos([{ idElemento: '', idBotao: '', nome: 'Vazio' }]);
    if(statusModal) { 
      let id   = (dadoEvento?.idOutro !== undefined) ? dadoEvento.idOutro : '0.73';
      let nome = dadoEvento?.nomeAlvo;

      let buscaElemento:any = nomesAgrupados.find(elemento => elemento.id === id); 

      setDadosAlvo({id: id, nome: (nome !== undefined) ? nome : buscaElemento.nome});
  
      dadoEvento?.relacionados.forEach((dado) => {
         addDadosEstaticos(dado)       
      });
    }
  },[statusModal]);

  function removerElementoAcessoRapido () {
    let retorno = queryEvento.find(elemento => (elemento.acao.id === dadoEvento?.idOutro && elemento.idBotao === dadoEvento?.idBotao));
    if (dadoEvento?.idTooltip !== undefined && retorno?.ativado === true) {

        let indexTooltip = nomeTooltip.findIndex(elemento => elemento === dadosAlvo.nome );
        nomeTooltip.splice(indexTooltip, 1);
        setNomeTooltip([...nomeTooltip]);
      
        let indexEdge = edges.findIndex(elemento => elemento.target === retorno?.acao.id && elemento.source === retorno?.idBotao)
        edges.splice(indexEdge,1);
        setEdges([...edges]);     
        setInitialEdges(edges);
        
        let index = queryEvento.findIndex(elemento => ( elemento.acao.id === retorno?.acao.id && elemento.idBotao === retorno?.idBotao )); 
        queryEvento.splice(index, 1);
        setQueryEvento([...queryEvento]);
     
        setStatusModal(false); 
    } else {
        handleClose();
    }
  }
  
  const EtapasRenderizadas = () => {
    switch (activeStep) {
      case 0: return (
          <Eventos
             id={dadoEvento?.idBotao} 
             setEventoParam={setEventoParam}
          />
      );
      case 1: return (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>            
            <ElementoId 
               parametro='Elemento 1' 
               dadoEvento={DadosEstaticos}
               paramQuery={paramQuery}
               setParamQuery={setParamQuery}
            /> 
            <Parametros 
               parametro='Param 1' 
               paramQuery={paramQuery}
               setParamQuery={setParamQuery}
            /> 
          </Box>
      );
      case 2: return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>            
            <Condicao 
               parametro='CONDIÇÃO' 
               setCondicaoParam={setCondicaoParam}
            /> 
        </Box>
      )
      case 3: return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>            
            <ElementoId 
              parametro='Elemento 2' 
              dadoEvento={DadosEstaticos}
              paramQuery={paramQuery}
              setParamQuery={setParamQuery}
            /> 
            <Parametros 
              parametro='Param 2' 
              paramQuery={paramQuery}
              setParamQuery={setParamQuery}
            /> 
        </Box>
      );
      case 4: return ( 
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}> 
            <ElementoId 
              parametro='Elemento 3' 
              dadoEvento={DadosEstaticos}
              paramQuery={paramQuery}
              setParamQuery={setParamQuery}
              dadosAlvo={dadosAlvo}
            /> 
            <Parametros 
              parametro='Param 3' 
              paramQuery={paramQuery}
              setParamQuery={setParamQuery}
            />            
            <Acoes 
              parametro='Ações' 
              paramQuery={paramQuery}
              setParamQuery={setParamQuery}
            />            
        </Box>
      )
    }
  };

  return (
      <Modal
        id="modal-evento"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={statusModal}
        onClose={() => handleClose(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
           timeout: 500,
        }}
        sx={{ width: '800px'  }}
      >
        <Fade in={statusModal}>
         <Box sx={style}>
          <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption"></Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
          })}
          </Stepper>
          {activeStep !== steps.length && (
            <React.Fragment>
              <Container maxWidth="sm">
                <Box sx={{ display: 'grid', flexDirection: 'row', pt: 2 }}>
                    {EtapasRenderizadas()}
                </Box>
              </Container>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Voltar
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Pular
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
              </Box>
              <Button onClick={() => removerElementoAcessoRapido()}>
                Remover Evento
              </Button>
            </React.Fragment>
          )}
          </Box>
        </Fade>
      </Modal>
  );
}

/* 

        let id_1 = (paramQuery.param1.id !== undefined) 
        ? paramQuery.param1.id 
        : DadosEstaticos[0].idElemento;

        let id_2 = (paramQuery.param2.id !== undefined) 
                ? paramQuery.param2.id 
                : DadosEstaticos[0].idElemento;

        let id_3 = (paramQuery.param3.id !== undefined) 
                ? paramQuery.param3.id 
                : DadosEstaticos[0].idElemento;


        queryEvento.push({
          idBotao: edges.slice(-1)[0].source,
          nomeAlvo: dadoEvento?.nomeAlvo,
          evento: eventoParam,
          condicao: {
              par1: id_1 +' - '+paramQuery.param1.tipo,
              par2: condicaoParam,
              par3: id_2 +' - '+paramQuery.param2.tipo,
          },
          acao: {
              id: id_3,
              tipo: paramQuery.param3.tipo,
              alterado: paramQuery.param3.acao,
          },
          ativado: false,
       });
       setQueryEvento([...queryEvento]);
*/