import EditingContacts from "../../components/EditingContacts";
import BasePageEditContacts from "../../components/BasePageEditContacts";
import { useParams } from "react-router-dom";

const ContactEdit = () => {
  const { id, contactId } = useParams();
  let user_id: any;
  let contact_id: any;
  if (id && contactId) {
    user_id = parseInt(id);
    contact_id = contactId;
  }
  return (
    <BasePageEditContacts pageTitle="Editar Contato">
      <EditingContacts contactId={contact_id} clientId={user_id} />
    </BasePageEditContacts>
  );
};

export default ContactEdit; // Página de Edição de Contatos