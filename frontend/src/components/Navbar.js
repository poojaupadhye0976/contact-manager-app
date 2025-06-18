import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useContactStore } from '../store/useContactStore';

const Navbar = () => {
  const { openModal } = useContactStore();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper', 
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 4
      }}
    >
      <Toolbar>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            letterSpacing: 1
          }}
        >
          ConnectHub
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;