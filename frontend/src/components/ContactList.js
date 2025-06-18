import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../api/contacts';
import { useContactStore } from '../store/useContactStore';
import { 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress, 
  Box, 
  TextField, 
  Checkbox, 
  FormControlLabel,
  Paper,
  Typography
} from '@mui/material';

const ContactList = () => {
  const { searchQuery, showFavoritesOnly, setSearchQuery, toggleShowFavoritesOnly, setSelectedContactId, openModal } = useContactStore();
  
  const { data: contacts, isLoading, error } = useQuery({
    queryKey: ['contacts', { searchQuery, showFavoritesOnly }],
    queryFn: () => getContacts({ search: searchQuery }),
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 2,
        mb: 3
      }}>
        <TextField
          label="Search Contacts"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <FormControlLabel
          control={
            <Checkbox 
              checked={showFavoritesOnly} 
              onChange={toggleShowFavoritesOnly}
              color="primary"
            />
          }
          label="Favorites Only"
        />
      </Box>
      
      <List sx={{ p: 0 }}>
        {contacts?.map((contact) => (
          <ListItem
            key={contact.id}
            button
            onClick={() => {
              setSelectedContactId(contact.id);
              openModal('view');
            }}
            sx={{
              p: 2,
              mb: 1,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': {
                boxShadow: 2,
                bgcolor: 'action.hover'
              }
            }}
          >
            <ListItemText 
              primary={
                <Typography fontWeight="medium">
                  {contact.name}
                </Typography>
              } 
              secondary={contact.email}
            />
            <Checkbox
              checked={contact.favourite}
              disabled
              color="primary"
              sx={{ ml: 2 }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ContactList;