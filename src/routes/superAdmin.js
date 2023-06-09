import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const SuperAdmins = lazy(() => import('Views/SuperAdmin/SAManagement'));
const FormSuperAdmin = lazy(() => import('Views/SuperAdmin/SAManagement/Form'));
const Admins = lazy(() => import('Views/SuperAdmin/AdminManagement'));
const AdminForm = lazy(() => import('Views/SuperAdmin/AdminManagement/Form'));

const SuperAdminsRoutes = () => {
  return (
    <Switch>
      <Route exact path="/superAdmins/admins" component={Admins} />
      <Route exact path="/superAdmins/admins/form" component={AdminForm} />
      <Route path="/superAdmins/admins/form/:id" component={AdminForm} />
      <Route path="/superAdmins" exact component={SuperAdmins} />
      <Route path="/superAdmins/form" exact component={FormSuperAdmin} />
      <Route path="/superAdmins/form/:id" component={FormSuperAdmin} />
    </Switch>
  );
};
export default SuperAdminsRoutes;
