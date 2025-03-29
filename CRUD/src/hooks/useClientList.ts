import { useEffect, useState } from "react";
import { api } from "../libs/axios";


export const useClientList = () => { //Hook utilizado para requisitar a lista de clientes
  const [clients, setClients] = useState<any[]>([]);

  // Função para buscar os clientes
  const fetchClients = async () => {
    try {
      const { data } = await api.get(`/clientes`); //Requisita lista de clientes
      console.log(data)
      setClients(data.map((value: any) => ({
        id: String(value.id),
        name: value.name,
        cpf: value.cpf,
        date_birth: value.dateBirth.split("-").reverse().join("/"),
        address: value.address
      })));
      console.log(clients)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Carregar os clientes ao montar o componente
  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, fetchClients }; //Retorna o array e função para requisitar lista de clientes
};
