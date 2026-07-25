import { UserRow } from "./UserRow";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";


export const UsersList = () => {
  const { users } = useUsers();
  const { login } = useAuth();
  return (
    <>
      <p>Listado de Usuarios</p>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            {!login.isAdmin || 
              <>
                <th>Update</th>
                <th>Update Route</th>
                <th>Remove</th>
              </>
            }
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, username, email, admin }) => (
            <UserRow key={id} id={id} username={username} email={email} admin={admin} />
          ))}
        </tbody>
      </table>
    </>
  );
};
