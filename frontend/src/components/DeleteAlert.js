import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { themeVariables } from '../theme/themeVariables';

const DeleteAlert = ({ open, onClose, onConfirm, isLoading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: themeVariables.borderRadius.lg,
          p: themeVariables.spacing.sm,
          maxWidth: '500px'
        }
      }}
    >
      <DialogTitle sx={{
        fontSize: themeVariables.typography.fontSize.lg,
        fontWeight: themeVariables.typography.fontWeight.medium
      }}>
        Delete Contact
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{
          fontSize: themeVariables.typography.fontSize.sm,
          color: themeVariables.colors.textSecondary
        }}>
          Are you sure you want to delete this contact? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: themeVariables.spacing.md, pt: 0 }}>
        <Button 
          onClick={onClose}
          sx={{ 
            borderRadius: themeVariables.borderRadius.lg,
            px: themeVariables.spacing.lg,
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
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error"
          variant="contained"
          disabled={isLoading}
          sx={{ 
            borderRadius: themeVariables.borderRadius.lg,
            px: themeVariables.spacing.lg,
            textTransform: 'none',
            fontSize: themeVariables.typography.fontSize.sm,
            backgroundColor: themeVariables.colors.danger,
            '&:hover': {
              backgroundColor: themeVariables.colors.danger,
              opacity: 0.9,
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;