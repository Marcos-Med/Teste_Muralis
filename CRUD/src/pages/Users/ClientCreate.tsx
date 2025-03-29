import FormClient from '../../components/FormClient';
import BasePageLayout from '../../components/BasePageLayout';

const ClientCreate = () => {
  return (
    <BasePageLayout pageTitle='Criar Cliente' labelTitle='Criar Cliente'>
      <FormClient />
    </BasePageLayout>
  );
};
export default ClientCreate; //Retorna página de criar cliente