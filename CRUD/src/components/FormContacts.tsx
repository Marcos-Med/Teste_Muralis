import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface Contact {
  value: string;
  type: string;
  observation?: string;
}

interface FormContactsProps {
  onAddContacts: (newContact: Contact) => void;
}

function FormContacts({ onAddContacts }: FormContactsProps) {
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [observation, setObservation] = useState("");

  const handleSubmit = () => {
    if (!value || !type) {
      alert("Os campos Valor e Tipo são obrigatórios.");
      return;
    }
    onAddContacts({ value, type, observation });
    setValue("");
    setType("");
    setObservation("");
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} mb={2}>
      <TextField
        label="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Tipo"
        value={type}
        onChange={(e) => setType(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Observação (opcional)"
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Adicionar Contato
      </Button>
    </Box>
  );
}

export default FormContacts;