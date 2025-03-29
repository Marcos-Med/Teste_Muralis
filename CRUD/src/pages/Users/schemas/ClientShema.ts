import { z } from 'zod';

//Define o schema da Relação Usuário
export const ClientSchema = z.object({
  name: z.string().nonempty('Este campo é obrigatório'),
  cpf: z.string().nonempty('Este campo é obrigatório'),
  date_birth: z.string().nonempty('Este campo é obrigatório'),
  address: z.string()
});