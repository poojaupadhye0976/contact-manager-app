import { Box, Typography, Avatar, Divider, useMediaQuery, Stack } from '@mui/material';
import { themeVariables } from '../theme/themeVariables';
import FavoriteButton from './FavoriteButton';
import EditContactButton from './EditContactButton';
import DeleteContactButton from './DeleteContactButton';

const ContactDetails = ({ contact, onDelete }) => {
  const isMobile = useMediaQuery(`(max-width:${themeVariables.breakpoints.sm}px)`);

  return (
    <Box sx={{ 
      padding: isMobile ? '16px' : '20px',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <Stack spacing={1.5} alignItems="center">
        <Avatar 
          sx={{ 
            bgcolor: themeVariables.colors.primary, 
            width: 64, 
            height: 64,
            fontSize: '1.75rem',
            fontWeight: 'bold'
          }}
        >
          {contact.name.charAt(0).toUpperCase()}
        </Avatar>
        
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          {contact.name}
        </Typography>
        
        <Box width="100%">
          <Stack spacing={1} divider={<Divider sx={{ my: 0.5 }} />}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Email
              </Typography>
              <Typography variant="body2">{contact.email}</Typography>
            </Box>
            
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Phone
              </Typography>
              <Typography variant="body2">{contact.phone}</Typography>
            </Box>
            
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Address
              </Typography>
              <Typography variant="body2">{contact.address}</Typography>
            </Box>
            
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Favorite
              </Typography>
              <Typography variant="body2">{contact.favourite ? 'Yes' : 'No'}</Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ my: 1.5 }} />
      
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <FavoriteButton contact={contact} />
        <EditContactButton />
        <DeleteContactButton onDelete={onDelete} />
      </Box>
    </Box>
  );
};

export default ContactDetails;