import { IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContact } from '../api/contacts';
import { themeVariables } from '../theme/themeVariables';

const Favorites = ({ contact }) => {
  const queryClient = useQueryClient();
  
  const toggleFavoriteMutation = useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
    },
  });

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavoriteMutation.mutate({
      id: contact.id,
      ...contact,
      favourite: !contact.favourite
    });
  };

  return (
    <IconButton 
      edge="end" 
      aria-label="favorite"
      onClick={handleToggleFavorite}
      disabled={toggleFavoriteMutation.isLoading}
      sx={{
        '&:hover': {
          backgroundColor: 'transparent',
          '& svg': {
            color: `${themeVariables.colors.favoriteHover} !important`
          }
        }
      }}
    >
      {contact.favourite ? (
        <Star sx={{ color: themeVariables.colors.favorite }} />
      ) : (
        <StarBorder sx={{ color: themeVariables.colors.textSecondary }} />
      )}
    </IconButton>
  );
};

export default Favorites;