import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArticleIcon from '@mui/icons-material/Article';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import HubIcon from '@mui/icons-material/Hub';
import PinchIcon from '@mui/icons-material/Pinch';
import PublicIcon from '@mui/icons-material/Public';

type Props = {
    parametro: string;
}

export default function ListaIcones ({ parametro }:Props){
    switch(parametro) {
        case '1': return <InsertDriveFileIcon />;
        case '3': return <BackupTableIcon />;
        case '4': return <FileOpenIcon />;
        case '5': return <DisplaySettingsIcon />;
        case '6': return <AssignmentIcon />;
        case '7': return <CoPresentIcon />;
        case '8': return <HubIcon />;
        case '9': return <PinchIcon />;
        case '10': return <PublicIcon />;
        default: return <ArticleIcon />;
    }
}