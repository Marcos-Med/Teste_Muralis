import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/Users/HomePage';
import ClientCreate from './pages/Users/ClientCreate';
import ClientEdit from './pages/Users/ClientEdit';
import ClientList from './pages/Users/ClientList';
import Contacts from './pages/Users/Contacts';
import ContactsEdit from './pages/Users/ContactsEdit';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/clientes' element={<ClientList />} />
        <Route path='/clientes/new' element={<ClientCreate />} />
        <Route path='/clientes/:id' element={<ClientEdit />} />
        <Route path='/contatos/:id' element={<Contacts/>}/>
        <Route path='/contatos/:contactId/:id' element={<ContactsEdit/>}/>
      </Route>
      <Route path='*' element={<HomePage />} />
    </Routes>
  );
};
export default AppRoutes; //Define as rotas que levam as páginas