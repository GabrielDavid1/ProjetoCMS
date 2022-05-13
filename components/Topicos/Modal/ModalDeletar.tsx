/* Componentes Framework Material-UI */
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/* Contextos */
import { useList } from '../../../contexts/useTopicos';
import { useModal } from '../../../contexts/useModal';
import { useConfig } from '../../../contexts/useConfig';

/* Variaveis Padrão */
import { styleDeletar } from '../../../Importacoes/Variaveis/Variaveis';

export const ModalDeletar = (() => {
    const { open2, handleClose2 } = useModal();
    const { idTotal, list,
            nomeSelecionado,
            removerDaLista,
          } = useList();
    const { removerConfigs, setIdTotal } = useConfig();

    const plataforma = () => {
          removerDaLista(idTotal,list[0]);
          removerConfigs(idTotal);
          handleClose2();
          setIdTotal('');
    }

    return (
      <div>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleDeletar}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Tem certeza que deseja deletar este elemento ?
            </Typography>
            <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2', marginLeft:'10%', marginTop:'10%'}} onClick={() => plataforma()}>Sim</Button>
            <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2', marginLeft:'1%', marginTop:'10%'}} onClick={() => handleClose2()}>Não</Button>
          </Box>
        </Modal>
      </div>
    );
  });