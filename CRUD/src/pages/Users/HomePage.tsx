import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Página Principal

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Sistema de Agenda!
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/clientes"
        >
          Clientes {/* Vai para página de usuários */}
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage; //Retorna página principal
