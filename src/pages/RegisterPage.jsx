import { useContext, useEffect, useState } from "react"
import { UserForm } from "../components/UserForm"
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const RegisterPage = () => {
    const { users=[], initalUserForm } = useContext(UserContext);
    const [userSelected, setUserSelected] = useState(initalUserForm);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            const user = users.find(u => u.id == id) || initalUserForm;
            setUserSelected(user);
        } else {
            setUserSelected(initalUserForm);
        }
    }, [id]);
    return(
        <>
            <div className="container my-4">
                <h4>{userSelected.id > 0 ? "Editar" : "Registrar"}</h4>
                <div className="row">
                    <div className="col">
                        <UserForm userSelected={userSelected} />
                    </div>
                </div>
            </div>
        </>
    )
}