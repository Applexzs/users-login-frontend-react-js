import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const {
    users,
    userSelected,
    initalUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  } = useUsers();

  return (
    <>
      <UserContext.Provider
        value={
            {
                users,
                userSelected,
                initalUserForm,
                visibleForm,
                errors,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerOpenForm,
                handlerCloseForm,
                getUsers,
            }
    }
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
