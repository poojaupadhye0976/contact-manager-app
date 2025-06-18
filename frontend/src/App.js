import { Box, CssBaseline, Container } from '@mui/material';
import { useContactStore } from './store/useContactStore';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';
import AddContactButton from './components/AddContactButton';
import Navbar from './components/Navbar';

function App() {
  const { isModalOpen, modalMode, closeModal } = useContactStore();

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <AddContactButton />
          <ContactList />
        </Box>
      </Container>
      <ContactModal open={isModalOpen} onClose={closeModal} mode={modalMode} />
    </>
  );
}

export default App;