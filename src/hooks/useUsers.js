import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initalUserForm = {
    id: 0,
    username: "",
    password: "",
    email: "",
    admin: false,
}

const initialErrors = {
    username: "",
    password: "",
    email: "",
}


export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initalUserForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const { login, handlerLogout } = useContext(AuthContext);

    const getUsers = async () => {

        try {
            const result = await findAll();
            console.log(result);
            dispatch({
                type: "loadingUsers",
                payload: result.data,
            });

        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
                return false;
            }
        }
    }


    const handlerAddUser = async (user) => {

        if (!login.isAdmin) return;
        let response;

        try {
            if (user.id === 0) {
                response = await save(user);
            } else {
                response = await update(user);
            }
            // console.log(user);
            const type = (user.id === 0) ? "addUser" : "updateUser";
            dispatch({
                type: type,
                payload: response.data,
            });
            Swal.fire({
                title: (user.id === 0) ? "Usuario Creado" : "Usuario Actualizado",
                text: (user.id === 0) ? "El usuario ha sido creado con exito!" : "El usuario ha sido actualizado con exito!",
                icon: "success"
            });
            handlerCloseForm();
            navigate("/users");
            return true;

        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
                return false;
            }

            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else if (error.response?.status === 500 && error.response.data?.message?.includes("constraint")) {
                if (error.response.data?.message.includes("UK_username")) {
                    setErrors({ username: "El username ya existe" });
                }
                if (error.response.data?.message.includes("UK_email")) {
                    setErrors({ email: "El email ya existe" });
                } else {
                    throw error;
                }
                return false;
            }
        }
    }

    const handlerRemoveUser = (id) => {
        console.log(id);
        if (!login.isAdmin) return;

        Swal.fire({
            title: "Estas seguro?",
            text: "Cuidado el usuario será eliminado permanentemente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminarlo!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    await remove(id);
                    dispatch({
                        type: "removeUser",
                        payload: id,
                    });
                    Swal.fire({
                        title: "Usuario Eliminado!",
                        text: "El usuario ha sido Eliminado con exito.",
                        icon: "success"
                    });
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        });
    }

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setVisibleForm(true);
        setUserSelected({ ...user });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initalUserForm);
        setErrors({});
    }


    return {
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