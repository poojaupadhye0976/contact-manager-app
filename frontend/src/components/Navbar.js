import { AppBar, Toolbar, Typography } from '@mui/material';
import { themeVariables } from '../theme/themeVariables';

const Navbar = () => {
  return (
    <AppBar 
      position="fixed"
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: themeVariables.colors.white, 
        color: themeVariables.colors.textPrimary,
        boxShadow: themeVariables.shadows.sm
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: themeVariables.typography.fontWeight.bold,
            color: themeVariables.colors.primary,
            fontSize: themeVariables.typography.fontSize.xl
          }}
        >
          Contactly
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;