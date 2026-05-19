import { useEffect, useState } from "react"
import { UserForm } from "../components/UserForm"
import { useParams } from "react-router-dom";

export const RegisterPage = ({ users=[], handlerAddUser, initalUserForm}) => {

    const [userSelected, setUserSelected] = useState(initalUserForm);

    const {id} = useParams();

    useEffect(() => {
        const user = users.find(u => u.id == id) || initalUserForm;
        setUserSelected(user);
    }, [id]);
    return(
        <>
            <div className="container my-4">
                <h4>{userSelected.id > 0 ? "Editar" : "Registrar"}</h4>
                <div className="row">
                    <div className="col">
                        <UserForm userSelected={userSelected} handlerAddUser={handlerAddUser} initalUserForm={initalUserForm}/>
                    </div>
                </div>
            </div>
        </>
    )
}