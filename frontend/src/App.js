import { Box, CssBaseline, Container } from '@mui/material';
import { useContactStore } from './store/useContactStore';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const { isModalOpen, modalMode, closeModal } = useContactStore();

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg" sx={{ mt: 8 }}>
            <ContactList />
          </Container>
        </Box>
      </Box>
      <ContactModal open={isModalOpen} onClose={closeModal} mode={modalMode} />
    </>
  );
}

export default App;