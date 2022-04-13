import axios from "axios";
import { useState } from "react";
import { isEmail,  validate } from "../utils";
import Field from "./Field";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const initialState = {
    values: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: ""
    },
    errors: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: ""
    }
  }
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  function onFieldChange(e) {
    const newState = { ...state };
    newState.values[e.target.name] = e.target.value;
    if (e.target.value === "") {
      newState.errors[e.target.name] = `${e.target.name} is required!`;
    } else {
      newState.errors[e.target.name] = "";
    }
    if (e.target.type === "email" && !isEmail(e.target.value)) {
      newState.errors[e.target.name] = "Email is invalid!";
    } else if (e.target.type === "email") {
      newState.errors[e.target.name] = "";
    }
    setState(newState);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { ...state.values };
    const {data} = await axios.post("http://localhost:5000/api/auth/register", payload);
    if (data.success) {
      navigate("/login");
    } else {
      alert(data.msg);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="RegisterForm">
      <Field
        type="text"
        name="username"
        value={state.values.username}
        handleChange={onFieldChange}
        err={state.errors.username}
      />
      <Field
        type="password"
        name="password"
        value={state.values.password}
        handleChange={onFieldChange}
        err={state.errors.password}
      />
      <Field
        type="text"
        name="firstName"
        value={state.values.firstName}
        handleChange={onFieldChange}
        err={state.errors.firstName}
      />
      <Field
        type="text"
        name="lastName"
        value={state.values.lastName}
        handleChange={onFieldChange}
        err={state.errors.lastName}
      />
      <Field
        type="email"
        name="email"
        value={state.values.email}
        handleChange={onFieldChange}
        err={state.errors.email}
      />
      <div className="action">
        <button
          className="btnSubmit"
          type="submit"
          disabled={!validate(state)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Register;