import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormContacts from "../../components/FormContacts.tsx";
import ContactsList from "../../components/ContactsList.tsx";
import { api } from "../../libs/axios.ts";
import { CircularProgress, Box, Typography } from "@mui/material";
import { Client } from "./types/Client.ts";
import ClientInfo from "../../components/ClientInfo.tsx";
import BasePageContacts from "../../components/BasePageContacts.tsx";

interface Contact {
  id: number;
  type: string;
  value: string;
  observation: string;
}

const Contacts = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [client, setClient] = useState<Client | null>(null); // Estado para armazenar os dados do usuário
  const [contacts, setContacts] = useState<Contact[]>([]); // Estado para armazenar os contatos do usuário
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const navigate = useNavigate();

  // Busca informações do cliente
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/clientes/${id}`);
        setClient({id: response.data[0].id,
          name: response.data[0].name,
          cpf: response.data[0].CPF,
          date_birth: response.data[0].dateBirth,
          address: response.data[0].address
        });
      } catch (error) {
        console.error("Erro ao buscar o cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  // Busca lista de contatos do cliente
  const fetchContacts = async () => {
    try {
      const response = await api.get(`/contato/${id}`);
      setContacts(response.data.map((value: any) => (
       {
        id: value.id,
        value: value.value,
        type: value.type,
        observation: value.observation
       }
      )));
    } catch (error) {
      console.error("Erro ao buscar os contatos:", error);
    }
  };



  const handleAddContact = async (newContact: { value: string; type: string; observation?: string }) => {
    try {
      await api.post(`/contato`, {
        ...newContact,
        client_id: parseInt(id || "0"),
      })
      await fetchContacts(); // Atualiza a lista de contatos
    } catch (error) {
      console.error("Erro ao adicionar contato:", error);
      alert("Erro ao adicionar contato.");
    }
  };

  // Edita uma contato existente
  const handleEditContact = (Id: number) => {
    navigate(`/contatos/${Id}/${id}`); // Redireciona para a página de edição
  };

  // Remove uma compra
  const handleDeleteContact = async (Id: number) => {
    try {
      await api.delete(`/contato/${Id}`);
      setContacts(contacts.filter((contact) => contact.id !== Id));
    } catch (error) {
      console.error("Erro ao remover o contato:", error);
      alert("Erro ao remover o contato.");
    }
  };

  // Busca contatos ao carregar a página
  useEffect(() => {
    if(!loading){
      fetchContacts();
    }
  }, [loading, id]);

  // Exibição de carregamento
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Exibição de erro caso o usuário não seja encontrado
  if (!client) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Cliente não encontrado.</Typography>
      </Box>
    );
  }

  return (
    <BasePageContacts pageTitle="Contatos do Cliente">
      <ClientInfo name={client.name} cpf={client.cpf} dateBirth={client.date_birth} address={client.address} />
      <FormContacts onAddContacts={handleAddContact} />
      <ContactsList
        contacts={contacts}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
      />
    </BasePageContacts>
  );
};

export default Contacts;
