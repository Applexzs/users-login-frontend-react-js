import { useEffect, useState } from "react";


export const UserForm = ({userSelected, handlerAddUser, initalUserForm}) => {
    const [userForm, setUserForm] = useState(initalUserForm);

    const { id, username, password, email } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: "",
        });
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        // console.log(target.value);
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        // console.log(userForm);
        if(!username || (!password && id == 0) || !email){
            alert("Debe completar los campos del formulario");
            return;
        }
        // Guardar el user form en el listado de usuarios
        handlerAddUser(userForm);
        setUserForm(initalUserForm);
    }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input className="form-control my-3 w-75" placeholder="Username" name="username" value={username} onChange={onInputChange}/>
        {id > 0 ? "": <input className="form-control my-3 w-75" placeholder="Password" name="password" value={password} type="password" onChange={onInputChange}/>}
        <input className="form-control my-3 w-75" placeholder="Email" name="email" value={email} onChange={onInputChange}/>
        <input type="hidden" name="id" value={id}/>
        <button className="btn btn-primary" type="submit">
            {id > 0 ? "Editar": "Crear"}
        </button>
      </form>
    </>
  );
};
