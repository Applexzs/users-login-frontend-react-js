import { UserRow } from "./UserRow";

export const UsersList = ({handlerRemoveUser, users = [] }) => {
  return (
    <>
      <p>Listado de Usuarios</p>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({id, username, email}) => (
           <UserRow key={id} id={id} username={username} email={email} handlerRemoveUser={handlerRemoveUser}/>
          ))}
        </tbody>
      </table>
    </>
  );
};
