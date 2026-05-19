import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { NavBar } from "../components/layout/NavBar"
import { RegisterPage } from "../pages/RegisterPage"
import { useUsers } from "../hooks/useUsers"

export const UserRoutes = ({login, handlerLogout}) => {

 const {
        users,
        userSelected,
        initalUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
    } = useUsers();

    return(
        <>
        <NavBar login={login} handlerLogout={handlerLogout}/>
            <Routes>
                <Route path="users" element={<UsersPage users={users} 
                    userSelected={userSelected} 
                    initalUserForm={initalUserForm}
                    visibleForm={visibleForm}
                    handlerAddUser={handlerAddUser}
                    handlerRemoveUser={handlerRemoveUser}
                    handlerUserSelectedForm={handlerUserSelectedForm}
                    handlerOpenForm={handlerOpenForm}
                    handlerCloseForm={handlerCloseForm}/>}/>
                <Route path="users/register" element={<RegisterPage handlerAddUser={handlerAddUser} initalUserForm={initalUserForm}/>}/>
                <Route path="users/edit/:id" element={<RegisterPage users={users} handlerAddUser={handlerAddUser} initalUserForm={initalUserForm}/>}/>
                <Route path="users" element={<Navigate to="/users"/>}/>
            </Routes>
        </>
    )
}