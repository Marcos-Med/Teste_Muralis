import BasePageLayout from '../../components/BasePageLayout';
import FormClient from '../../components/FormClient';


const ClientEdit = () => {
  return (
    <BasePageLayout pageTitle='Editar Cliente' labelTitle='Editar Cliente'>
      <FormClient />
    </BasePageLayout>
  );
};
export default ClientEdit; //Retorna página de editar cliente