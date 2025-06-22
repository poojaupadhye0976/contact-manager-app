import { Button, Stack, Typography } from '@mui/material';
import { useContactStore } from '../store/useContactStore';
import { themeVariables } from '../theme/themeVariables';

const PaginationComponent = ({ totalPages }) => {
  const { currentPage, setCurrentPage } = useContactStore();

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'background.paper',
        py: 2,
        borderTop: `1px solid ${themeVariables.colors.greyLight}`,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: '12px',
          textTransform: 'none',
          minWidth: 120,
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: 'grey.800',
          },
          '&.Mui-disabled': {
            backgroundColor: 'grey.300',
            color: 'grey.500'
          }
        }}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      <Typography 
        variant="body1" 
        sx={{ mx: 3, minWidth: 100, textAlign: 'center', color: 'text.primary' }}
      >
        Page {currentPage} of {totalPages}
      </Typography>
      
      <Button
        variant="contained"
        sx={{
          borderRadius: '12px',
          textTransform: 'none',
          minWidth: 120,
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: 'grey.800',
          },
          '&.Mui-disabled': {
            backgroundColor: 'grey.300',
            color: 'grey.500'
          }
        }}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Stack>
  );
};

export default PaginationComponent;