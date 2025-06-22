import { ListItem, ListItemText, Box, Avatar, Typography, useMediaQuery } from '@mui/material';
import { themeVariables } from '../theme/themeVariables';
import ViewContactButton from './ViewContactButton';
import Favorites from './Favorites';

const ContactItem = ({ contact }) => {
  const isMobile = useMediaQuery(`(max-width:${themeVariables.breakpoints.sm}px)`);

  return (
    <ListItem
      sx={{
        px: isMobile ? themeVariables.spacing.md : themeVariables.spacing.lg,
        py: isMobile ? themeVariables.spacing.sm : themeVariables.spacing.md,
        mb: themeVariables.spacing.sm,
        borderRadius: themeVariables.borderRadius.lg,
        backgroundColor: themeVariables.colors.white,
        boxShadow: themeVariables.shadows.sm,
        transition: themeVariables.transitions.fast,
        '&:hover': {
          boxShadow: themeVariables.shadows.md,
          backgroundColor: themeVariables.colors.hoverBg,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Avatar 
        sx={{ 
          bgcolor: themeVariables.colors.primary, 
          mr: themeVariables.spacing.md,
          width: 40, 
          height: 40,
          fontSize: themeVariables.typography.fontSize.md,
          fontWeight: themeVariables.typography.fontWeight.medium,
          color: themeVariables.colors.white
        }}
      >
        {contact.name.charAt(0).toUpperCase()}
      </Avatar>
      <ListItemText 
        primary={
          <Typography 
            fontWeight={themeVariables.typography.fontWeight.medium}
            fontSize={themeVariables.typography.fontSize.md}
            color={themeVariables.colors.textPrimary}
            noWrap={isMobile}
          >
            {contact.name}
          </Typography>
        } 
        secondary={
          <Typography 
            fontSize={themeVariables.typography.fontSize.sm}
            color={themeVariables.colors.textSecondary}
            noWrap={isMobile}
          >
            {contact.email}
          </Typography>
        }
        sx={{ my: 0 }}
      />
      <Box sx={{ display: 'flex', gap: themeVariables.spacing.sm, alignItems: 'center' }}>
        {!isMobile && <ViewContactButton contactId={contact.id} />}
        <Favorites contact={contact} />
      </Box>
    </ListItem>
  );
};

export default ContactItem;