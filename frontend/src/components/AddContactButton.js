import { Button } from '@mui/material';
import { useContactStore } from '../store/useContactStore';
import { themeVariables } from '../theme/themeVariables';
import AddIcon from '@mui/icons-material/Add';

const AddContactButton = () => {
  const { openModal, setSelectedContactId } = useContactStore();

  const handleClick = () => {
    setSelectedContactId(null);
    openModal('add');
  };

  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleClick}
      size="large"
      sx={{
        borderRadius: themeVariables.borderRadius.lg,
        px: 4,
        py: 1.5,
        textTransform: 'none',
        fontWeight: themeVariables.typography.fontWeight.medium,
        fontSize: themeVariables.typography.fontSize.md,
        backgroundColor: themeVariables.colors.primary,
        '&:hover': {
          backgroundColor: themeVariables.colors.primary,
          opacity: 0.9,
        },
        boxShadow: themeVariables.shadows.sm,
      }}
    >
      Add Contact
    </Button>
  );
};

export default AddContactButton;