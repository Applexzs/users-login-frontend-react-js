import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";


export const UsersApp = () => {
    
    const {
        users,
        userSelected,
        initalUserForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
    } = useUsers();

    
  return (
    <div className="container my-4">
      <h2>Users App</h2>
      <div className="row">
        <div className="col">
          <UserForm initalUserForm={initalUserForm} userSelected={userSelected} handlerAddUser={handlerAddUser}/>
        </div>
        <div className="col">
            { users.length === 0 ? 
            <div className="alert alert-warning">No ha usuarios en el sistema</div> :
             <UsersList handlerUserSelectedForm={handlerUserSelectedForm} handlerRemoveUser={handlerRemoveUser} users={users} />}
          
        </div>
      </div>
    </div>
  );
};
