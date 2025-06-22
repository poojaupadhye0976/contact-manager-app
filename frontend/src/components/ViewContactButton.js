import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useContactStore } from '../store/useContactStore';
import { themeVariables } from '../theme/themeVariables';

const ViewContactButton = ({ contactId }) => {
  const { setSelectedContactId, openModal } = useContactStore();

  const handleViewDetails = () => {
    setSelectedContactId(contactId);
    openModal('view');
  };

  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<VisibilityIcon />}
      onClick={handleViewDetails}
      sx={{
        borderRadius: themeVariables.borderRadius.lg,
        textTransform: 'none',
        fontSize: themeVariables.typography.fontSize.sm,
        borderColor: themeVariables.colors.border,
        color: themeVariables.colors.textSecondary,
        '&:hover': {
          borderColor: themeVariables.colors.primary,
          color: themeVariables.colors.primary,
        }
      }}
    >
      View Details
    </Button>
  );
};

export default ViewContactButton;