/* React */
import * as React from 'react';

/* Componente Framework Material-UI */
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* Componente */
import ListaIcones from '../../TemplatePrincipal/ListaIcones'

/* Contexto */
import { useCache } from '../../../contexts/useCache';

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
    nomeDaPagina: string;
}

const listaDeIdIcones = ['1','2','3','4','5','6','7','8','9','10'];

export default function ModalConfig({nomeDaPagina}: propriedade) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { configPagina, setConfigPagina } = useCache();

  const [valor, setValor] = React.useState('1');
  const [titulo, setTitulo] = React.useState(nomeDaPagina);

  const handleChange = (event: SelectChangeEvent) => {
    setValor(event.target.value as string);
  };

  const tituloChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTitulo(event.target.value as string);
  };  

  function salvar () {
    let id = '0';
    switch (nomeDaPagina) {
        case 'segundaPagina':  id = '2'; break;
        case 'terceiraPagina': id = '3'; break;
        default: id = '1'; break;
    }
    setConfigPagina(
      configPagina.map(el => (el.identificador === id
          ? {...el, nomePagina:titulo, iconeId:valor} : el
      ))
    );
    setOpen(false)
  }
  
  return (
    <div>
      <Tooltip style={{fontSize: '5rem'}} title="Configurações" placement="right-start">
         <ListItem  onClick={handleOpen} button component="a">
            <ListItemIcon>
                <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="" />
         </ListItem>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
           timeout: 500,
        }}
        sx={{ width: '800px'  }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1 style={{ textAlign:'left' }}> Configurações </h1>
            <TextField
                id="outlined-uncontrolled"
                label="Nome da Página"
                onChange={(e) => tituloChange(e)}
                style={{ marginBottom: '20px' }}
            />
            <FormControl fullWidth>
                <InputLabel
                   id="demo-simple-select-label"
                   style={{ marginBottom: '20px' }}
                >
                   Icone da Página
                </InputLabel> 
                <Select
                  className="controleIconesModal"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={valor}
                  label="Icone da Página"
                  onChange={handleChange}
                  style={{width:'99%', 
                          height: '60px', 
                          textAlign:'center', 
                          marginBottom: '10px'}}
                >
                { listaDeIdIcones.map((item, index) => { 
                    return (
                      <MenuItem key={item} value={item}>
                          <ListaIcones parametro={item} />
                      </MenuItem>
                    )
                })}
                </Select>
            </FormControl>
            <Button onClick={salvar}> SALVAR </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}