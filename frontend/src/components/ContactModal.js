import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContactById, addContact } from '../api/contacts';
import { useContactStore } from '../store/useContactStore';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  Paper,
  Divider
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 0,
  overflow: 'hidden'
};

const ContactModal = ({ open, onClose, mode }) => {
  const { selectedContactId } = useContactStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
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
      onClose();
    },
    onError: (err) => setError(err.message)
  });

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
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        favourite: false,
      });
    }
  }, [mode, contact, reset]);

  const onSubmit = (data) => {
    setError(null);
    if (mode === 'add') {
      addMutation.mutate(data);
    }
  };

  const isLoading = addMutation.isLoading;

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        <Box sx={{ 
          p: 3, 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText'
        }}>
          <Typography variant="h6" component="h2">
            {mode === 'add' ? 'Add New Contact' : mode === 'edit' ? 'Edit Contact' : 'Contact Details'}
          </Typography>
        </Box>
        
        <Box sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {mode === 'view' && contact ? (
            <Box sx={{ '& > *': { mb: 1.5 } }}>
              <Typography><strong>Name:</strong> {contact.name}</Typography>
              <Typography><strong>Email:</strong> {contact.email}</Typography>
              <Typography><strong>Phone:</strong> {contact.phone}</Typography>
              <Typography><strong>Address:</strong> {contact.address}</Typography>
              <Typography><strong>Favourite:</strong> {contact.favourite ? 'Yes' : 'No'}</Typography>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
              />
              <TextField
                label="Phone"
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                {...register('phone', {
                  required: 'Phone is required',
                  pattern: {
                    value: /^[0-9-]+$/,
                    message: 'Invalid phone number',
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={isLoading}
              />
              <TextField
                label="Address"
                fullWidth
                margin="normal"
                size="small"
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                {...register('address', { required: 'Address is required' })}
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={isLoading}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('favourite')}
                    disabled={isLoading}
                    color="primary"
                  />
                }
                label="Mark as favorite"
              />
            </form>
          )}
        </Box>

        <Divider />
        
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 1 
        }}>
          <Button 
            variant="outlined" 
            onClick={onClose} 
            disabled={isLoading}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none'
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
                borderRadius: 2,
                px: 3,
                textTransform: 'none'
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
  );
};

export default ContactModal;