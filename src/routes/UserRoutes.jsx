import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { NavBar } from "../components/layout/NavBar";
import { RegisterPage } from "../pages/RegisterPage";
import { useSelector } from "react-redux";

export const UserRoutes = () => {
  const { isAdmin } = useSelector(state => state.auth);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="users" element={<UsersPage />} />
        {!isAdmin || (
          <>
            <Route path="users/register" element={<RegisterPage />} />
            <Route path="users/edit/:id" element={<RegisterPage />} />
          </>
        )}
        <Route path="users" element={<Navigate to="/users" />} />
      </Routes>
    </>
  );
};
