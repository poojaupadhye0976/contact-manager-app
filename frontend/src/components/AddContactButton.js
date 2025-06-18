import { Button } from '@mui/material';
import { useContactStore } from '../store/useContactStore';

const AddContactButton = () => {
  const { openModal } = useContactStore();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => openModal('add')}
      sx={{ 
        mb: 3,
        px: 4,
        py: 1.5,
        borderRadius: 2,
        textTransform: 'none',
        fontSize: '1rem',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          transform: 'translateY(-1px)'
        }
      }}
    >
      Add New Contact
    </Button>
  );
};

export default AddContactButton;