import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { NavBar } from "../components/layout/NavBar"
import { RegisterPage } from "../pages/RegisterPage"
import { useUsers } from "../hooks/useUsers"
import { UserProvider } from "../context/UserProvider"

export const UserRoutes = ({login, handlerLogout}) => {



    return(
        <>
        <UserProvider>
            <NavBar login={login} handlerLogout={handlerLogout}/>
                <Routes>
                    <Route path="users" element={<UsersPage />}/>
                    <Route path="users/register" element={<RegisterPage />}/>
                    <Route path="users/edit/:id" element={<RegisterPage />}/>
                    <Route path="users" element={<Navigate to="/users"/>}/>
                </Routes>
            </UserProvider>
        </>
    )
}