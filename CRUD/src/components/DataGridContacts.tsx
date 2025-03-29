import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

interface IMyDataGridProps {
  columns: GridColDef[];
  rows: GridValidRowModel[];
}

const DataGridContacts = ({ columns, rows }: IMyDataGridProps) => { //Estrutura da tabela de contatos
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id} // Define o ID do contato como identificador único
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridContacts;

