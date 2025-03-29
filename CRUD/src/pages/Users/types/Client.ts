import { z } from 'zod';
import { ClientSchema } from '../schemas/ClientShema';

//Define o tipo Usuário
export type Client = {
  id: string
  name: string
  cpf: string
  date_birth: string
  address:string
}

export type TClientShema = z.infer<typeof ClientSchema>