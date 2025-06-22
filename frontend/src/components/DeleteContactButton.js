import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteContactButton = ({ onDelete, disabled }) => {
  return (
    <IconButton 
      onClick={onDelete} 
      color="inherit"
      disabled={disabled}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteContactButton;