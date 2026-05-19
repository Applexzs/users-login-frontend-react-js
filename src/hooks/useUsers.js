import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialUsers = [
    {
        id: 1,
        username: "pepe",
        password: "12345",
        email: "pepe@mail.com"
    }

];
const initalUserForm = {
    id: 0,
    username: "",
    password: "",
    email: "",
}


export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initalUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();

    const handlerAddUser = (user) => {
        // console.log(user);
        const type = (user.id === 0) ? "addUser" : "updateUser"; 
        dispatch({
            type: type,
            payload: user,
        });
        Swal.fire({
            title: (user.id === 0) ? "Usuario Creado" : "Usuario Actualizado",
            text: (user.id === 0) ? "El usuario ha sido creado con exito!" : "El usuario ha sido actualizado con exito!",
            icon: "success"
        });
        handlerCloseForm();
        navigate("/users");
    }

    const handlerRemoveUser = (id) => {
        console.log(id);

        Swal.fire({
            title: "Estas seguro?",
            text: "Cuidado el usuario será eliminado permanentemente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: "removeUser",
                    payload: id,
                });
                Swal.fire({
                    title: "Usuario Eliminado!",
                    text: "El usuario ha sido Eliminado con exito.",
                    icon: "success"
                });
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
    }


    return {
        users,
        userSelected,
        initalUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
    }
}