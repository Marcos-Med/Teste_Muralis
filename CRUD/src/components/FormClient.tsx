import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { DevTool } from '@hookform/devtools';
import { ClientSchema } from '../pages/Users/schemas/ClientShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Client } from '../pages/Users/types/Client';
import { api } from '../libs/axios';

const FormClient = () => {
  console.log('Renderizou Form');
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch 
  } = useForm<Client>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(ClientSchema),
    defaultValues: { //Valores padrão
      date_birth: '',
      address: '',
      name: '',
      cpf: ''
    },
  });

  const onSubmit = async (data: Client) => {
    console.log('Dados enviados:', data);
    // Converter data de "dd/MM/yyyy" para "yyyy-MM-dd"
    const [day, month, year] = data.date_birth.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    try{
    if (!id) {
      // Criar um novo cliente
      await api.post(`/clientes`, {
        name: data.name,
        cpf: data.cpf,
        date_birth: formattedDate,
        address: data.address
      });
    } else {
      // Atualizar um cliente
       await api.put(`/clientes/` + id, {
        name: data.name,
        cpf: data.cpf,
        date_birth: formattedDate,
        address: data.address
       });
    }
    }
    catch(error){
      console.error('Erro ao salvar as alterações do contato:', error);
      alert('Erro ao salvar as alterações.');
    }

    navigate('/clientes/'); //Retorna para a página anterior
  };

  useEffect(() => { // Carrega os dados do cliente para atualização
    if (!id) return;
  
    const fetchClient = async () => {
      try {
        console.log("Buscando cliente com ID:", id);
        const { data } = await api.get(`/clientes/${id}`); //Carrega os dados
        console.log("Cliente encontrado:", data);
        const [year, month, day] = data[0].dateBirth.split("-");
        const formattedDate = `${day}/${month}/${year}`;
  
        reset({ //Preenche o forms
          name: data[0].name || "",
          cpf: data[0].cpf || "",
          date_birth: formattedDate|| "",
          address: data[0].address || ""
        });
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    };
  
    fetchClient();
  }, [id, reset, control]);
  
  return (
    <>
    <DevTool control={control} placement="top-right" />
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 2 }}
      >
        <TextField //Campo de Nome
          label="Nome Completo"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ marginBottom: 2 }}
          {...register('name')}
          InputLabelProps={{
            shrink: !!errors.name || !!watch('name'),  // Faz a label ficar acima quando o valor estiver preenchido
          }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 2 }}>
          <Controller //Campo de CPF
            control={control}
            name="cpf"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  label="CPF"
                  fullWidth
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 2 }}>
          <Controller //Campo de Data de Nascimento
            control={control}
            name="date_birth"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  label="Data de Nascimento"
                  fullWidth
                  error={!!errors.date_birth}
                  helperText={errors.date_birth?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 2 }}>
          <Controller //Campo de Endereço
            control={control}
            name="address"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  label="Endereço"
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button type="submit" variant="contained" size="large">
            {id ? 'Atualizar Usuário' : 'Criar Usuário'}
          </Button>
          <Button component={RouterLink} to="/clientes">
            Cancelar {/* Botão para cancelar a operação */}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default FormClient; //Devolve o formulário de Cliente
