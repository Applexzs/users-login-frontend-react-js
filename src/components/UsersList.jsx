import { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../context/UserContext";

export const UsersList = () => {
  const {users} = useContext(UserContext);
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
            <th>Update Route</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({id, username, email}) => (
           <UserRow key={id} id={id} username={username} email={email} />
          ))}
        </tbody>
      </table>
    </>
  );
};
