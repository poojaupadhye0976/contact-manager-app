import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Toolbar } from '@mui/material';
import { themeVariables } from '../theme/themeVariables';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import { useContactStore } from '../store/useContactStore';

const Sidebar = () => {
  const { showFavoritesOnly, setShowFavoritesOnly } = useContactStore();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: themeVariables.drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: themeVariables.drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
          bgcolor: themeVariables.colors.light
        },
      }}
    >
      <Toolbar /> {/* Spacer for app bar */}
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem 
            button 
            onClick={() => setShowFavoritesOnly(false)}
            sx={{
              backgroundColor: !showFavoritesOnly ? themeVariables.colors.hoverBg : 'inherit',
              '&:hover': {
                backgroundColor: themeVariables.colors.hoverBg
              }
            }}
          >
            <ListItemIcon>
              <InboxIcon sx={{ 
                color: !showFavoritesOnly ? themeVariables.colors.primary : 'inherit' 
              }} />
            </ListItemIcon>
            <ListItemText 
              primary="All Contacts" 
              primaryTypographyProps={{
                color: !showFavoritesOnly ? themeVariables.colors.primary : 'inherit'
              }}
            />
          </ListItem>
          <ListItem 
            button 
            onClick={() => setShowFavoritesOnly(true)}
            sx={{
              backgroundColor: showFavoritesOnly ? themeVariables.colors.hoverBg : 'inherit',
              '&:hover': {
                backgroundColor: themeVariables.colors.hoverBg
              }
            }}
          >
            <ListItemIcon>
              <StarIcon sx={{ 
                color: showFavoritesOnly ? themeVariables.colors.primary : 'inherit' 
              }} />
            </ListItemIcon>
            <ListItemText 
              primary="Favorites" 
              primaryTypographyProps={{
                color: showFavoritesOnly ? themeVariables.colors.primary : 'inherit'
              }}
            />
          </ListItem>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;