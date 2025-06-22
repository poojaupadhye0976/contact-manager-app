import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContactById, addContact, updateContact, deleteContact } from '../api/contacts';
import { useContactStore } from '../store/useContactStore';
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import { themeVariables } from '../theme/themeVariables';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import DeleteAlert from './DeleteAlert';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: '600px' },
  maxWidth: '600px',
  bgcolor: themeVariables.colors.white,
  borderRadius: themeVariables.borderRadius.xl,
  boxShadow: themeVariables.shadows.lg,
  p: 0,
  overflow: 'hidden',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column'
};

const ContactModal = ({ open, onClose, mode }) => {
  const { selectedContactId, openModal, closeModal } = useContactStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: contact } = useQuery({
    queryKey: ['contact', selectedContactId],
    queryFn: () => getContactById(selectedContactId),
    enabled: !!selectedContactId && mode !== 'add',
    onError: (err) => setError(err.message)
  });

  const addMutation = useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      resetForm();
      onClose();
    },
    onError: (err) => setError(err.message)
  });

  const updateMutation = useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      queryClient.invalidateQueries(['contact', selectedContactId]);
      onClose();
    },
    onError: (err) => setError(err.message)
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      onClose();
    },
    onError: (err) => setError(err.message)
  });

  const resetForm = () => {
    reset({
      name: '',
      email: '',
      phone: '',
      address: '',
      favourite: false,
    });
  };

  useEffect(() => {
    setError(null);
    if (mode === 'edit' && contact) {
      reset({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        favourite: contact.favourite,
      });
    } else if (mode === 'add') {
      resetForm();
    }
  }, [mode, contact, reset, selectedContactId]);

  const onSubmit = (data) => {
    setError(null);
    if (mode === 'add') {
      addMutation.mutate(data);
    } else if (mode === 'edit') {
      updateMutation.mutate({ id: selectedContactId, ...data });
    }
  };

  const handleDelete = () => {
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(selectedContactId);
    setDeleteConfirmOpen(false);
  };

  const isLoading = addMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading;

  return (
    <>
      <Modal 
        open={open} 
        onClose={onClose}
        sx={{
          backdropFilter: 'blur(4px)',
          backgroundColor: themeVariables.colors.modalOverlay
        }}
      >
        <Paper sx={modalStyle}>
          <Box sx={{ 
            p: themeVariables.spacing.lg, 
            bgcolor: themeVariables.colors.primary, 
            color: themeVariables.colors.white,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography 
              variant="h6" 
              component="h2"
              sx={{
                fontSize: themeVariables.typography.fontSize.lg,
                fontWeight: themeVariables.typography.fontWeight.medium
              }}
            >
              {mode === 'add' ? 'Add New Contact' : mode === 'edit' ? 'Edit Contact' : 'Contact Details'}
            </Typography>
          </Box>
          
          <Box sx={{ 
            p: themeVariables.spacing.lg,
            overflowY: 'auto',
            flexGrow: 1
          }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: themeVariables.spacing.lg,
                  borderRadius: themeVariables.borderRadius.md
                }}
              >
                {error}
              </Alert>
            )}

            {mode === 'view' && contact ? (
              <ContactDetails contact={contact} onDelete={handleDelete} />
            ) : (
              <ContactForm 
                onSubmit={onSubmit} 
                isLoading={isLoading} 
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                defaultValues={mode === 'edit' ? contact : undefined}
              />
            )}
          </Box>

          <Divider />
          
          <Box sx={{ 
            p: themeVariables.spacing.md, 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: themeVariables.spacing.sm,
            backgroundColor: themeVariables.colors.light
          }}>
            <Button 
              variant="outlined" 
              onClick={onClose} 
              disabled={isLoading}
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
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {mode !== 'view' && (
              <Button 
                type="submit" 
                variant="contained" 
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
                sx={{
                  borderRadius: themeVariables.borderRadius.lg,
                  px: themeVariables.spacing.lg,
                  textTransform: 'none',
                  fontSize: themeVariables.typography.fontSize.sm,
                  backgroundColor: themeVariables.colors.primary,
                  '&:hover': {
                    backgroundColor: themeVariables.colors.primary,
                    opacity: 0.9,
                  }
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Save Contact'
                )}
              </Button>
            )}
          </Box>
        </Paper>
      </Modal>

      <DeleteAlert 
        open={deleteConfirmOpen} 
        onClose={() => setDeleteConfirmOpen(false)} 
        onConfirm={confirmDelete}
        isLoading={deleteMutation.isLoading}
      />
    </>
  );
};

export default ContactModal;