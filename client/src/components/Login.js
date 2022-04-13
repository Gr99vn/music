import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { validate } from "../utils";
import Field from "./Field";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { USER } from "../Constant";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const initialState = {
    values: {
      username: "",
      password: ""
    },
    errors: {
      username: "",
      password: ""
    }
  }
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { ...state.values };

    const { data } = await axios.post("/api/auth/login", payload);
    if (data.success) {
      const user = { firstName: data.firstName, lastName: data.lastName };
      localStorage.setItem(USER, JSON.stringify(user));
      setUser(user);
    } else {
      alert(data.msg);
    }
  }

  function onFieldChange(e) {
    const newState = { ...state };

    if (e.target.value === "") {
      newState.errors[e.target.name] = `${e.target.name} is required!`;
    } else {
      newState.errors[e.target.name] = "";
    }
    newState.values[e.target.name] = e.target.value;
    setState(newState);
  }

  return (
    <form onSubmit={handleSubmit} className="LoginForm">
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

export default Login;