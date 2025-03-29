import { Stack, Box, Paper, Button } from '@mui/material';
import PageTitle from './PageTitle';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate

interface IBasePageLayoutProps { //Receberá um componente e um título
  children: React.ReactNode;
  pageTitle: string;
}

const BasePageContacts = ({ children, pageTitle }: IBasePageLayoutProps) => {
  const navigate = useNavigate(); // Inicializando o hook useNavigate

  // Função para voltar para a página anterior
  const handleGoBack = () => {
    navigate("/clientes"); // Volta para a página anterior
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} mb={2} alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle title={pageTitle} />
        </Box>
        <Button
          variant="outlined"
          onClick={handleGoBack}
          color="primary"
        >
          Voltar
        </Button>
      </Stack>
      <Paper>{children}</Paper> 
    </>
  );
};

export default BasePageContacts; //Retorna a base da página de contatos
