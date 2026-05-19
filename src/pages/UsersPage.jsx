import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";


export const UsersPage = ({
        users,
        userSelected,
        initalUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
    }) => {
    
  return (
    <>
    
    {!visibleForm || <div className="abrir-modal animacion fadeIn">
      <UserModalForm userSelected = {userSelected} initalUserForm = {initalUserForm} handlerAddUser = {handlerAddUser} handlerCloseForm = {handlerCloseForm}/>
      </div>}
    <div className="container my-4">
      <h2>Users App</h2>
      <div className="row">
        
        <div className="col">
          {visibleForm || <button className="btn btn-primary my-2" onClick={handlerOpenForm}>Nuevo Usuario</button>}
          
            { users.length === 0 ? 
            <div className="alert alert-warning">No ha usuarios en el sistema</div> :
             <UsersList handlerUserSelectedForm={handlerUserSelectedForm} handlerRemoveUser={handlerRemoveUser} users={users} />}
          
        </div>
      </div>
    </div>
    </>
  );
};
