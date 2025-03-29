import { useEffect, useState } from "react";
import { Stack, IconButton, TextField, Button } from "@mui/material";
import {
  GridRenderCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import MyDataGrid from "../../components/MyDataGrid";
import { Client } from "./types/Client";
import { Delete, Edit, Search } from "@mui/icons-material";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate } from "react-router-dom";
import BasePageLayout from "../../components/BasePageLayout";
import { useClientList } from "../../hooks/useClientList";
import { api } from "../../libs/axios";

const UserList = () => {
  const navigate = useNavigate();
  const { clients, fetchClients } = useClientList();
  
  // Estado para armazenar a pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);

  // Atualiza a lista filtrada quando a busca é realizada
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredClients(clients); // Se não há pesquisa, exibe todos os clientes
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(lowerSearch) ||
        client.cpf.includes(searchTerm)
    );

    setFilteredClients(filtered);
  };

  // Atualiza a lista sempre que `clients` mudar
  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  function onEdit(params: GridRenderCellParams): void {
    if (!params.row.id && params.row.id !== 0) return;
    navigate(`/clientes/${params.row.id}`);
  }

  const onContacts = (params: GridRenderCellParams): void => {
    navigate("/contatos/" + params.row.id);
  };

  async function onDelete(params: GridRenderCellParams): Promise<void> {
    try {
      if (!params.row.id && params.row.id !== 0) {
        console.error("ID não encontrado para exclusão.");
        return;
      }

      await api.delete(`/clientes/` + params.row.id);
      console.log(`Cliente com ID ${params.row.id} removido com sucesso.`);
      fetchClients();
    } catch (error) {
      console.error("Erro ao deletar o cliente:", error);
    }
  }

  const columns: GridColDef<Client>[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Nome",
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.name,
    },
    { field: "cpf", headerName: "CPF", width: 150 },
    { field: "date_birth", headerName: "Data de Nascimento", width: 150 },
    { field: "address", headerName: "Endereço", width: 180 },
    {
      field: "actions",
      headerName: "Ações",
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton color="info" size="small" onClick={() => onEdit(params)}>
            <Edit fontSize="inherit" />
          </IconButton>

          <IconButton color="error" size="small" onClick={() => onDelete(params)}>
            <Delete fontSize="inherit" />
          </IconButton>

          <IconButton color="success" size="small" onClick={() => onContacts(params)}>
            <ContactsIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <BasePageLayout pageTitle="Listar" labelTitle="Listar">
      {/* Barra de Pesquisa */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <TextField
          label="Buscar por Nome ou CPF"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} startIcon={<Search />}>
          Buscar
        </Button>
      </Stack>

      <MyDataGrid columns={columns} rows={filteredClients} />
    </BasePageLayout>
  );
};

export default UserList;
