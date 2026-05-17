import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";

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

    const handlerAddUser = (user) => {
        // console.log(user);
        let type;
        if (user.id === 0) {
            type = "addUser";
        } else {
            type = "updateUser";
        }
        dispatch({
            type: type,
            payload: user,
        });
        Swal.fire({
            title: (user.id === 0) ? "Usuario Creado" : "Usuario Actualizado",
            text: (user.id === 0) ? "El usuario ha sido creado con exito!" : "El usuario ha sido actualizado con exito!",
            icon: "success"
        });
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
        setUserSelected({ ...user });
    }

    return {
        users,
        userSelected,
        initalUserForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
    }
}