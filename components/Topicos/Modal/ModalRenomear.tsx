import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/* Contextos */
import { useList } from '../../../contexts/useTopicos';
import { useModal } from '../../../contexts/useModal';

/* Estilização do Modal Renomear */
const styleRenomear = {
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

export const ModalRenomear = (() => {
    let nomeEstatico = '';

    const { open, setOpen, handleOpen } = useModal();
    const { idTotal, list, renomearElemento } = useList();

    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        nomeEstatico =  event.target.value;
    }

    const handleSubmit = (Event: React.FormEvent<HTMLFormElement>) => {
        setOpen(false);
        renomearElemento(idTotal, list[0], nomeEstatico);
        Event.preventDefault();
    }

    return (
        <div>
        <Modal
            open={open}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleRenomear}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Renomear elemento
                </Typography>
                <form onSubmit={handleSubmit}>
                    <input onChange={change} type="text" />    
                </form>
            </Box>
        </Modal>
        </div>
    );
});