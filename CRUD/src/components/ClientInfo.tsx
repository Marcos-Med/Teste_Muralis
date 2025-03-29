import { Avatar, Box, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface ClientInfoProps {
  name: string;
  cpf: string;
  dateBirth: string;
  address: String;
  profilePicture?: string; // URL da foto de perfil (opcional)
}

const ClientInfo = ({ name, cpf, dateBirth, address,  profilePicture }: ClientInfoProps) => { //Define o componente com as informações do Cliente
  return (
    <Box
      display="flex"
      alignItems="center"
      padding={2}
      borderRadius={2}
      boxShadow={2}
      bgcolor="background.paper"
      gap={2}
    >
      {profilePicture ? ( //Foto de Avatar do Usuário
        <Avatar src={profilePicture} alt={`${name}'s Profile`} sx={{ width: 56, height: 56 }} />
      ) : (
        <Avatar sx={{ width: 56, height: 56 }}>
          <AccountCircleIcon fontSize="large" />
        </Avatar>
      )}

      <Box>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cpf}
        </Typography>
        <Typography variant="body2" color="text.secondary"> {dateBirth.split("-").reverse().join("/")} </Typography>
        <Typography variant="body2" color="text.secondary">{address}</Typography>
      </Box>
    </Box>
  );
}

export default ClientInfo;
