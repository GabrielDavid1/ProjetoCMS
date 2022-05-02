/* Componente Framework Material-UI */
import { createSvgIcon } from '@mui/material/utils';
interface IconsProps {
    name: string,
    path: string
}

export function ButtonTopic ({ name, path }:IconsProps) {
    const ButtonType = createSvgIcon(
        <path d={path}/>,
        name,
    );
    return (
        <ButtonType color="disabled" />  
    );
}