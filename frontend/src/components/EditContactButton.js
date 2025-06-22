import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useContactStore } from '../store/useContactStore';

const EditContactButton = ({ disabled }) => {
  const { openModal } = useContactStore();

  return (
    <IconButton 
      onClick={() => openModal('edit')} 
      color="inherit"
      disabled={disabled}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
      }}
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditContactButton;