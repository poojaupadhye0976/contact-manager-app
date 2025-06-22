import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useContactStore } from '../store/useContactStore';
import { themeVariables } from '../theme/themeVariables';

const Search = () => {
  const { searchQuery, showFavoritesOnly, setSearchQuery, setShowFavoritesOnly } = useContactStore();

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: themeVariables.spacing.md,
      mb: themeVariables.spacing.lg
    }}>
      <TextField
        label="Search Contacts"
        variant="outlined"
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: themeVariables.borderRadius.lg,
          },
        }}
      />
      
      <FormControlLabel
        control={
          <Checkbox 
            checked={showFavoritesOnly} 
            onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
            sx={{
              color: themeVariables.colors.primary,
              '&.Mui-checked': {
                color: themeVariables.colors.primary,
              },
            }}
          />
        }
        label="Favorites"
      />
    </Box>
  );
};

export default Search;