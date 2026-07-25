import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { loadingError, initialUserForm, loadingUsers, addUser, removeUser, updateUser, onUserSelectedForm, onOpenForm, onCloseForm } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";



export const useUsers = () => {
    const {users, userSelected, visibleForm, errors} = useSelector(state => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { login, handlerLogout } = useAuth();

    const getUsers = async () => {

        try {
            const result = await findAll();
            console.log(result);
            dispatch(loadingUsers(result.data));
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
                dispatch(addUser({...response.data}));
            } else {
                response = await update(user);
                dispatch(updateUser({...response.data}));
            }
            
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
                dispatch(loadingError(error.response.data));
            } else if (error.response?.status === 500 && error.response.data?.message?.includes("constraint")) {
                if (error.response.data?.message.includes("UK_username")) {
                    dispatch(loadingError({ username: "El username ya existe" }));
                }
                if (error.response.data?.message.includes("UK_email")) {
                    dispatch(loadingError({ email: "El email ya existe" }));
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

                    dispatch(removeUser(id));

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
        // setVisibleForm(true);
        // setUserSelected({ ...user });
        dispatch(onUserSelectedForm({...user}));
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    }

    const handlerCloseForm = () => {
        // setVisibleForm(false);
        // setUserSelected(initalUserForm);
        dispatch(onCloseForm());
        dispatch(loadingError({}));
    }


    return {
        users,
        userSelected,
        initialUserForm,
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