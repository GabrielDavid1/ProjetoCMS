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
import { condicoes } from '../../../Importacoes/Variaveis/Variaveis';
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
  setNomeTooltip: React.Dispatch<React.SetStateAction<string[]>>;
  statusQuery: boolean;
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
  const { list, retornarNome } = useList();
  const { buscarQuery, deletarQuery,
          queryEvento, setQueryEvento,
          initialEdges, setInitialEdges } = useEvent();  

  const [DadosEstaticos, setDadosEstaticos] = useState<ObjPadrao[]>([{ 
                                                                      idElemento: '', 
                                                                      idBotao: '', 
                                                                      nome: 'Vazio'
                                                                    }]);

  const [paramQuery, setParamQuery] = useState<PropsParam>({
     param1: {id: '', tipo:'height'},
     param2: {id: '', tipo:'height'},
     param3: {id: '', tipo:'height', acao: ''},
  });

  const handleClose = (status = false as boolean) => {
    let retorno:any = buscarQuery(dadoEvento?.idBotao, statusQuery);

    if (retorno.ativado === false && status === false ) {
        setEdges(edges.filter(elemento => elemento.target !== dadoEvento?.idOutro));
        setInitialEdges(initialEdges.filter(elemento => elemento.target !== dadoEvento?.idOutro));
        nomeTooltip.pop();
        setNomeTooltip([...nomeTooltip]);
        deletarQuery(dadoEvento?.idBotao, false);
    } else if (status === true) {
        let id_1 = (paramQuery.param1.id !== undefined) 
                        ? paramQuery.param1.id 
                        : DadosEstaticos[0].idElemento;

        let id_2 = (paramQuery.param2.id !== undefined) 
                        ? paramQuery.param2.id 
                        : DadosEstaticos[0].idElemento;
        
        let id_3 = (paramQuery.param3.id !== undefined) 
                        ? paramQuery.param3.id 
                        : DadosEstaticos[0].idElemento;

        retorno.condicao.par1 = id_1 +' - '+paramQuery.param1.tipo;
        retorno.condicao.par3 = id_2 +' - '+paramQuery.param2.tipo;  
        retorno.acao.id = id_3;
        retorno.acao.tipo = paramQuery.param3.tipo;
        retorno.acao.alterado = paramQuery.param3.acao;
        retorno.ativado = true;
        setQueryEvento([...queryEvento]);  
        setParamQuery({
          param1: {id: paramQuery.param1.id, tipo:'height'},
          param2: {id: paramQuery.param2.id, tipo:'height'},
          param3: {id: paramQuery.param3.id, tipo:'height', acao: ''},
       });
    } 
    setActiveStep((prevActiveStep) => prevActiveStep = 0);
    setActiveStep(0);
    setDadosEstaticos([]);
    setStatusModal(false);
  };

  function addDadosEstaticos (id: string) {
    const regex = new RegExp(id, 'gi');
    DadosEstaticos.push({
       idElemento: id,
       idBotao: dadoEvento?.idBotao,
       nome: list[0].children.filter(param => regex.test(param.id))[0].name,
    });
    setDadosEstaticos([...DadosEstaticos]);
  }

  function carregarTooltips () {
    nomeTooltip = [];
    queryEvento.filter(elemento => elemento.idBotao !== '').map(function(item){
        (item.nomeAlvo !== undefined) && nomeTooltip.push(item.nomeAlvo)
    });
    setNomeTooltip([...nomeTooltip]);
  }

  useEffect(() => {
    setDadosEstaticos([{ idElemento: '', idBotao: '', nome: 'Vazio' }]);
    carregarTooltips();
    if(statusModal) { 
       reset();
       dadoEvento?.relacionados.forEach((dado) => {
         addDadosEstaticos(dado)       
       });
    }
  },[statusModal]);
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

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

  function removerElementoAcessoRapido () {
    let retorno = buscarQuery(dadoEvento?.idBotao, true);
    if (dadoEvento?.idTooltip !== undefined && retorno.ativado === true) {
        nomeTooltip.splice(dadoEvento.idTooltip, 1);
        setNomeTooltip([...nomeTooltip]);
        setEdges(edges.filter(elemento => elemento.target !== dadoEvento?.idOutro));
        setInitialEdges(initialEdges.filter(elemento => elemento.target !== dadoEvento?.idOutro));
        let index = queryEvento.findIndex(elemento => (  elemento.condicao.par1 === dadoEvento?.idOutro || 
                                                         elemento.condicao.par3 === dadoEvento?.idOutro ||
                                                         elemento.acao.id === dadoEvento?.idOutro ) && 
                                                         elemento.idBotao === dadoEvento?.idBotao ); 
        queryEvento.splice(index, 1);
        setQueryEvento([...queryEvento]);
        setStatusModal(false);
    } else {
        handleClose();
    }
  }
  
  function reset() {
    if (statusQuery === true) {
        let index = queryEvento.findIndex(elemento => (elemento.acao.id === dadoEvento?.idOutro) && elemento.idBotao === dadoEvento?.idBotao ); 
        queryEvento.splice(index, 1);
        queryEvento.push({
          idBotao: (dadoEvento !== undefined) ? dadoEvento?.idOutro : '',
          evento: 'Vazio',
          condicao: {
              par1: '',
              par2: 'Maior',
              par3: '',
          },
          acao: {
              id: '',
              tipo: '',
              alterado: '',
          },
          ativado: false,
        });
        setQueryEvento([...queryEvento]);
    } 
  }

  const EtapasRenderizadas = () => {
    switch (activeStep) {
      case 0: return (
          <Eventos id={dadoEvento?.idBotao} />
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
               condicao={condicoes} 
               idBotao={dadoEvento?.idBotao}
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