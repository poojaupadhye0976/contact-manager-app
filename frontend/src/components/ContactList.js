import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../api/contacts';
import { useContactStore } from '../store/useContactStore';
import { Box, CircularProgress, Typography, Paper, Stack } from '@mui/material';
import { themeVariables } from '../theme/themeVariables';
import Search from './Search';
import ContactItem from './ContactItem';
import AddContactButton from './AddContactButton';
import PaginationComponent from './Pagination';

const ContactList = () => {
  const { searchQuery, showFavoritesOnly, currentPage, contactsPerPage } = useContactStore();
  
  const { data: response, isLoading, error } = useQuery({
    queryKey: ['contacts', { searchQuery, showFavoritesOnly, currentPage }],
    queryFn: () => getContacts({ search: searchQuery, page: currentPage, limit: contactsPerPage }),
  });

  const filteredContacts = showFavoritesOnly 
    ? response?.data.filter(contact => contact.favourite) 
    : response?.data;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 10, textAlign: 'center', fontSize: '1.2rem' }}>
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: themeVariables.borderRadius.lg,
        bgcolor: themeVariables.colors.white,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3}
          sx={{
            borderBottom: `1px solid ${themeVariables.colors.greyLight}`,
            pb: 2
          }}
        >
          <Typography variant="h5" fontWeight="medium">
            {showFavoritesOnly ? 'Favorite Contacts' : 'All Contacts'}
          </Typography>
          <AddContactButton />
        </Stack>
        
        {/* Search Bar */}
        <Box mb={3}>
          <Search />
        </Box>
        
        {/* Contacts List - Limited to available space */}
        <Box sx={{ 
          flex: 1,
          overflow: 'hidden',
          mb: 2,
          '& > *:not(:last-child)': {
            borderBottom: `1px solid ${themeVariables.colors.greyLight}`,
          }
        }}>
          {filteredContacts?.length > 0 ? (
            <Box sx={{ 
              height: '100%', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ 
                flex: 1,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none' // Hide scrollbar but keep functionality
                }
              }}>
                {filteredContacts.map((contact) => (
                  <ContactItem key={contact.id} contact={contact} />
                ))}
              </Box>
            </Box>
          ) : (
            <Typography 
              variant="body1" 
              sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}
            >
              {showFavoritesOnly ? 'No favorite contacts yet' : 'No contacts found'}
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Pagination - Fixed at bottom */}
      {!showFavoritesOnly && response?.totalPages > 1 && (
        <PaginationComponent totalPages={Math.min(response.totalPages, 10)} />
      )}
    </Box>
  );
};

export default ContactList;