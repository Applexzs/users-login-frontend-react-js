import { useState } from "react";


export const UserForm = ({handlerAddUser, initalUserForm}) => {
    const [userForm, setUserForm] = useState(initalUserForm);

    const { username, password, email } = userForm;

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
        if(!username || !password || !email){
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
        <input className="form-control my-3 w-75" placeholder="Password" name="password" value={password} type="password" onChange={onInputChange}/>
        <input className="form-control my-3 w-75" placeholder="Email" name="email" value={email} onChange={onInputChange}/>
        <button className="btn btn-primary" type="submit">
            Crear
        </button>
      </form>
    </>
  );
};
