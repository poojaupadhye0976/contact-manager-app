import { IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContact } from '../api/contacts';
import { useContactStore } from '../store/useContactStore';
import { themeVariables } from '../theme/themeVariables';

const FavoriteButton = ({ contact }) => {
  const { selectedContactId } = useContactStore();
  const queryClient = useQueryClient();
  
  const toggleFavoriteMutation = useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      queryClient.invalidateQueries(['contact', selectedContactId]);
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
      onClick={handleToggleFavorite} 
      color="inherit"
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
        <Star sx={{ 
          color: themeVariables.colors.favorite,
          fontSize: '1.5rem'
        }} />
      ) : (
        <StarBorder sx={{ 
          color: themeVariables.colors.textSecondary,
          fontSize: '1.5rem'
        }} />
      )}
    </IconButton>
  );
};

export default FavoriteButton;