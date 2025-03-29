import React from "react";
import { Stack, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import DataGridContacts from "./DataGridContacts";

interface Contact {
  id: number;
  value: string;
  type: string;
  observation: string;
}

interface ContactsListProps {
  contacts: Contact[];
  onEditContact: (id: number, updatedContact: Partial<Contact>) => void;
  onDeleteContact: (id: number) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts, onEditContact, onDeleteContact }) => {
  
  const columns: GridColDef<Contact>[] = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "value", headerName: "Valor", flex: 1 },
    { field: "type", headerName: "Tipo", flex: 1 },
    { field: "observation", headerName: "Observação", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="info" size="small" onClick={() => onEditContact(params.row.id, params.row)}>
            <Edit fontSize="inherit" />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => onDeleteContact(params.row.id)}>
            <Delete fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return <DataGridContacts rows={contacts} columns={columns} />;
};

export default ContactsList;
