import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { api } from '../libs/axios';
import { useNavigate } from 'react-router-dom';

interface EditableContactFormProps { //Página para editar um contato
  contactId: number;
  clientId: string;
}

const EditableContactForm: React.FC<EditableContactFormProps> = ({ contactId, clientId }) => {
  const [value, setValue] = useState(''); //valor
  const [type, setType] = useState(''); // tipo
  const [observation, setObservation] = useState(''); //observação
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await api.get(`/contato/by/${contactId}`); //busca um contato
        setValue(response.data[0].value || '');
        setType(response.data[0].type || '');
        setObservation(response.data[0].observation || '');
      } catch (error) {
        console.error('Erro ao carregar os detalhes do contato:', error);
      }
    };

    fetchContactDetails();
  }, [clientId, contactId]);

  const handleSave = async () => {
    if (!value || !type) {
      alert('Os campos Valor e Tipo são obrigatórios.');
      return;
    }

    try {
      setSaving(true);
      await api.put(`/contato/${contactId}`, { //atualiza contato
        value,
        type,
        observation,
        client_id: clientId

      });
    } catch (error) {
      console.error('Erro ao salvar as alterações do contato:', error);
      alert('Erro ao salvar as alterações.');
    } finally {
      setSaving(false);
      navigate(`/contatos/${clientId}`);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} mb={2}>
      <Typography variant="h6">Editar Contato</Typography>

      <TextField
        label="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        required
        disabled={saving}
      />
      <TextField
        label="Tipo"
        value={type}
        onChange={(e) => setType(e.target.value)}
        variant="outlined"
        required
        disabled={saving}
      />
      <TextField
        label="Observação (opcional)"
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        variant="outlined"
        disabled={saving}
      />

      <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
        Salvar
      </Button>
    </Box>
  );
};

export default EditableContactForm;
