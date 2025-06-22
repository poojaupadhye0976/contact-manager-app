import { TextField, FormControlLabel, Checkbox, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { themeVariables } from '../theme/themeVariables';

const ContactForm = ({ onSubmit, isLoading, register, errors, handleSubmit, defaultValues }) => {
  const isMobile = useMediaQuery(`(max-width:${themeVariables.breakpoints.sm}px)`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        size="small"
        sx={{ 
          mb: themeVariables.spacing.md, 
          '& .MuiOutlinedInput-root': { 
            borderRadius: themeVariables.borderRadius.lg,
            fontSize: themeVariables.typography.fontSize.sm,
          },
          '& .MuiInputLabel-root': {
            fontSize: themeVariables.typography.fontSize.sm,
          }
        }}
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
        sx={{ 
          mb: themeVariables.spacing.md, 
          '& .MuiOutlinedInput-root': { 
            borderRadius: themeVariables.borderRadius.lg,
            fontSize: themeVariables.typography.fontSize.sm,
          },
          '& .MuiInputLabel-root': {
            fontSize: themeVariables.typography.fontSize.sm,
          }
        }}
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
        sx={{ 
          mb: themeVariables.spacing.md, 
          '& .MuiOutlinedInput-root': { 
            borderRadius: themeVariables.borderRadius.lg,
            fontSize: themeVariables.typography.fontSize.sm,
          },
          '& .MuiInputLabel-root': {
            fontSize: themeVariables.typography.fontSize.sm,
          }
        }}
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
        sx={{ 
          mb: themeVariables.spacing.md, 
          '& .MuiOutlinedInput-root': { 
            borderRadius: themeVariables.borderRadius.lg,
            fontSize: themeVariables.typography.fontSize.sm,
          },
          '& .MuiInputLabel-root': {
            fontSize: themeVariables.typography.fontSize.sm,
          }
        }}
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
            icon={<StarBorderIcon />}
            checkedIcon={<StarIcon sx={{ color: themeVariables.colors.favorite }} />}
            sx={{
              color: themeVariables.colors.primary,
              '&.Mui-checked': {
                color: themeVariables.colors.primary,
              }
            }}
          />
        }
        label="Mark as favorite"
        sx={{
          color: themeVariables.colors.textSecondary,
          fontSize: themeVariables.typography.fontSize.sm,
        }}
      />
    </form>
  );
};

export default ContactForm;