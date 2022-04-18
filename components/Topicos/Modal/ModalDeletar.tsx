import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/* Contextos */
import { useList } from '../../../contexts/useTopicos';
import { useModal } from '../../../contexts/useModal';

import Button from '@mui/material/Button';

/* Estilização do Modal Deletar */
const styleDeletar = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '91.1%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const ModalDeletar = (() => {
    const { open2, handleClose2 } = useModal();
    const { idTotal, list,
            nomeSelecionado,
            removerDaLista,
          } = useList();
    
    const plataforma = () => {
        removerDaLista(idTotal,list[0]);
        handleClose2();
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
               {"Tem certeza que deseja deletar o elemento: "+nomeSelecionado+"?"}
            </Typography>
            <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2', marginLeft:'10%', marginTop:'10%'}} onClick={() => plataforma()}>Sim</Button>
            <Button variant="contained" style={{ backgroundColor:'white', color:'#1976d2', marginLeft:'1%', marginTop:'10%'}} onClick={() => handleClose2()}>Não</Button>
          </Box>
        </Modal>
      </div>
    );
  });