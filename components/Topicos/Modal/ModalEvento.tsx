/* React */
import React, { useEffect, useState } from 'react';

/* Componente Framework Material-UI */
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Edge } from 'react-flow-renderer';

/* Variaveis e Tipagens */
import { steps } from '../../../Importacoes/Variaveis/Variaveis';
import { condicoes } from '../../../Importacoes/Variaveis/Variaveis';
import { DadoEvtProps } from '../../../Importacoes/Tipagens/Tipagem';
import { Config } from '../../../Importacoes/Tipagens/Tipagem';
import { tiposTamanho } from '../../../Importacoes/Variaveis/Variaveis';

/* Componentes */
import Eventos  from './subComponentesModal/Evento';
import Condicao from './subComponentesModal/Condicao';
import Parametros from './subComponentesModal/Parametros';
import ElementoId from './subComponentesModal/ElementoId';

/* Contextos */
import { useList } from '../../../contexts/useTopicos';
import { useConfig } from '../../../contexts/useConfig';
import { useEvent } from '../../../contexts/useEvent';

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
}

type ObjPadrao = {
  id:string;
  nome: string;
}

export default function ModalEvento({
  nomePagina,
  statusModal,
  setStatusModal,
  dadoEvento,
}: propriedade) {
  const { list } = useList();
  const { buscarQuery, deletarQuery,
          queryEvento, setQueryEvento,
        } = useEvent();  

  const [DadosEstaticos, setDadosEstaticos] = useState<ObjPadrao[]>([]);

  const handleClose = () => {
    let retorno = buscarQuery(dadoEvento?.idBotao, false);
    if (retorno.ativado === false && activeStep < 4) {
        deletarQuery(dadoEvento?.idBotao, false);
    } else if(retorno.ativado === false && activeStep === 4){
        retorno.ativado = true;
        setQueryEvento([...queryEvento]);    
    }
    setActiveStep((prevActiveStep) => prevActiveStep = 0);
    setActiveStep(0);
    setDadosEstaticos([]);
    setStatusModal(false);
  };

  function addDadosEstaticos (id: string) {
    const regex = new RegExp(id, 'gi');
    DadosEstaticos.push({
       id: id,
       nome: list[0].children.filter(param => regex.test(param.id))[0].name,
    });
    setDadosEstaticos([...DadosEstaticos]);
  }

  useEffect(() => {
    if(statusModal) { 
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
      handleClose();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }

    switch (activeStep) {
      case 1: 

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

  /* SUB COMPONENTES */
  const EtapasRenderizadas = () => {
    switch (activeStep) {
      case 0: return (
          <Eventos id={dadoEvento?.idBotao} />
      );
      case 1: return (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>            
            <ElementoId 
               parametro='Elemento' 
               dadoEvento={DadosEstaticos}
            /> 
            <Parametros 
               parametro='Param 1' 
               dadoEvento={DadosEstaticos}
               idBotao={dadoEvento?.idBotao}
            /> 
          </Box>
      );
      case 2: return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>            
            <Condicao 
               parametro='CONDIÇÃO' 
               condicao={condicoes} 
            /> 
        </Box>
      )
      case 3: return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>            
            <ElementoId 
              parametro='Elemento' 
              dadoEvento={DadosEstaticos}
            /> 
            <Parametros 
              parametro='Param 2' 
              dadoEvento={DadosEstaticos}
              idBotao={dadoEvento?.idBotao}
            /> 
        </Box>
      );
    }
  };

  return (
      <Modal
        id="modal-evento"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={statusModal}
        onClose={handleClose}
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
            </React.Fragment>
          )}
          </Box>
        </Fade>
      </Modal>
  );
}